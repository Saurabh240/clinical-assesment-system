# 📦 Product API – Test Results
## 🔄 Endpoint: "/products"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/products
- **Request Name**: Products
### 📤 Response Body (JSON)
```json
{
  "data": [
    {
      "id": 2,
      "name": "Cetirizine",
      "ailment": "Allergy",
      "category": "Antihistamine",
      "brand": "Sun Pharma",
      "description": "Relieves allergy symptoms"
    },
    {
      "id": 3,
      "name": "Ibuprofen",
      "ailment": "Pain",
      "category": "NSAID",
      "brand": "Abbott",
      "description": "Used for pain and inflammation"
    },
    {
      "id": 1,
      "name": "Paracetamol",
      "ailment": "Fever",
      "category": "Pain Relief",
      "brand": "Cipla",
      "description": "Reduces fever and pain"
    }
  ],
  "meta": {
    "page": 0,
    "size": 10,
    "totalElements": 3,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```
- **Response Status**: 200 OK
- ----

- **Type**: GET
- **URL**: http://localhost:8080/products?ailment=Fever
- **Request Name**: Products
### 📤 Response Body (JSON)
```json
{
  "data": [
    {
      "id": 1,
      "name": "Paracetamol",
      "ailment": "Fever",
      "category": "Pain Relief",
      "brand": "Cipla",
      "description": "Reduces fever and pain"
    }
  ],
  "meta": {
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```
- **Response Status**: 200 OK
- ----
- **Type**: GET
- **URL**: http://localhost:8080/products?search=relieves&category=Antihistamine
- **Request Name**: Products
### 📤 Response Body (JSON)
```json
{
  "data": [
    {
      "id": 2,
      "name": "Cetirizine",
      "ailment": "Allergy",
      "category": "Antihistamine",
      "brand": "Sun Pharma",
      "description": "Relieves allergy symptoms"
    }
  ],
  "meta": {
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrevious": false
  }
}
```
- **Response Status**: 200 OK
- ----