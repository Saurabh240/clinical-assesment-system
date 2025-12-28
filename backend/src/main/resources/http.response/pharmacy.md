## 🔄 Endpoint: "/pharmacies"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/pharmacies
- **Request Name**: Register Pharmacy
  ### 📤 Request Body (JSON)
```json
{
  "name": "testPharma",
  "address": "test address",
  "phone": "1234567890",
  "fax": "123456",
  "logoUrl": "testLogo"
}
```
### 📤 Response Body (JSON)
```json
{
  "nextStep": "SUBSCRIPTION"
}
```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "/pharmacies/join"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/pharmacies/join
- **Request Name**: Register Pharmacy
  ### 📤 Request Body (JSON)
```json
{
  "pharmacyId": 1
}
```
### 📤 Response Body (JSON)
```json
{
  "nextStep": "SUBSCRIPTION"
}
```
- **Response Status**: 200 OK

- ----
## 🔄 Endpoint: "/pharmacies/list"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/pharmacies/list
- **Request Name**: Register Pharmacy

### 📤 Response Body (JSON)
```json
[
  {
    "id": 1,
    "name": "testPharma",
    "address": "test address",
    "phone": "1234567890",
    "fax": "123456",
    "logoUrl": null,
    "createdAt": "2025-12-24T21:55:14.6818"
  }
]
```
- **Response Status**: 200 OK
- ----
