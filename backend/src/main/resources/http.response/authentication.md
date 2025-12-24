# 📦 Authentication API – Test Results

## 🔄 Endpoint: "auth/signUp"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/auth/signUp
- **Request Name**: Sign-Up

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
  "userId": 2,
  "status": "PENDING",
  "nextStep": "PHARMACY_SELECTION"
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
