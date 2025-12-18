# 📦 Authentication API – Test Results

## 🔄 Endpoint: "auth/signUp"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/auth/signUp
- **Request Name**: Sign-Up

### 📤 Request Body (JSON)
```json
{
  "email":"alex@mail.com",
  "password":"alex123"
}
```

### 📤 Response Body (JSON) 
```json
{
  "id": 1,
  "pharmacy": null,
  "email": "alex@mail.com",
  "password": "$2a$12$qv0zZvuT20fzQ9LgpQ9WIunAO/hX8a8cj18Z.lszN0uX7H1E2jGl2",
  "role": [
    "PHARMACIST"
  ],
  "createdAt": "2025-12-18T21:01:04.7051637"
}
```
- **Response Status**: 200 OK
----
## 🔄 Endpoint: "auth/signIn"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/auth/signIn
- **Request Name**: Login

### 📤 Request Body (JSON)
```json
{
  "email":"alex@mail.com",
  "password":"alex123"
}
```
  ### 📤 Response Body (JSON) 
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4QG1haWwuY29tIiwicm9sZSI6WyJQSEFSTUFDSVNUIl0sImlhdCI6MTc2NjA3MTkzNywiZXhwIjoxNzY2MTU4MzM3fQ.XUBFKAp3BK25wkWZPf5bn9ehmMrQQtCAgY-ptvcLIQY",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4QG1haWwuY29tIiwiaWF0IjoxNzY2MDcxOTM3LCJleHAiOjE3NjY2NzY3Mzd9.epzPj_Ju3ysjkCDxASJHufKVUa0CIpq9na-2ar3zDHo"
}
```
- **Response Status**: 200 OK
----
## 🔄 Endpoint: "auth/refresh"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/auth/refresh
- **Request Name**: Refresh Token
  ### 📤 Request Body (JSON)
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4QG1haWwuY29tIiwicm9sZSI6WyJQSEFSTUFDSVNUIl0sImlhdCI6MTc2NjA3MTkzNywiZXhwIjoxNzY2MTU4MzM3fQ.XUBFKAp3BK25wkWZPf5bn9ehmMrQQtCAgY-ptvcLIQY",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4QG1haWwuY29tIiwiaWF0IjoxNzY2MDcxOTM3LCJleHAiOjE3NjY2NzY3Mzd9.epzPj_Ju3ysjkCDxASJHufKVUa0CIpq9na-2ar3zDHo"
}
```
 ### 📤 Response Body (JSON) 
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4QG1haWwuY29tIiwiaWF0IjoxNzY2MDcxOTM3LCJleHAiOjE3NjY2NzY3Mzd9.epzPj_Ju3ysjkCDxASJHufKVUa0CIpq9na-2ar3zDHo",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGV4QG1haWwuY29tIiwicm9sZSI6WyJQSEFSTUFDSVNUIl0sImlhdCI6MTc2NjA3MTk2MywiZXhwIjoxNzY2MTU4MzYzfQ.-Nlh5aRu7CkFCnMO6QvbWLwfmVHq_CHQ-G69JPROWNs"
}
```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "auth/registerPharmacy"

### ✅ Request Details

- **Type**: PUT
- **URL**: http://localhost:8080/auth/registerPharmacy
- **Request Name**: Register Pharmacy
  ### 📤 Request Body (JSON)
```json
{
  "name":"alexPharma",
  "address":"23 Tower street",
  "phone":"7383639289",
  "fax":"27788945",
  "logoUrl":"alexPharmaPic.png"
}
```
### 📤 Response Body (JSON)
```json
{
  "id": 1,
  "pharmacy": {
    "id": 1,
    "name": "alexPharma",
    "address": "23 Tower street",
    "phone": "7383639289",
    "fax": "27788945",
    "logoUrl": "alexPharmaPic.png",
    "subscriptionStatus": "INACTIVE",
    "createdAt": "2025-12-18T21:05:59.7645244"
  },
  "email": "alex@mail.com",
  "password": "$2a$12$qv0zZvuT20fzQ9LgpQ9WIunAO/hX8a8cj18Z.lszN0uX7H1E2jGl2",
  "role": [
    "PHARMACIST"
  ],
  "createdAt": "2025-12-18T21:01:04.705164"
}
```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "auth/getAllPharma"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/auth/getAllPharma
- **Request Name**: Register Pharmacy

### 📤 Response Body (JSON)
```json
[
  {
    "id": 1,
    "name": "alexPharma",
    "address": "23 Tower street",
    "phone": "7383639289",
    "fax": "27788945",
    "logoUrl": "alexPharmaPic.png",
    "subscriptionStatus": "INACTIVE",
    "createdAt": "2025-12-18T21:05:59.764524"
  },
  {
    "id": 2,
    "name": "depayPharma",
    "address": "7/1/2 Clock street",
    "phone": "9863784638",
    "fax": "26678908",
    "logoUrl": "depayPharmaPic.png",
    "subscriptionStatus": "INACTIVE",
    "createdAt": "2025-12-18T21:13:22.432462"
  },
  {
    "id": 3,
    "name": "joePharma",
    "address": "78 wall street",
    "phone": "8973937932",
    "fax": "28729730",
    "logoUrl": "joePharmaPic.png",
    "subscriptionStatus": "INACTIVE",
    "createdAt": "2025-12-18T21:14:19.918234"
  }
]
```
- **Response Status**: 200 OK
- ----
