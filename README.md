# RxPrescribe — Clinical Assessment System

A multi-tenant clinical assessment platform for pharmacies. Pharmacists create patient assessments, generate PDF care plans, and track follow-ups. Each pharmacy has its own isolated data. A `PHARMACY_ADMIN` role manages pharmacists within their pharmacy. A subscription layer (Stripe) gates dashboard access.

---

## Architecture overview

```
Browser
  └── Frontend (React + Vite, served via NGINX on port 80)
        └── Backend API (Spring Boot, port 8080)
              ├── PostgreSQL  (assessments, users, pharmacies, audit logs)
              └── PDF Service (Node.js + Puppeteer, port 3001)
```

All services are containerised. The backend writes PDFs to a local `pdfs/` volume (not real S3 yet — see known limitations).

---

## Roles

| Role | What they can do |
|---|---|
| `PHARMACIST` | Create/view assessments, generate PDFs, manage follow-ups, view products |
| `PHARMACY_ADMIN` | All of the above + manage pharmacists in their pharmacy, view audit logs, CSV import |

All data is scoped to the logged-in user's pharmacy. A pharmacist from Pharmacy A can never see data from Pharmacy B.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TailwindCSS, React Router v6 |
| Backend | Java 17, Spring Boot 3.2, Spring Security, JPA/Hibernate |
| Database | PostgreSQL 15 |
| Auth | JWT access tokens (15 min) + HttpOnly refresh tokens (7 days) |
| PDF | Node.js + Puppeteer (Chromium headless) |
| Payments | Stripe Checkout (subscriptions) |
| Migrations | Flyway |
| CI/CD | GitHub Actions → DockerHub |

---

## Local development setup

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 15 (or Docker)
- Maven 3.9+

### 1. Start PostgreSQL

```bash
docker run -d \
  --name clinic-db \
  -e POSTGRES_DB=clinic \
  -e POSTGRES_USER=clinic \
  -e POSTGRES_PASSWORD=Clinic@123 \
  -p 5432:5432 \
  postgres:15
```

### 2. PDF service

```bash
cd pdf-service
npm install
node index.js
# Listening on http://localhost:3001
```

### 3. Backend

```bash
cd backend
mvn spring-boot:run
# Starts on http://localhost:8082 (dev profile)
```

The dev profile uses `spring.jpa.hibernate.ddl-auto=update` — Hibernate auto-creates tables on first run.

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
# Starts on http://localhost:5173
```

---

## Staging deployment (Docker Compose)

### Prerequisites on the server

- Docker 24+
- Docker Compose v2
- Ports 80 and 8080 open in firewall

### Steps

**1. Copy files to the server**

```bash
scp docker/docker-compose.staging.yml user@staging-server:~/rxprescribe/
scp .env.staging.template user@staging-server:~/rxprescribe/.env.staging
```

**2. Fill in secrets**

Edit `.env.staging` on the server and replace every `<CHANGE_ME>` placeholder. Never commit this file.

```bash
nano ~/rxprescribe/.env.staging
```

Key values to set:

| Variable | How to generate |
|---|---|
| `JWT_ACCESS_SECRET` | `openssl rand -base64 32` |
| `JWT_REFRESH_SECRET` | `openssl rand -base64 32` (different from access) |
| `SPRING_DATASOURCE_PASSWORD` | Your managed DB password |
| `STRIPE_SECRET_KEY` | From Stripe dashboard (use test keys for staging) |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook configuration |

**3. Pull images and start**

```bash
cd ~/rxprescribe
docker compose -f docker-compose.staging.yml --env-file .env.staging pull
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d
```

**4. Verify**

```bash
# All three containers should be Up
docker ps

# Check backend logs
docker logs clinical-management-backend --tail 50

# Check PDF service
docker logs clinical-management-pdf-service --tail 20
```

**5. Database migrations**

The prod profile has `spring.flyway.enabled=true`. Flyway will run all `V*.sql` scripts in `classpath:db` automatically on startup. Confirm in the backend logs:

```
Flyway Community Edition ... has successfully applied N migrations
```

### CI/CD pipeline

Every push to `main` triggers GitHub Actions which:
1. Builds the backend JAR (`mvn clean package -DskipTests`)
2. Builds and pushes all three Docker images to DockerHub
3. Images are tagged `:latest`

To deploy the latest build on the staging server:

```bash
docker compose -f docker-compose.staging.yml --env-file .env.staging pull
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d --no-deps backend
```

---

## Environment variables reference

### Backend (all required in prod)

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | Full JDBC URL e.g. `jdbc:postgresql://host:5432/clinic` |
| `SPRING_DATASOURCE_USERNAME` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | DB password |
| `JWT_ACCESS_SECRET` | Min 32-char random string for signing access tokens |
| `JWT_REFRESH_SECRET` | Min 32-char random string for signing refresh tokens (different from access) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend URLs e.g. `https://staging.rxprescribe.com` |
| `PDF_SERVICE_URL` | Internal URL of the pdf-service e.g. `http://pdf-service:3001` |
| `PDF_BASE_URL` | Public base URL for PDF download links |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_MONTHLY` | Stripe Price ID for monthly plan |
| `STRIPE_PRICE_ANNUAL` | Stripe Price ID for annual plan |
| `STRIPE_SUCCESS_URL` | Redirect URL after successful Stripe checkout |
| `STRIPE_CANCEL_URL` | Redirect URL after cancelled Stripe checkout |

### Frontend

The frontend image is built with the API URL baked in at build time. To change the API URL, rebuild the image with the correct `VITE_API_BASE_URL`.

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL e.g. `https://api.staging.rxprescribe.com` |

---

## Database migrations

Migrations live in `backend/src/main/resources/db/` and follow Flyway's `V{n}__{description}.sql` naming convention.

### Current migrations

| Version | Description |
|---|---|
| V1 | Create `users` table |
| V2 | Create `pharmacy` table |
| V3 | Create `ailments` table |
| V4 | Create `assessments` table |
| V5 | Add `last_followup_date` and `followup_status` to assessments |
| V6 | Full-text index on `products` |
| V7 | Add `firstName` / `lastName` to `users` |
| V8 | Rename columns in `followups` |

### Adding a new migration

Create `V9__your_description.sql` in `backend/src/main/resources/db/`. Flyway picks it up automatically on next startup. Never edit an existing migration file — add a new one instead.

---

## API overview

Base URL: `http://localhost:8082` (dev) / `https://api.staging.rxprescribe.com` (staging)

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signUp` | Register a new pharmacist account |
| POST | `/auth/signIn` | Login — returns access token + sets HttpOnly refresh cookie |
| POST | `/auth/refresh` | Rotate refresh token — returns new access token |
| POST | `/auth/logout` | Revoke refresh token |
| GET | `/auth/currentUser` | Get the logged-in user's profile |

The access token expires after **15 minutes**. The frontend automatically refreshes it using the HttpOnly cookie.

### Assessments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/assessments` | Create a new assessment (scoped to caller's pharmacy) |
| GET | `/assessments/{id}` | Get full assessment detail |
| PUT | `/assessments/{id}` | Update assessment data |
| POST | `/assessments/{id}/pdf` | Generate and store PDF |
| POST | `/assessments/getAllAssessments` | Paginated list with filters (scoped to pharmacy) |

### Follow-ups

| Method | Endpoint | Description |
|---|---|---|
| GET | `/followups` | List overdue follow-ups |
| POST | `/assessments/{id}/followup` | Add a follow-up entry |
| GET | `/assessments/{id}/followup` | Get latest follow-up for an assessment |

### Pharmacy Admin

All `/admin/*` endpoints require `PHARMACY_ADMIN` role.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/users` | List pharmacists in your pharmacy |
| POST | `/admin/users` | Create a pharmacist (auto-linked to your pharmacy) |
| PUT | `/admin/users/{id}` | Update pharmacist name/status |
| DELETE | `/admin/users/{id}` | Soft-delete pharmacist (sets INACTIVE) |
| GET | `/admin/audit-logs` | Paginated audit log |
| POST | `/admin/ailments/import` | CSV import of ailments |

### Pharmacy

| Method | Endpoint | Description |
|---|---|---|
| POST | `/pharmacies` | Create a new pharmacy |
| POST | `/pharmacies/join` | Join an existing pharmacy |
| GET | `/pharmacies/list` | List all pharmacies (for the join screen) |

---

## Known limitations / pre-production checklist

These are gaps that must be addressed before a production launch. For staging they are acceptable.

### Critical before production

- **S3Service writes PDFs to local disk** — `pdfs/` folder inside the container. On a single server this works, but PDFs are lost if the container is recreated without the volume. The URL returned also hardcodes `localhost:8082`. Replace `S3Service` with a real object storage upload (AWS S3, DigitalOcean Spaces) before going live.

- **`/pharmacies/list` is unauthenticated and returns all pharmacies** — any unauthenticated user can enumerate all pharmacy names and IDs. Add authentication to this endpoint and consider whether the join flow needs a invite-code or admin-approval mechanism.

- **`/followups` has no pharmacy scope** — `getOverdueFollowups()` queries all assessments in the database regardless of pharmacy. Add a caller-scoped filter identical to the one applied in `getAssessments`.

- **Real secrets in `application.properties`** — Stripe keys, JWT secrets, Twilio credentials, SendGrid API key, and DB passwords all have literal defaults in the base `application.properties`. These will be baked into the Docker image. The prod profile must override all of them via environment variables (the provided `application-prod.properties` does this correctly — ensure the base file is cleaned up).

- **Flyway migration ordering issue** — `V1__create_Users.sql` has a foreign key to `pharmacy` but `V2__create_Pharmacy.sql` creates the `pharmacy` table. This means V1 will fail on a clean database. A new migration `V9__fix_users_fk.sql` should drop and re-add the FK, or V1 and V2 should be reordered.

- **`V5__add_followup_fields_to_assessment.sql` references table `assessment`** — but the table is named `assessments` (plural) per V4. This migration will fail on a clean run. Fix the table name in V5.

- **`V2__create_Pharmacy.sql` uses MySQL syntax** — `BIGINT AUTO_INCREMENT` is MySQL-only. PostgreSQL requires `BIGSERIAL` or `GENERATED ALWAYS AS IDENTITY`. Fix before running Flyway on a clean PostgreSQL database.

### Important for staging

- **NGINX config missing** — the frontend Dockerfile serves via NGINX but has no custom `nginx.conf`. React Router uses client-side routing, so all routes except `/` return 404 on hard refresh. Add an `nginx.conf` that rewrites all requests to `/index.html`.

- **No HTTPS** — for staging, put the server behind a reverse proxy (NGINX + Let's Encrypt / Certbot) or use your cloud provider's load balancer with TLS termination.

- **`spring.main.allow-bean-definition-overriding=true`** — this masks potential configuration conflicts. Investigate and remove if possible.

- **`spring.jpa.properties.hibernate.multiTenancy=SCHEMA`** — this property is set but schema-based multi-tenancy is not actually implemented. It can cause unexpected Hibernate warnings. Remove it unless you plan to implement schema-per-tenant.

- **Audit log `@PreAuthorize("hasRole('ADMIN')")`** — the role in Spring Security is registered as `ROLE_PHARMACY_ADMIN` (from `JwtAuthFilter`). The `hasRole('ADMIN')` expression checks for `ROLE_ADMIN`, which will never match. Change to `hasRole('PHARMACY_ADMIN')`.

- **Puppeteer CHROME_PATH** — the PDF service `.env` hardcodes a Windows path. The Docker image uses `--no-sandbox` args correctly, but `CHROME_PATH` must be empty or set to the Linux Chromium binary inside the container. Set `CHROME_PATH=` (empty) in the staging compose file.

- **No request size limit on PDF endpoint** — the Puppeteer service accepts `10mb` JSON. The Spring backend has no multipart or request size limit configured. Large assessment HTML could time out or OOM the PDF service.

---

## Security notes

- All endpoints except `/auth/signIn`, `/auth/signUp`, `/auth/refresh` require a valid JWT.
- Refresh tokens are stored HttpOnly, Secure, SameSite=Strict cookies — not accessible from JavaScript.
- Refresh tokens are single-use and rotated on every refresh.
- All assessment and user management operations are scoped to the caller's pharmacy via the JWT — the client cannot supply a pharmacy ID.
- Passwords are hashed with BCrypt (cost factor 12).
- SQL injection is prevented by JPA/Hibernate parameterised queries throughout.

---

## Project structure

```
clinical-assessment-system/
├── backend/                         # Spring Boot API
│   ├── src/main/java/com/clinical/
│   │   ├── config/                  # Security, JWT, CORS
│   │   ├── controller/              # REST endpoints
│   │   ├── dto/                     # Request/response records
│   │   ├── exception/               # Global error handler
│   │   ├── model/                   # JPA entities
│   │   ├── repository/              # Spring Data repositories
│   │   └── service/                 # Business logic
│   └── src/main/resources/
│       ├── application.properties   # Base config (dev defaults)
│       ├── application-dev.properties
│       ├── application-prod.properties  # Prod — all values from env vars
│       ├── db/                      # Flyway migrations
│       └── templates/               # Thymeleaf PDF templates
├── frontend/                        # React + Vite SPA
│   └── src/
│       ├── admin/                   # Pharmacy admin pages
│       ├── pages/                   # Pharmacist pages
│       ├── routes/                  # AppRoutes + AdminRoutes (with guards)
│       └── api/                     # Axios instance + interceptors
├── pdf-service/                     # Node.js Puppeteer PDF generator
├── docker/
│   ├── docker-compose.yml           # Local dev compose
│   └── docker-compose.staging.yml   # Staging compose
└── .github/workflows/
    └── docker-publish.yml           # CI: build + push to DockerHub on push to main
```