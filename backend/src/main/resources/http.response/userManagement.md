## 🔄 Endpoint: "/admin/users"
### ➕ Create Pharmacist

### ✅ Request Details
- **Type**: POST
- **URL**: http://localhost:8080/admin/users
- **Request Name**: Create Pharmacist

### 📤 Request Body (JSON)
```json
{
  "email": "pharmacist1@test.com",
  "password": "password123",
  "firstName": "Amit",
  "lastName": "Sharma"
}
```
### 📤 Response Body (JSON)
```json
{
  "id": 5,
  "email": "pharmacist1@test.com",
  "firstName": "Amit",
  "lastName": "Sharma",
  "role": "PHARMACIST",
  "status": "ACTIVE"
}
```
- **Response Status**: 200 OK
- ----

## 🔄 Endpoint: "/admin/users/{id}"

### ✏️ Update Pharmacist
### ✅ Request Details

- **Type**: POST
- **URL**: URL: http://localhost:8080/admin/users/5
- **Request Name**: Update Pharmacist

### 📤 Request Body (JSON)
```json
{
  "firstName": "Amit Updated",
  "lastName": "Sharma Updated",
  "status": "ACTIVE"
}
```
### 📤 Response Body (JSON)
```json
{
  "id": 5,
  "email": "pharmacist1@test.com",
  "firstName": "Amit Updated",
  "lastName": "Sharma Updated",
  "role": "PHARMACIST",
  "status": "ACTIVE"
}
```
- **Response Status**: 200 OK
- ----

## 🔄 Endpoint: "/admin/users/{id}"

### Delete Pharmacist (Soft Delete)
### ✅ Request Details

- **Type**: DELETE
- **URL**: URL: http://localhost:8080/admin/users/5
- **Request Name**: Delete Pharmacist

- **Response Status**: 204 No Content
- ----