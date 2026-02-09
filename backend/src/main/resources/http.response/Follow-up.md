# 📦 Follow-up API – Test Results
## 🔄 Endpoint: "/followups"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/followups
- **Request Name**: Follow-ups
### 📤 Response Body (JSON)
```json
[
  {
    "assessmentId": 2,
    "patientName": "New User",
    "ailment": "TAMIFLU",
    "overdueDays": 8,
    "lastFollowupDate": null
  }
]
```
- **Response Status**: 200 OK
- ----
### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/assessments/2/followup
- **Request Name**: Create/update Followp
### 📤 Request Body (JSON)
```json
{
  "notes": "Patient contacted, symptoms improving",
  "nextFollowupDate": "2026-02-15",
  "status": "COMPLETED"
}
```
### 📤 Response Body (JSON)
```json
{
  "assessmentId": 2,
  "status": "COMPLETED",
  "lastFollowupDate": "2026-02-09T13:18:38.870450500Z",
  "nextFollowupDate": "2026-02-15",
  "message": "Follow-up updated successfully"
}
```
- **Response Status**: 200 OK
- ----
