# AGENTS.md — RxPrescribe Clinical Assessment System

> **Purpose:** This file is the canonical reference for AI coding agents working in this repository.
> Read it completely before touching any file. Every architectural decision, naming convention, data
> flow, known gap, and invariant that must never be broken is documented here.

---

## 1. Project Overview

RxPrescribe is a **multi-tenant, pharmacy-scoped clinical assessment platform** for Ontario pharmacists.

Pharmacists fill out dynamic assessment forms for minor ailments, generate PDF care plans, and track
follow-ups. Each pharmacy's data is fully isolated. A `PHARMACY_ADMIN` role manages pharmacists within
their own pharmacy. A Stripe-gated subscription controls dashboard access.

**Three deployed services:**

| Service | Technology | Port | Role |
|---|---|---|---|
| Backend API | Java 17, Spring Boot 3.2 | 8080 (prod) / 8082 (dev) | All business logic, auth, DB |
| Frontend SPA | React 18, Vite, TailwindCSS | 80 (prod) / 5173 (dev) | UI, served via NGINX |
| PDF Service | Node.js, Puppeteer (Chromium) | 3001 | HTML → PDF conversion |

**Database:** PostgreSQL 15. Migrations managed by Flyway (`backend/src/main/resources/db/V*.sql`).

---

## 2. Repository Structure

```
clinical-assessment-system/
├── backend/                              # Spring Boot API
│   └── src/main/java/com/clinical/
│       ├── config/         # JwtAuthFilter, JwtUtil, SecurityConfig, StripeConfig
│       ├── controller/     # REST endpoints — one file per domain
│       ├── dto/            # Request/response records and classes
│       ├── exception/      # GlobalExceptionHandler
│       ├── model/          # JPA entities
│       ├── repository/     # Spring Data JPA interfaces
│       ├── service/        # Business logic
│       └── specifications/ # ProductSpecification (JPA Criteria)
│   └── src/main/resources/
│       ├── application.properties          # Base config (dev defaults, NEVER commit secrets)
│       ├── application-dev.properties
│       ├── application-prod.properties     # All values from env vars, no fallbacks
│       ├── db/V*.sql                       # Flyway migrations
│       └── templates/assessments/          # Thymeleaf PDF templates
│           ├── base-assessment.html        # Root template — both PDF pages
│           └── fragments/
│               ├── common/                 # Shared: patient-info, consent, care-plan, etc.
│               └── ailments/              # One file per ailment code (uti.html, etc.)
├── frontend/                             # React SPA
│   └── src/
│       ├── admin/           # PHARMACY_ADMIN-only sections
│       │   ├── auditLogs/   # AuditLogPage + components + auditApi.js
│       │   ├── csvImport/   # CSV ailment import
│       │   ├── dashboard/   # AdminDashboard
│       │   └── userManagement/ # Pharmacist CRUD + useUserManagement.js
│       ├── api/             # axios.js — single Axios instance + tokenManager + authApi
│       ├── components/
│       │   ├── assessment/  # DynamicAssessmentForm.jsx, AilmentSelect.jsx
│       │   └── ui/          # Button, Card, Input, Checkbox, Select (design system)
│       ├── hooks/           # useAssessment.js
│       ├── layout/          # AppLayout.jsx, Sidebar.jsx, Topbar.jsx
│       ├── modules/         # AssessmentView + section cards (read-only display)
│       ├── pages/           # One file per route
│       ├── routes/          # AppRoutes.jsx, AdminRoutes.jsx, ProtectedRoute.jsx
│       └── services/        # assessment.service.js, ailment.service.js
├── pdf-service/                          # Node.js Puppeteer service
│   └── index.js            # POST /generate-pdf — receives HTML, returns PDF bytes
└── docker/
    ├── docker-compose.yml              # Local dev
    └── docker-compose.staging.yml     # Staging deployment
```

---

## 3. Data Model

### Entities and relationships

```
Pharmacy  1──∞  User         (users.pharmacy_id FK)
Pharmacy  1──1  Subscription (subscriptions.pharmacy_id FK)
Pharmacy  1──∞  Assessment   (assessments.pharmacy_id FK — NOT NULL)
Assessment 1──∞  FollowUp    (followups.assessment_id FK)
User       1──∞  RefreshToken (refresh_tokens.user_id)
```

### Key entity fields

**User** — `id`, `email` (unique), `firstName`, `lastName`, `password` (BCrypt), `role` (PHARMACIST | PHARMACY_ADMIN), `status` (ACTIVE | INACTIVE), `createdAt`, `pharmacy` (FK)

**Pharmacy** — `id`, `name`, `address`, `phone`, `fax`, `logoUrl`, `stripeCustomerId`, `createdAt`

**Assessment** — `id`, `ailmentCode` (string key e.g. "UTI"), `assessmentData` (JSONB), `followupStatus` (PENDING | OVERDUE | COMPLETED), `lastFollowupDate`, `pdfUrl`, `createdAt`, `pharmacy` (FK, NOT NULL)

**Ailment** — `id`, `code` (unique, e.g. "UTI"), `name`, `fieldsConfig` (JSONB — the form schema), `active`

**FollowUp** — `id`, `assessment` (FK), `notes`, `status`, `nextFollowupDate`, `createdAt`, `createdBy` (email string)

**AuditLog** — `id`, `entity`, `entityId`, `action` (CREATE|UPDATE|DELETE|LOGIN|LOGOUT|PDF_GENERATED|STATUS_CHANGE), `field`, `oldValue`, `newValue`, `details`, `updatedBy`, `ipAddress`, `updatedAt`

**Subscription** — `id`, `pharmacy` (OneToOne), `plan` (TRIAL|MONTHLY|ANNUAL), `status` (ACTIVE|INACTIVE|EXPIRED), `startDate`, `endDate`, `stripeSubscriptionId`

**Product** — `id`, `name`, `ailment`, `category`, `brand`, `description`

**RefreshToken** — `id`, `userId`, `tokenHash` (SHA-256 hex), `expiresAt`, `revoked`

---

## 4. Authentication & Security

### Token strategy

- **Access token** — JWT, 15-minute expiry, signed with `JWT_ACCESS_SECRET`, carries `userId`, `email`, `role`
- **Refresh token** — JWT, 7-day expiry, signed with `JWT_REFRESH_SECRET`, stored as SHA-256 hash in `refresh_tokens` table, delivered as HttpOnly + Secure + SameSite=Strict cookie on path `/auth/refresh`
- Refresh tokens are **single-use** (rotated on every refresh call)

### JWT payload structure

```json
{ "sub": "42", "email": "user@pharmacy.com", "role": "PHARMACIST", "type": "ACCESS" }
```

Spring Security authority registered as `ROLE_PHARMACIST` or `ROLE_PHARMACY_ADMIN`.

### Public endpoints (no token required)

`POST /auth/signIn`, `POST /auth/signUp`, `POST /auth/refresh`, `GET /v3/api-docs/**`, `GET /swagger-ui/**`

All other endpoints require a valid Bearer token in the `Authorization` header.

### Frontend token management

`frontend/src/api/axios.js` — single Axios instance (`api`). `tokenManager` stores the access token in `localStorage`. The response interceptor automatically calls `/auth/refresh` on 401, queues concurrent requests, and dispatches `auth:logout` if refresh fails.

**`authUser` in localStorage** — `{ userId, email, status, role }` — written on login, read by `RequirePharmacyAdmin` guard in `AdminRoutes.jsx`.

---

## 5. Multi-Tenancy Rules — NEVER BREAK THESE

Every operation that reads or writes business data must be scoped to the calling user's pharmacy. The JWT is the only trusted source of identity. Request bodies must never supply a pharmacy ID.

### Backend enforcement pattern

```java
// In every controller method that touches tenant data:
AuthUser principal = (AuthUser) auth.getPrincipal();
User user = userRepository.findByEmail(principal.email()).orElseThrow();
Pharmacy pharmacy = user.getPharmacy();  // throw if null
// Pass pharmacy into service — never accept pharmacyId from request body
```

### Enforced today

| Domain | Scoping |
|---|---|
| Assessments — create | `a.setPharmacy(user.getPharmacy())` in `AssessmentService.createAssessment` |
| Assessments — read single | `findAndAuthorize` checks `a.getPharmacy().getId().equals(user.getPharmacy().getId())` |
| Assessments — list | `AssessmentSpecification.build(req, pharmacyId)` adds `pharmacy.id = ?` predicate |
| User management | `AdminUserController.resolvePharmacy(auth)` + `findByPharmacyIdAndRole` / `findByIdAndPharmacyId` |

### Known gap — fix before production

`FollowupService.getOverdueFollowups()` queries all assessments system-wide with no pharmacy filter. This leaks cross-pharmacy patient data. Fix: accept `AuthUser caller`, resolve pharmacy, and filter `assessmentRepository` by `pharmacy_id`.

---

## 6. API Reference

Base path: `/` (no `/api` prefix except billing and subscriptions)

### Auth — `/auth`

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| POST | `/auth/signUp` | ✗ | `SignupRequest` | `SignupResponse` |
| POST | `/auth/signIn` | ✗ | `LoginRequest` | `LoginResponse` + sets refresh cookie |
| POST | `/auth/refresh` | Cookie | — | `TokenResponse` |
| POST | `/auth/logout` | ✓ | — | 204 |
| GET | `/auth/currentUser` | ✓ | — | `UserContextResponse` |

`LoginResponse` fields: `userId`, `status`, `nextStep` (DASHBOARD | PHARMACY_SELECTION | SUBSCRIPTION), `accessToken`, `role`

### Assessments — `/assessments`

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| POST | `/assessments` | ✓ | `AssessmentRequest` | `{ id: Long }` |
| GET | `/assessments/{id}` | ✓ | — | `AssessmentResponse` |
| PUT | `/assessments/{id}` | ✓ | `AssessmentRequest` | 204 |
| POST | `/assessments/{id}/pdf` | ✓ | — | `{ url: String }` |
| POST | `/assessments/getAllAssessments` | ✓ | `AssessmentFilterRequest` (query params) | `Page<AssessmentSummaryResponse>` |

`AssessmentRequest` payload:
```json
{ "ailmentCode": "UTI", "data": { /* fully nested section object */ } }
```

`AssessmentFilterRequest` params: `ailmentCode`, `followupStatus`, `patientName`, `dateFrom`, `dateTo`, `page`, `size`, `sortBy` (date|ailment), `sortDirection` (ASC|DESC), `callerUserId` (set by controller, never from client)

### Follow-ups

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| GET | `/followups` | ✓ | — | `List<FollowupReadResponse>` |
| POST | `/assessments/{id}/followup` | ✓ | `FollowUpRequest` | `FollowupUpdateResponse` |
| GET | `/assessments/{id}/followup` | ✓ | — | `FollowupResponse` |

`FollowUpRequest` fields: `notes`, `status` (FollowupStatus), `nextFollowupDate`

Overdue threshold: **14 days** since last follow-up date (or `createdAt` if no follow-up yet).

### Pharmacy Admin — `/admin/*` (requires PHARMACY_ADMIN)

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/admin/users` | — | `List<UserResponse>` |
| POST | `/admin/users` | `AdminCreatePharmacistRequest` | `UserResponse` |
| PUT | `/admin/users/{id}` | `AdminUpdatePharmacistRequest` | `UserResponse` |
| DELETE | `/admin/users/{id}` | — | 204 |
| GET | `/admin/audit-logs` | params: search, action, entity, page, size | `Page<AuditLogResponse>` |
| GET | `/admin/audit-logs/{id}` | — | `AuditLogResponse` |
| GET | `/admin/ailments/csv/template` | — | CSV byte stream |
| POST | `/admin/ailments/csv/import` | multipart/form-data | `CsvImportSummary` |

**Note:** `@PreAuthorize("hasRole('ADMIN')")` on `AuditLogController` is **broken** — the actual authority is `ROLE_PHARMACY_ADMIN`. Must be changed to `@PreAuthorize("hasRole('PHARMACY_ADMIN')")`.

### Pharmacy — `/pharmacies`

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| POST | `/pharmacies` | ✓ | `CreatePharmacyRequest` | `NextStepResponse` |
| POST | `/pharmacies/join` | ✓ | `JoinPharmacyRequest` | `NextStepResponse` |
| GET | `/pharmacies/list` | ✗ | — | `List<PharmacyResponse>` |

**Note:** `/pharmacies/list` is unauthenticated — any request can enumerate all pharmacy names/IDs.

### Ailments — `/ailments`

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| GET | `/ailments` | ✓ | — | `List<AilmentResponse>` |
| GET | `/ailments/{code}` | ✓ | — | `AilmentResponse` |
| POST | `/ailments` | ✓ | `AilmentRequest` | `AilmentResponse` |

### Other

| Method | Path | Notes |
|---|---|---|
| GET | `/products` | params: search, ailment, category, brand, page, size, sortBy, sortDir |
| POST | `/api/billing/create-checkout-session` | Creates Stripe Checkout session |
| POST | `/api/billing/webhook` | Stripe webhook receiver |
| POST | `/api/subscriptions/trial` | Starts 7-day trial subscription |
| GET | `/pdfs/{fileName}` | Serves stored PDFs from local disk |

---

## 7. Assessment Data Flow

This is the most complex flow in the system. Understand it fully before touching any related file.

### Step 1 — Ailment schema loaded

Frontend calls `GET /ailments/{code}`. Response contains `fieldsConfig` (JSONB) — a JSON object with a `sections` array. Each section has `id` and `fields[]`. Each field has `key`, `type`, `label`, `required`, `options`, `defaultValue`.

### Step 2 — Form renders dynamically

`DynamicAssessmentForm.jsx` reads `fieldsConfig.sections`, initialises state, and renders fields by type (`boolean` → Checkbox, `date` → Input[date], `select` → select, `textarea` → textarea, `text` → Input, `medicationList` → `MedicationListField`).

### Step 3 — State storage (flat)

State is stored **flat** per section. Field keys like `ailment.clinicalBlock.symptoms.dysuria` are stripped of the section prefix and stored as `clinicalBlock.symptoms.dysuria` in `values["ailment"]`.

```js
values = {
  "ailment": {
    "code": "UTI",
    "clinicalBlock.symptoms.dysuria": true,
    "clinicalBlock.symptoms.frequency": false,
    ...
  },
  "assessment": { "notes": "...", "liverImpairmentNo": true, ... }
}
```

### Step 4 — Submit: flat → nested

On submit, `buildNestedSection(flatSection)` converts each section's flat map into a properly nested object using dotted path traversal:

```js
{ "clinicalBlock.symptoms.dysuria": true }
→ { clinicalBlock: { symptoms: { dysuria: true } } }
```

### Step 5 — API payload

```json
{
  "ailmentCode": "UTI",
  "data": {
    "patient": { "firstName": "Jane", "lastName": "Doe", ... },
    "ailment": {
      "code": "UTI",
      "clinicalBlock": {
        "symptoms": { "dysuria": true, "frequency": true, ... },
        "criteria": { "previousDiagnosisUTI": true, ... },
        "treatment": { "selected": "Nitrofurantoin" }
      }
    },
    "assessment": { "liverImpairmentNo": true, "nka": true, ... },
    "carePlan": { ... },
    "followUp": { ... },
    "medicationOrder": { "medications": [{ "name": "...", "strength": "...", ... }] },
    "prescriber": { ... },
    "signature": { ... }
  }
}
```

### Step 6 — Backend saves

`AssessmentService.createAssessment(req, caller)`:
1. Looks up user from JWT to get pharmacy
2. Maps `req.getData()` to `JsonNode` via `ObjectMapper`
3. Sets `pharmacy` from user — never from request
4. Saves to `assessments.assessment_data` (JSONB)

### Step 7 — PDF generation

1. `POST /assessments/{id}/pdf`
2. `AssessmentService.generatePdf` → `findAndAuthorize` (pharmacy check) → `PdfHtmlService.renderAssessment`
3. `PdfHtmlService` loads `base-assessment.html` via Thymeleaf, passes the parsed `JsonNode` as `data`
4. Thymeleaf renders HTML using `data['section']['field']` path notation
5. Rendered HTML sent to PDF service (`POST http://pdf-service:3001/generate-pdf`)
6. PDF bytes returned → `S3Service.upload` writes to `pdfs/` folder on disk
7. Returns URL: `{PDF_BASE_URL}/pdfs/{ailmentCode}-{id}.pdf`

---

## 8. Ailment Field Config Schema

Ailments are stored in the `ailments` table with a `fields_config` JSONB column. This schema drives both the frontend form and the PDF template.

```json
{
  "code": "UTI",
  "name": "Urinary Tract Infection (Uncomplicated)",
  "version": 1,
  "sections": [
    {
      "id": "sectionId",
      "title": "Display Title",
      "fields": [
        {
          "key": "sectionId.fieldPath",
          "type": "boolean | text | date | textarea | select | medicationList",
          "label": "Human-readable label",
          "required": true,
          "defaultValue": false,
          "options": [{ "label": "Yes", "value": true }]
        }
      ]
    }
  ]
}
```

**Key naming rule:** Every `key` must start with its section's `id` followed by a dot. The form strips the prefix and uses the remainder as the storage path. Dotted paths create nesting:

- `"assessment.notes"` → `data.assessment.notes` (one level)
- `"ailment.clinicalBlock.symptoms.dysuria"` → `data.ailment.clinicalBlock.symptoms.dysuria` (four levels)

### Supported section IDs (standard across all ailments)

`consent`, `patient`, `eligibility`, `assessment`, `ailment` (ailment-specific content), `medicationOrder`, `carePlan`, `followUp`, `prescriber`, `signature`

### Thymeleaf path convention

The PDF template accesses data as `data['sectionId']['fieldName']` or deeper:
`data['ailment']['clinicalBlock']['symptoms']['dysuria']`

If the nesting doesn't match what was saved, Thymeleaf throws a SpringEL evaluation error.

### Available ailment codes

`UTI`, `DERMATITIS`, `DYSMENORRHEA`, `INSECT_BITES`, `CONJUNCTIVITIS`, `HEMORRHOIDS`, `IMPETIGO`, `TICK_BITES`, `ALLERGIC_RHINITIS`, `COLD_SORE`, `GERD`, `MUSCULOSKELETAL_SPRAINS`, `CANDIDAL_STOMATITIS`, `ACNE`, `APHTHOUS_ULCERS`, `NAUSEA_VOMITING_PREGNANCY`, `PINWORMS`, `VAGINAL_CANDIDIASIS`, `DIAPER_DERMATITIS`, `OSELTAMIVIR`

Each has a corresponding Thymeleaf fragment at `templates/assessments/fragments/ailments/{code_lowercase}.html`.

---

## 9. PDF Template Architecture

### Two-page structure (`base-assessment.html`)

**Page 1 — Assessment summary** (Ontario Minor Ailment Assessment format):
- Blue header sections: Patient Details, Assessment Checklists, Minor Ailment, Care Plan, Monitoring and Follow Up
- Reads from: `data.patient`, `data.consent`, `data.assessment`, `data.ailment` (symptoms/criteria), `data.carePlan`, `data.followUp`

**Page 2 — Pharmacy Prescription** (clean card format):
- Pharmacy name + address (centred bold)
- Patient: name, DOB, health card
- Medications Prescribed (iterates `data.medicationOrder.medications[]`)
- Prescriber: name, OCP license
- Signature / Date lines

### CSS checkbox pattern

```html
<span th:classappend="${data['section']['field'] == true ? 'checked' : ''}" class="cb"></span>
```

Class `cb` renders an empty box; `cb checked` renders a checkmark via CSS `::after`.

### Fragment includes

```html
<div th:replace="~{assessments/fragments/common/patient-info :: section(data=${data})}"></div>
```

Ailment fragments receive data and render rationale, symptoms, treatment options.

### Adding a new ailment PDF template

1. Create `templates/assessments/fragments/ailments/{code_lower}.html` with `th:fragment="section(data)"`
2. Add a `th:block th:if="${data['ailment']['code'] == 'YOUR_CODE'}"` block in `base-assessment.html` pointing to the new fragment
3. The fragment reads `data['ailment']['clinicalBlock'][...]` for ailment-specific clinical content

---

## 10. Roles and Routing

### Roles

| Role | Value | Access |
|---|---|---|
| Pharmacist | `PHARMACIST` | `/dashboard`, `/assessments`, `/follow-ups`, `/products`, `/patients`, `/billing`, `/settings` |
| Pharmacy Admin | `PHARMACY_ADMIN` | All pharmacist routes + `/admin/dashboard`, `/admin/users`, `/admin/audit-logs`, `/admin/csv-import` |

### Login flow (post-authentication routing)

```
signIn response.role === "PHARMACY_ADMIN" → navigate("/admin/dashboard")
signIn response.nextStep === "PHARMACY_SELECTION" → navigate("/pharmacy-select")
signIn response.nextStep === "SUBSCRIPTION" → navigate("/subscription")
signIn response.nextStep === "DASHBOARD" → navigate("/dashboard")
```

`nextStep` is resolved server-side by `AuthService.resolveNextStep(user)`:
- User has no pharmacy → `PHARMACY_SELECTION`
- User has pharmacy but no subscription → `SUBSCRIPTION`
- Otherwise → `DASHBOARD`

### Frontend route guards

`RequirePharmacyAdmin` (in `AdminRoutes.jsx`) — reads `authUser.role` from `localStorage`. Redirects non-admins to `/dashboard`, unauthenticated users to `/login`.

`ProtectedRoute` (in `routes/ProtectedRoute.jsx`) — reads from `AuthContext`. Redirects to `/login` if no user.

---

## 11. Frontend Architecture Conventions

### Axios instance

Single instance in `frontend/src/api/axios.js`. All service files import `api` from this module. Do not create additional Axios instances.

`authApi` object on the same file handles `signIn`, `getCurrentUser`, `signUp`, `logout`.

### Hook pattern

Business logic lives in hooks (`useAssessment.js`, `useUserManagement.js`, `useCsvImport.js`). Pages import hooks and pass data to presentational components.

### Admin section structure

Each admin feature follows this layout:
```
admin/{feature}/
  pages/          # One page component
  components/     # Presentational sub-components
  hooks/          # use{Feature}.js
  {feature}Api.js # Raw API calls
  {feature}Constants.js
```

### UI component library

`frontend/src/components/ui/` — `Button`, `Card`, `Input`, `Checkbox`, `Select`. Always use these instead of raw HTML elements. They handle consistent styling, error states, and disabled states.

### Dynamic form field types

`DynamicAssessmentForm.jsx` supports: `boolean` (Checkbox), `date` (Input), `textarea`, `select`, `text` (Input), `medicationList` (MedicationListField inline component).

To add a new field type: add a `case` in `renderField`'s switch statement.

---

## 12. Database Migrations

Migrations are Flyway scripts in `backend/src/main/resources/db/` named `V{n}__{description}.sql`.

**Current migrations:**

| Version | File | Description |
|---|---|---|
| V1 | `V1__create_Users.sql` | `users` table with `pharmacy_id` FK |
| V2 | `V2__create_Pharmacy.sql` | `pharmacy` table (**uses MySQL `AUTO_INCREMENT` — must fix for PostgreSQL**) |
| V3 | `V3__create_Ailments.sql` | `ailments` table with `fields_config JSONB` |
| V4 | `V4__create_Assessments.sql` | `assessments` table (**missing `pharmacy_id` column — added via JPA, not migration**) |
| V5 | `V5__add_followup_fields_to_assessment.sql` | Adds follow-up columns (**references `assessment` not `assessments` — wrong table name**) |
| V6 | `V6__products_fulltext_index.sql` | GIN full-text index on `products` |
| V7 | `V7__update_users.sql` | Adds `firstName`, `lastName` to `users` |
| V8 | `V8__update_followup.sql` | Renames `updated_at`→`created_at` and `updated_by`→`created_by` in `followups` |

**Known migration bugs (must fix before running Flyway on a clean DB):**
- V1 references `pharmacy(id)` FK before V2 creates the `pharmacy` table — wrong order
- V2 uses MySQL-only `BIGINT AUTO_INCREMENT` — PostgreSQL requires `BIGSERIAL`
- V4 does not add `pharmacy_id` column — only JPA's `ddl-auto=update` adds it
- V5 references table `assessment` — should be `assessments` (plural)

**Rule:** Never edit an existing migration. Add a new `V9__...` to fix.

---

## 13. Configuration and Environment Variables

### Active profiles

- `dev` — `application-dev.properties` — `ddl-auto=update`, SQL logging on, Flyway disabled, port 8082
- `prod` — `application-prod.properties` — `ddl-auto=validate`, SQL logging off, Flyway enabled, all secrets from env vars

### Required environment variables (prod)

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://host:5432/clinic` |
| `SPRING_DATASOURCE_USERNAME` | DB user |
| `SPRING_DATASOURCE_PASSWORD` | DB password |
| `JWT_ACCESS_SECRET` | Min 32-char random string (`openssl rand -base64 32`) |
| `JWT_REFRESH_SECRET` | Different min 32-char random string |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend URLs |
| `PDF_SERVICE_URL` | Internal URL e.g. `http://pdf-service:3001` |
| `PDF_BASE_URL` | Public base URL for PDF download links |
| `STRIPE_SECRET_KEY` | Stripe secret |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_MONTHLY` | Stripe Price ID |
| `STRIPE_PRICE_ANNUAL` | Stripe Price ID |
| `STRIPE_SUCCESS_URL` | Post-checkout redirect |
| `STRIPE_CANCEL_URL` | Post-checkout cancel redirect |

### Frontend build variable

`VITE_API_BASE_URL` — baked in at build time. Must point to the backend base URL.

---

## 14. PDF Service

**Location:** `pdf-service/index.js`

**Endpoint:** `POST /generate-pdf` — accepts `{ html: string }`, returns `application/pdf` bytes.

**Runtime:** Puppeteer + Chromium headless. In Docker, `CHROME_PATH` must be empty (uses system Chromium). In development on Windows, set `CHROME_PATH` to the local Chrome binary.

**Docker note:** Puppeteer requires `shm_size: "1gb"` in the compose file or it crashes silently.

**Request size limit:** 10MB (`express.json({ limit: "10mb" })`). Large assessment HTML can approach this.

---

## 15. S3 / File Storage

`S3Service.java` currently writes PDFs to `pdfs/` on local disk and returns a hardcoded URL based on `app.pdf.base-url`. This is **not real object storage**.

For staging: a Docker volume (`pdf_storage`) is mounted at `/app/pdfs` to persist files across restarts.

For production: replace `S3Service.upload()` with a real S3/DigitalOcean Spaces SDK call.

---

## 16. Audit Logging

`AuditLogService` provides convenience methods called from controllers:

- `logCreated(entity, entityId, details, updatedBy, ipAddress)`
- `logUpdated(...)`, `logDeleted(...)`, `logLogin(...)`, `logLogout(...)`
- `logStatusChange(entity, entityId, oldStatus, newStatus, updatedBy, ipAddress)`
- `logPdfGenerated(assessmentId, pdfUrl, updatedBy, ipAddress)`

**Currently instrumented:** sign-in, sign-out, assessment create/update, PDF generation, follow-up status changes.

**Not instrumented:** pharmacy create, user create/update/delete, ailment import.

IP resolution uses `X-Forwarded-For` header for reverse-proxy deployments.

---

## 17. Known Gaps and Invariants

### Must fix before production

| # | Location | Issue |
|---|---|---|
| 1 | `FollowupService.getOverdueFollowups` | No pharmacy scope — returns all pharmacies' overdue assessments |
| 2 | `AuditLogController` | `@PreAuthorize("hasRole('ADMIN')")` never matches — should be `PHARMACY_ADMIN` |
| 3 | Flyway V2 | `AUTO_INCREMENT` is MySQL syntax — PostgreSQL needs `BIGSERIAL` |
| 4 | Flyway V5 | References table `assessment` — should be `assessments` |
| 5 | Flyway V1 vs V2 | V1 FK on `pharmacy(id)` before V2 creates `pharmacy` — ordering bug |
| 6 | `S3Service` | Writes to local disk, not real object storage, URL hardcodes `localhost` |
| 7 | `application.properties` | Contains real Stripe keys, JWT secrets, Twilio credentials as fallback defaults — these get baked into Docker images |
| 8 | `/pharmacies/list` | Unauthenticated — any caller can enumerate all pharmacies |
| 9 | Frontend NGINX | No `nginx.conf` — React Router 404s on hard refresh of any route other than `/` |

### Invariants — never violate

1. **Pharmacy scope always from JWT** — never trust `pharmacyId` from request bodies or query params
2. **`assessment.pharmacy_id` is NOT NULL** — `createAssessment` must call `a.setPharmacy(user.getPharmacy())` before saving
3. **Refresh tokens are single-use** — `refresh()` must mark old token revoked before issuing new one
4. **Passwords via BCrypt only** — never store or compare plain text; always use `passwordEncoder`
5. **Field config keys match template paths** — `fieldsConfig` key `"ailment.clinicalBlock.symptoms.dysuria"` must produce `data.ailment.clinicalBlock.symptoms.dysuria` in the submitted JSON, which maps to `data['ailment']['clinicalBlock']['symptoms']['dysuria']` in Thymeleaf
6. **One Axios instance** — all frontend API calls go through `frontend/src/api/axios.js`

---

## 18. CI/CD

**GitHub Actions** (`.github/workflows/docker-publish.yml`) — triggers on push to `main`:

1. `mvn clean package -DskipTests` — builds backend JAR
2. `docker build + push` for all three images to DockerHub under `saurabh896/`
3. Images tagged `:latest`

**Image names:**
- `saurabh896/clinical-management-backend:latest`
- `saurabh896/clinical-management-frontend:latest`
- `saurabh896/clinical-management-pdf-service:latest`

**To deploy latest on staging:**
```bash
docker compose -f docker-compose.staging.yml --env-file .env.staging pull
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d --no-deps backend
```

---

## 19. Adding a New Ailment — Checklist

Follow these steps in order:

1. **Field config** — Create a JSON config following the schema in Section 8. All section `id` values must match the standard list. All `key` values must start with the section `id`.

2. **Database** — Insert into `ailments` table:
   ```sql
   INSERT INTO ailments (code, name, fields_config, active)
   VALUES ('YOUR_CODE', 'Display Name', '<json>', true);
   ```

3. **PDF fragment** — Create `templates/assessments/fragments/ailments/{code_lower}.html` with `th:fragment="section(data)"`. Access ailment-specific data via `data['ailment']['clinicalBlock'][...]`.

4. **Base template** — Add a `th:block th:if` block in `base-assessment.html` pointing to the new fragment (in the Page 1 Minor Ailment section and also available for Page 2 if needed).

5. **Test** — Submit a complete assessment via the API, then call `/assessments/{id}/pdf` and verify the PDF renders without SpEL errors.
