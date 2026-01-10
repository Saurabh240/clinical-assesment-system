## 🔄 Endpoint: "/ailments"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/ailments
- **Request Name**: Create or Update Ailment
  ### 📤 Request Body (JSON)
```json
{
  "code": "DENGUE_001",
  "name": "Dengue Fever",
  "fieldsConfig": {
    "sections": [
      {
        "title": "Symptoms",
        "fields": [
          { "key": "fever", "type": "boolean", "required": true },
          { "key": "bodyAche", "type": "boolean" }
        ]
      },
      {
        "title": "Eligibility",
        "fields": [
          {
            "key": "age",
            "type": "number",
            "rules": { "min": 12 }
          }
        ]
      }
    ]
  },
  "active": true
}

```
### 📤 Response Body (JSON)
```json
{
  "id": 1,
  "code": "DENGUE_001",
  "name": "Dengue Fever",
  "fieldsConfig": {
    "sections": [
      {
        "title": "Symptoms",
        "fields": [
          { "key": "fever", "type": "boolean", "required": true },
          { "key": "bodyAche", "type": "boolean" }
        ]
      },
      {
        "title": "Eligibility",
        "fields": [
          {
            "key": "age",
            "type": "number",
            "rules": { "min": 12 }
          }
        ]
      }
    ]
  },
  "active": true
}

```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "/ailments"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/ailments
- **Request Name**: Register Pharmacy

### 📤 Response Body (JSON)
```json
[
  {
    "id": 1,
    "code": "DENGUE_001",
    "name": "Dengue Fever",
    "fieldsConfig": {
      "sections": [
        {
          "title": "Symptoms",
          "fields": [
            {
              "key": "fever",
              "type": "boolean",
              "required": true
            },
            {
              "key": "bodyAche",
              "type": "boolean"
            }
          ]
        },
        {
          "title": "Eligibility",
          "fields": [
            {
              "key": "age",
              "type": "number",
              "rules": {
                "min": 12
              }
            }
          ]
        }
      ]
    },
    "active": true
  },
  {
    "id": 2,
    "code": "FLU_101",
    "name": "Seasonal Viral Flu",
    "fieldsConfig": {
      "sections": [
        {
          "title": "Symptoms",
          "fields": [
            {
              "key": "fever",
              "type": "boolean",
              "required": true
            },
            {
              "key": "bodyAche",
              "type": "boolean"
            }
          ]
        },
        {
          "title": "Eligibility",
          "fields": [
            {
              "key": "age",
              "type": "number",
              "rules": {
                "min": 12
              }
            }
          ]
        }
      ]
    },
    "active": true
  },
  {
    "id": 3,
    "code": "COVID_MILD_2024",
    "name": "COVID-19 Mild",
    "fieldsConfig": {
      "sections": [
        {
          "title": "Symptoms",
          "fields": [
            {
              "key": "fever",
              "type": "boolean",
              "required": true
            },
            {
              "key": "bodyAche",
              "type": "boolean"
            }
          ]
        },
        {
          "title": "Eligibility",
          "fields": [
            {
              "key": "age",
              "type": "number",
              "rules": {
                "min": 12
              }
            }
          ]
        }
      ]
    },
    "active": true
  },
  {
    "id": 4,
    "code": "COVID_MILD_2021",
    "name": "COVID-19 Light",
    "fieldsConfig": {
      "sections": [
        {
          "title": "Symptoms",
          "fields": [
            {
              "key": "fever",
              "type": "boolean",
              "required": true
            },
            {
              "key": "bodyAche",
              "type": "boolean"
            }
          ]
        },
        {
          "title": "Eligibility",
          "fields": [
            {
              "key": "age",
              "type": "number",
              "rules": {
                "min": 12
              }
            }
          ]
        }
      ]
    },
    "active": true
  }
]
```
- **Response Status**: 200 OK
- ## 🔄 Endpoint: "/ailments/{AILMENT_CODE}"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/ailments/{CODE}
- **Request Name**: Find any Ailment

### 📤 Response Body (JSON)
```json
{
  "id": 1,
  "code": "DENGUE_001",
  "name": "Dengue Fever",
  "fieldsConfig": {
    "sections": [
      {
        "title": "Symptoms",
        "fields": [
          { "key": "fever", "type": "boolean", "required": true },
          { "key": "bodyAche", "type": "boolean" }
        ]
      },
      {
        "title": "Eligibility",
        "fields": [
          {
            "key": "age",
            "type": "number",
            "rules": { "min": 12 }
          }
        ]
      }
    ]
  },
  "active": true
}

```
- **Response Status**: 200 OK
- ----