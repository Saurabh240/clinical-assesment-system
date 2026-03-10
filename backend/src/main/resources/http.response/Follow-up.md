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
    "assessmentId": 14,
    "patientName": "Saurabh Gupta",
    "ailment": "OSELTAMIVIR",
    "overdueDays": 10,
    "lastFollowupDate": null,
    "status": "OVERDUE",
    "notes": null
  },
  {
    "assessmentId": 29,
    "patientName": "",
    "ailment": "DEN",
    "overdueDays": 0,
    "lastFollowupDate": null,
    "status": "OVERDUE",
    "notes": null
  }
]
```
- **Response Status**: 200 OK
- ----
### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/assessments/1/followup
- **Request Name**: Create/update Followp
### 📤 Request Body (JSON)
```json
{
  "nextFollowupDate": "2026-02-21T11:06:06.394Z",
  "notes": "test notes 3",
  "status": "COMPLETED"
}
```
### 📤 Response Body (JSON)
```json
{
  "assessmentId": 22,
  "status": "COMPLETED",
  "lastFollowupDate": "2026-02-18T17:42:14.177832600Z",
  "nextFollowupDate": "2026-02-21T11:06:06.394Z",
  "notes": "test notes 3",
  "message": "Follow-up created successfully"
}
```
- **Response Status**: 200 OK
- ----
### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/assessments/:assessmentId/followup
- **Request Name**: Get latest Follow-ups
### 📤 Response Body (JSON)
```json
{
  "assessmentId": 22,
  "patientName": "Test User",
  "ailment": "DENGUE_002",
  "overdueDays": 17,
  "lastFollowupDate": "2026-01-18T17:31:11.081Z",
  "status": "COMPLETED",
  "notes": "test notes 3"
}
```
- **Response Status**: 200 OK