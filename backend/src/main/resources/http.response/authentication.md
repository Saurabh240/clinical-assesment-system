# 📦 Authentication API – Test Results

## 🔄 Endpoint: "auth/signUp"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/auth/signUp
- **Request Name**: Sign-Up

### 📤 Request Body (JSON)
```json
{
  "email":"jackk28@mail.com",
  "password":"jack123",
  "pharmacy":{
    "name":"Steve's & Sons Pharma",
    "address":"1/23 Waterloo Street",
    "phone":"6738923749",
    "fax":"28773456",
    "logoUrl":"steve_n_son.png"
  }
}
```

### 📤 Response Body (JSON) 
```json
{
  "id": 7,
  "pharmacy": {
    "id": 4,
    "name": "Steve's & Sons Pharma",
    "address": "1/23 Waterloo Street",
    "phone": "6738923749",
    "fax": "28773456",
    "logoUrl": "steve_n_son.png",
    "subscriptionStatus": null,
    "createdAt": "2025-12-13T08:36:23.2948325"
  },
  "email": "jackk28@mail.com",
  "password": "$2a$12$vtEIG718499wFprG0SitPOSZ238xZipgM2nRkRoyFIMlhe2Pu7yOS",
  "role": [
    "PHARMACIST"
  ],
  "createdAt": "2025-12-13T08:36:23.7488908"
}
```
- **Response Status**: 200 OK
----
## 🔄 Endpoint: "auth/signIn"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/auth/signIn
- **Request Name**: Login

### 📤 Request Body (JSON)
```json
{
  "email":"jackk28@mail.com",
  "password":"jack123"
}
```
  ### 📤 Response Body (JSON) 
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrazI4QG1haWwuY29tIiwicm9sZSI6WyJQSEFSTUFDSVNUIl0sImlhdCI6MTc2NTU5NTYxMiwiZXhwIjoxNzY1NjgyMDEyfQ.BtytQl4TDG30-EgfhnggIiaDiCHR6ErJHiD5z_1C86s",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrazI4QG1haWwuY29tIiwiaWF0IjoxNzY1NTk1NjEyLCJleHAiOjE3NjYyMDA0MTJ9.AcRHq2Z37bcKLxpF2FcDz2ORj4YxpzpzgFY-Zz3QQ2g"
}
```
- **Response Status**: 200 OK
----
## 🔄 Endpoint: "auth/refresh"

### ✅ Request Details

- **Type**: PUT
- **URL**: http://localhost:8080/auth/refresh
- **Request Name**: Refresh Token
  ### 📤 Request Body (JSON)
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrazI4QG1haWwuY29tIiwicm9sZSI6WyJQSEFSTUFDSVNUIl0sImlhdCI6MTc2NTU5NTYxMiwiZXhwIjoxNzY1NjgyMDEyfQ.BtytQl4TDG30-EgfhnggIiaDiCHR6ErJHiD5z_1C86s",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrazI4QG1haWwuY29tIiwiaWF0IjoxNzY1NTk1NjEyLCJleHAiOjE3NjYyMDA0MTJ9.AcRHq2Z37bcKLxpF2FcDz2ORj4YxpzpzgFY-Zz3QQ2g"
}
```
 ### 📤 Response Body (JSON) 
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrazI4QG1haWwuY29tIiwiaWF0IjoxNzY1NTk1NjEyLCJleHAiOjE3NjYyMDA0MTJ9.AcRHq2Z37bcKLxpF2FcDz2ORj4YxpzpzgFY-Zz3QQ2g",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNrazI4QG1haWwuY29tIiwicm9sZSI6WyJQSEFSTUFDSVNUIl0sImlhdCI6MTc2NTU5NTkyOSwiZXhwIjoxNzY1NjgyMzI5fQ.GjoyAtu_faLOkU7TtY-2SSUV-_zX0jkkpRX6yg21jcA"
}
```
- **Response Status**: 200 OK
- ----
