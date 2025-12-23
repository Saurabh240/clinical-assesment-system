## 🔄 Endpoint: "pharma/registerPharmacy"

### ✅ Request Details

- **Type**: PUT
- **URL**: http://localhost:8080/pharma/registerPharmacy
- **Request Name**: Register Pharmacy
  ### 📤 Request Body (JSON)
```json
{
  "name":"sauravPharma",
  "address":"234 Rose street",
  "phone":"8973648339",
  "fax":"27833456",
  "logoUrl":"sauravPharmaPic.png"
}
```
### 📤 Response Body (JSON)
```json
{
  "id": 1,
  "pharmacy": {
    "id": 1,
    "name": "sauravPharma",
    "address": "234 Rose street",
    "phone": "8973648339",
    "fax": "27833456",
    "logoUrl": "sauravPharmaPic.png",
    "subscriptionStatus": "TRIAL",
    "subscriptionDuration": {
      "startedAt": "2025-12-23T09:34:10.9546268",
      "expireAt": "2026-01-06T09:34:10.9546268"
    },
    "createdAt": "2025-12-23T09:34:10.9595612"
  },
  "email": "saurav@mail.com",
  "password": "$2a$12$SuKn/7DAhDSOJGnIsIiyouQtT0.uq7B2kloISdna.8YRpePP1cHeO",
  "role": [
    "PHARMACIST"
  ],
  "createdAt": "2025-12-23T09:33:39.814573"
}
```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "pharma/getAllPharma"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/pharma/getAllPharma
- **Request Name**: Register Pharmacy

### 📤 Response Body (JSON)
```json
[
  {
    "id": 1,
    "name": "sauravPharma",
    "address": "234 Rose street",
    "phone": "8973648339",
    "fax": "27833456",
    "logoUrl": "sauravPharmaPic.png",
    "subscriptionStatus": "TRIAL",
    "createdAt": "2025-12-23T09:34:10.959561"
  },
  {
    "id": 2,
    "name": "singhPharma",
    "address": "34 Rose street",
    "phone": "8739736832",
    "fax": "27876728",
    "logoUrl": "singhPharmaPic.png",
    "subscriptionStatus": "TRIAL",
    "createdAt": "2025-12-23T09:41:54.554426"
  }
]
```
- **Response Status**: 200 OK
- ----
