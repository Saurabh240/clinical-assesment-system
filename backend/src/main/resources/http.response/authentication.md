# 📦 Authentication API – Test Results

## 🔄 Endpoint: "auth/signUp"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/auth/signUp
- **Request Name**: Sign-Up

### 📤 Request Body (JSON)
```json
{
  "email": "test@gmail.com",
  "firstName": "Test",
  "lastName": "User",
  "password": "Test@123"
}
```

### 📤 Response Body (JSON) 
```json
{
  "userId": 1,
  "status": "PENDING",
  "nextStep": "PHARMACY_SELECTION"
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
  "email":"test@gmail.com",
  "password":"Test@123"
}
```
  ### 📤 Response Body (JSON) 
```json
{
  "userId": 3,
  "status": "PENDING",
  "nextStep": "PHARMACY_SELECTION",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiUEhBUk1BQ0lTVCIsInR5cGUiOiJBQ0NFU1MiLCJpYXQiOjE3NjY4Mjk2MzQsImV4cCI6MTc2NjgzMDUzNH0.u0WabU4er32Rmc7vaOrg9RTlgvhVmjLBxIJGicY1F58"
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
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXVyYXZAbWFpbC5jb20iLCJyb2xlIjpbIlBIQVJNQUNJU1QiXSwiaWF0IjoxNzY2NDYyODc3LCJleHAiOjE3NjY1NDkyNzd9.NWZtvMuJ5Wq01pZjMayzyFuxx7V1vj6qtrwjVc4lGnk",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXVyYXZAbWFpbC5jb20iLCJpYXQiOjE3NjY0NjI4NzcsImV4cCI6MTc2NzA2NzY3N30.DrjEEXqz-UO8uUfeuhTPOY9EHHM-MHZ2ipZIvc_xQD8"
}
```
 ### 📤 Response Body (JSON) 
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXVyYXZAbWFpbC5jb20iLCJyb2xlIjpbIlBIQVJNQUNJU1QiXSwiaWF0IjoxNzY2NDYyOTM5LCJleHAiOjE3NjY1NDkzMzl9.5w3QTp_oJg_gtdB54q8KWO22bhQ61YAJXLchcx5gogs",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYXVyYXZAbWFpbC5jb20iLCJpYXQiOjE3NjY0NjI4NzcsImV4cCI6MTc2NzA2NzY3N30.DrjEEXqz-UO8uUfeuhTPOY9EHHM-MHZ2ipZIvc_xQD8"
}
```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "auth/currentUser"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/auth/currentUser
- **Request Name**: Current User
  ### 📤 Request Body (JSON)
```token
```
### 📤 Response Body (JSON)
```json
{
  "userId": 9,
  "email": "test5@gmail.com",
  "firstName": "Test 5",
  "lastName": "User 5",
  "role": "PHARMACIST",
  "status": "PENDING",
  "pharmacy": null,
  "subscription": null
}
```
- **Response Status**: 200 OK
- ----
