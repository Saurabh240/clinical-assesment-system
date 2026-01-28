
# 📦 Assesments API – Test Results
## 🔄 Endpoint: "/assessments"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/assessments
- **Request Name**: Create Assessment
  ### 📤 Request Body (JSON)
```json
{
  "ailmentCode": "INFLUENZA_OSELTAMIVIR",
  "data": {
    "patient": {
      "firstName": "John",
      "lastName": "Doe",
      "gender": "M",
      "dob": "1990-05-14",
      "height": "175 cm",
      "weight": "72 kg",
      "phone": "+1-416-555-0123",
      "healthCardNo": "HC123456789",
      "address": "123 King Street, Toronto, ON"
    },

    "prescriber": {
      "firstName": "Sarah",
      "lastName": "Smith",
      "licenseNo": "PHM-998877",
      "faxNo": "+1-416-555-9988",
      "phone": "+1-416-555-8899",
      "address": "456 Queen Street, Toronto, ON"
    },

    "eligibility": {
      "positiveTestDate": "2026-01-10",
      "clinicalJudgment": false,
      "outbreakDiagnosis": false,
      "symptomOnsetDate": "2026-01-09",
      "noRedFlags": true
    },

    "symptoms": {
      "abruptRespiratory": true,
      "fever": true,
      "cough": true,
      "chills": false,
      "gi": false,
      "malaise": true,
      "fatigue": true,
      "myalgia": true,
      "rhinitis": false,
      "soreThroat": true,
      "headache": true
    },

    "consent": {
      "verbalConsent": true,
      "substituteConsent": false,
      "substituteName": null,
      "substituteRelation": null
    },

    "assessment": {
      "medicationListAttached": true,
      "otherPharmacy": false,
      "pregnancyBreastfeeding": null,
      "hasAllergies": false,
      "allergies": null,
      "nka": true,
      "knownPregnant": null,
      "liverImpairment": false,
      "renalImpairment": false,
      "eGFRandSCr": "Normal",
      "sCr": 88,
      "sCrDate": "2026-01-08",
      "eGFR": 95,
      "eGFRDate": "2026-01-08",
      "notes": "Patient eligible for antiviral treatment. No contraindications noted."
    },

    "carePlan": {
      "prescriptionIssued": true,
      "inPersonCare": true,
      "virtualCareTelephone": false,
      "prescriptionNotIssued": false,
      "inPersonCareNotIssued": false,
      "virtualCareTelephoneNotIssued": false,
      "inPersonCareRefer": false,
      "virtualCareTelephoneRefer": false,
      "issueRxWithModification": false,
      "referToMDNP": false,
      "recommendOTC": true,
      "recommendNonPharm": true,
      "other": false,
      "notes": "Supportive care advised along with antiviral therapy."
    },

    "medication": {
      "treatmentOseltamivir": true,
      "adultsChildren13Plus": true,
      "children1to12": false,
      "weightOver40kg": false,
      "weight23to40kg": false,
      "weightUnder15kg": false,
      "infantsUnder1": false,

      "preventionOseltamivir": false,
      "prevAdults13Plus": false,
      "prevChildren1to12": false,
      "prevWeightOver40kg": false,
      "prevWeight23to40kg": false,
      "prevWeightUnder15kg": false,

      "standardDose": false,
      "renalImpairmentTreatment": false,
      "renalAdults18Plus": false,
      "creatinineOver30": false,
      "creatinine10to30": false,

      "renalImpairmentPrevention": false,
      "renalPrevAdults18Plus": false,
      "renalPrevCreatinineOver30": false,
      "renalPrevCreatinine10to30": false,

      "reducedDosePaxlovid": false
    },

    "signature": {
      "pharmacistName": "Sarah Smith",
      "ocpNumber": "OCP-445566",
      "date": "2026-01-12"
    },

    "followUp": {
      "date": "2026-01-17",
      "inPerson": true,
      "phone": false,
      "pcpNotifiedDate": "2026-01-17",
      "pcpPhone": true,
      "pcpFax": false,
      "paxlovidConfirmed": false,
      "paxlovidConfirmDate": null,
      "paxlovidPhone": false,
      "paxlovidInPerson": false
    }
  }
}
```
### 📤 Response Body (JSON)
```json
{
  "id": 3
}
```

- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "/assessments/{ASSESSMENT_ID}"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/assessments/{ASSESSMENT_ID}
- **Request Name**: Get Assessment

### 📤 Response Body (JSON)
```json
{
  "data": {
    "consent": {
      "verbalConsent": true,
      "substituteName": null,
      "substituteConsent": false,
      "substituteRelation": null
    },
    "patient": {
      "dob": "1990-05-14",
      "phone": "+1-416-555-0123",
      "gender": "M",
      "height": "175 cm",
      "weight": "72 kg",
      "address": "123 King Street, Toronto, ON",
      "lastName": "Doe",
      "firstName": "John",
      "healthCardNo": "HC123456789"
    },
    "carePlan": {
      "notes": "Supportive care advised along with antiviral therapy.",
      "other": false,
      "referToMDNP": false,
      "inPersonCare": true,
      "recommendOTC": true,
      "inPersonCareRefer": false,
      "recommendNonPharm": true,
      "prescriptionIssued": true,
      "virtualCareTelephone": false,
      "inPersonCareNotIssued": false,
      "prescriptionNotIssued": false,
      "issueRxWithModification": false,
      "virtualCareTelephoneRefer": false,
      "virtualCareTelephoneNotIssued": false
    },
    "followUp": {
      "date": "2026-01-17",
      "phone": false,
      "pcpFax": false,
      "inPerson": true,
      "pcpPhone": true,
      "paxlovidPhone": false,
      "pcpNotifiedDate": "2026-01-17",
      "paxlovidInPerson": false,
      "paxlovidConfirmed": false,
      "paxlovidConfirmDate": null
    },
    "symptoms": {
      "gi": false,
      "cough": true,
      "fever": true,
      "chills": false,
      "fatigue": true,
      "malaise": true,
      "myalgia": true,
      "headache": true,
      "rhinitis": false,
      "soreThroat": true,
      "abruptRespiratory": true
    },
    "signature": {
      "date": "2026-01-12",
      "ocpNumber": "OCP-445566",
      "pharmacistName": "Sarah Smith"
    },
    "assessment": {
      "nka": true,
      "sCr": 88,
      "eGFR": 95,
      "notes": "Patient eligible for antiviral treatment. No contraindications noted.",
      "sCrDate": "2026-01-08",
      "eGFRDate": "2026-01-08",
      "allergies": null,
      "eGFRandSCr": "Normal",
      "hasAllergies": false,
      "knownPregnant": null,
      "otherPharmacy": false,
      "liverImpairment": false,
      "renalImpairment": false,
      "medicationListAttached": true,
      "pregnancyBreastfeeding": null
    },
    "medication": {
      "standardDose": false,
      "children1to12": false,
      "infantsUnder1": false,
      "weight23to40kg": false,
      "weightOver40kg": false,
      "weightUnder15kg": false,
      "creatinine10to30": false,
      "creatinineOver30": false,
      "prevAdults13Plus": false,
      "prevChildren1to12": false,
      "renalAdults18Plus": false,
      "prevWeight23to40kg": false,
      "prevWeightOver40kg": false,
      "prevWeightUnder15kg": false,
      "reducedDosePaxlovid": false,
      "adultsChildren13Plus": true,
      "treatmentOseltamivir": true,
      "preventionOseltamivir": false,
      "renalPrevAdults18Plus": false,
      "renalImpairmentTreatment": false,
      "renalImpairmentPrevention": false,
      "renalPrevCreatinine10to30": false,
      "renalPrevCreatinineOver30": false
    },
    "prescriber": {
      "faxNo": "+1-416-555-9988",
      "phone": "+1-416-555-8899",
      "address": "456 Queen Street, Toronto, ON",
      "lastName": "Smith",
      "firstName": "Sarah",
      "licenseNo": "PHM-998877"
    },
    "eligibility": {
      "noRedFlags": true,
      "clinicalJudgment": false,
      "positiveTestDate": "2026-01-10",
      "symptomOnsetDate": "2026-01-09",
      "outbreakDiagnosis": false
    }
  },
  "pdfUrl": "",
  "id": 3
}
```
- **Response Status**: 200 OK
## 🔄 Endpoint: "/assessments/{ASSESSMENT_ID}/pdf"

### ✅ Request Details

- **Type**: GET
- **URL**: http://localhost:8080/assessments/{ASSESSMENT_ID}/pdf
- **Request Name**: Generate PDF

### 📤 Response Body (JSON)
```json
{
  "url": "http://localhost:8080/pdfs/tamiflu-3.pdf"
}
```
- **Response Status**: 200 OK
- ----
## 🔄 Endpoint: "/assessments/getAllAssessments"

### ✅ Request Details

- **Type**: POST
- **URL**: http://localhost:8080/assessments/getAllAssessments
- **Request Name**: Fetch all Assessments

### 📤 Request Body (JSON)
```json
{
  "ailmentCode": "INFLUENZA_OSELTAMIVIR",
  "followupStatus": "PENDING",
  "patientName": "John",
  "dateFrom": "2026-01-01T00:00:00Z",
  "dateTo": "2026-01-31T23:59:59Z",
  "page": 0,
  "size": 10,
  "sortBy": "date",
  "sortDirection": "DESC"
}


```

### 📤 Response Body (JSON)
```json
{
  "content": [
    {
      "id": 15,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1992-05-12",
          "phone": "9876543210",
          "gender": "M",
          "height": "175 cm",
          "weight": "72 kg",
          "address": "123 Main Street, Toronto",
          "lastName": "Doe",
          "firstName": "John",
          "healthCardNo": "HC123456789"
        },
        "carePlan": {
          "notes": "Advised rest, hydration, and symptom monitoring.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-22",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": true,
          "pcpNotifiedDate": "2026-01-22",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": true,
          "paxlovidConfirmDate": "2026-01-19"
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-19",
          "ocpNumber": "OCP556677",
          "pharmacistName": "Dr. Alex Brown"
        },
        "assessment": {
          "nka": false,
          "sCr": "0.9",
          "eGFR": "92",
          "notes": "Patient stable. No contraindications identified.",
          "sCrDate": "2026-01-16",
          "eGFRDate": "2026-01-16",
          "allergies": "Penicillin",
          "eGFRandSCr": "eGFR 92, sCr 0.9",
          "hasAllergies": true,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": false,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "011-2345678",
          "phone": "9123456789",
          "address": "City Pharmacy, Toronto",
          "lastName": "Smith",
          "firstName": "Sarah",
          "licenseNo": "LIC987654"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": "2026-01-18",
          "symptomOnsetDate": "2026-01-17",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": "PENDING",
      "pdfUrl": null,
      "createdAt": "2026-01-21T09:52:26.672196Z"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "last": true,
  "totalElements": 1,
  "totalPages": 1,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "unsorted": false,
    "sorted": true
  },
  "numberOfElements": 1,
  "first": true,
  "empty": false
}
```
### 🔍 Example 1: Search by Patient Name Only

Use case: Find assessments where patient first or last name matches.

📤 Request Body (JSON)
```json
{
  "patientName": "Mehta"
}
```

📤 Response Body (JSON)
```json
{
  "content": [
    {
      "id": 7,
      "ailmentCode": "INFLUENZA_PROPHYLAXIS",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1988-08-18",
          "phone": "+1-416-555-9009",
          "gender": "M",
          "height": "180 cm",
          "weight": "85 kg",
          "address": "9 King West, Toronto, ON",
          "lastName": "Mehta",
          "firstName": "Karan",
          "healthCardNo": "HC100000009"
        },
        "carePlan": {
          "notes": "Exposure-based prophylaxis.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-19",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-19",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": false,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": false,
          "abruptRespiratory": false
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-1009",
          "pharmacistName": "Olivia Clark"
        },
        "assessment": {
          "nka": true,
          "sCr": 86,
          "eGFR": 98,
          "notes": "Preventive therapy considered.",
          "sCrDate": "2026-01-10",
          "eGFRDate": "2026-01-10",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": false,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": true,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": true,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": false,
          "treatmentOseltamivir": false,
          "preventionOseltamivir": true,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-9010",
          "phone": "+1-416-555-9011",
          "address": "901 Queen St, Toronto, ON",
          "lastName": "Clark",
          "firstName": "Olivia",
          "licenseNo": "PHM-1009"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": null,
          "symptomOnsetDate": "2026-01-11",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:08.143389Z"
    },
    {
      "id": 4,
      "ailmentCode": "URTI_SUPPORTIVE_CARE",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1998-03-21",
          "phone": "+1-905-555-4444",
          "gender": "M",
          "height": "178 cm",
          "weight": "74 kg",
          "address": "77 Main Street, Brampton, ON",
          "lastName": "Mehta",
          "firstName": "Rahul",
          "healthCardNo": "HC555888999"
        },
        "carePlan": {
          "notes": "Rest, hydration, and OTC symptomatic relief.",
          "inPersonCare": false,
          "recommendOTC": true,
          "recommendNonPharm": true,
          "prescriptionIssued": false,
          "virtualCareTelephone": true,
          "prescriptionNotIssued": true
        },
        "followUp": {
          "date": "2026-01-18",
          "phone": true,
          "inPerson": false
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": false,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": false
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-223344",
          "pharmacistName": "Anita Patel"
        },
        "assessment": {
          "nka": true,
          "notes": "Uncomplicated upper respiratory infection.",
          "allergies": null,
          "eGFRandSCr": "Not Required",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": false,
          "pregnancyBreastfeeding": null
        },
        "medication": {},
        "prescriber": {
          "faxNo": "+1-905-555-7766",
          "phone": "+1-905-555-6655",
          "address": "101 Queen Street, Brampton, ON",
          "lastName": "Patel",
          "firstName": "Anita",
          "licenseNo": "PHM-556677"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": null,
          "symptomOnsetDate": "2026-01-09",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:53:27.430677Z"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "last": true,
  "totalElements": 2,
  "totalPages": 1,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "unsorted": false,
    "sorted": true
  },
  "numberOfElements": 2,
  "first": true,
  "empty": false
}
```

📝 Behavior

- Case-insensitive search

- Matches patient.firstName OR patient.lastName

- Uses default pagination & sorting



### 📅 Example 2: Date Range Filter Only

Use case: Fetch assessments created within a specific date range.

📤 Request Body (JSON)
```json
{
  "dateFrom": "2026-01-16T00:00:00Z",
  "dateTo": "2026-01-31T23:59:59Z"
}
```

📤 Request Body (JSON)
```json
{
  "content": [
    {
      "id": 15,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1992-05-12",
          "phone": "9876543210",
          "gender": "M",
          "height": "175 cm",
          "weight": "72 kg",
          "address": "123 Main Street, Toronto",
          "lastName": "Doe",
          "firstName": "John",
          "healthCardNo": "HC123456789"
        },
        "carePlan": {
          "notes": "Advised rest, hydration, and symptom monitoring.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-22",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": true,
          "pcpNotifiedDate": "2026-01-22",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": true,
          "paxlovidConfirmDate": "2026-01-19"
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-19",
          "ocpNumber": "OCP556677",
          "pharmacistName": "Dr. Alex Brown"
        },
        "assessment": {
          "nka": false,
          "sCr": "0.9",
          "eGFR": "92",
          "notes": "Patient stable. No contraindications identified.",
          "sCrDate": "2026-01-16",
          "eGFRDate": "2026-01-16",
          "allergies": "Penicillin",
          "eGFRandSCr": "eGFR 92, sCr 0.9",
          "hasAllergies": true,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": false,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "011-2345678",
          "phone": "9123456789",
          "address": "City Pharmacy, Toronto",
          "lastName": "Smith",
          "firstName": "Sarah",
          "licenseNo": "LIC987654"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": "2026-01-18",
          "symptomOnsetDate": "2026-01-17",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": "PENDING",
      "pdfUrl": null,
      "createdAt": "2026-01-21T09:52:26.672196Z"
    },
    {
      "id": 14,
      "ailmentCode": "DIAB_002",
      "assessmentData": {
        "medication": "Metformin",
        "fastingSugar": 140,
        "postMealSugar": 220
      },
      "lastFollowupDate": null,
      "followupStatus": "PENDING",
      "pdfUrl": null,
      "createdAt": "2026-01-21T09:50:41.792344Z"
    },
    {
      "id": 13,
      "ailmentCode": "FEVER_001",
      "assessmentData": {
        "hasChills": true,
        "temperature": 101.5,
        "durationDays": 3
      },
      "lastFollowupDate": null,
      "followupStatus": "PENDING",
      "pdfUrl": null,
      "createdAt": "2026-01-21T09:50:12.698562Z"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "last": true,
  "totalElements": 3,
  "totalPages": 1,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "unsorted": false,
    "sorted": true
  },
  "numberOfElements": 3,
  "first": true,
  "empty": false
}
```
📝 Behavior

- Filters using createdAt

- Includes records on boundary dates

- Default page = 0, size = 10

### 📄 Example 3: Pagination Only

Use case: Navigate through assessment records page by page.

📤 Request Body (JSON)
```json
{
  "page": 1,
  "size": 5
}
```

📤 Response Body (JSON)
```json
{
  "content": [
    {
      "id": 10,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1987-09-09",
          "phone": "+1-416-555-6006",
          "gender": "F",
          "height": "160 cm",
          "weight": "58 kg",
          "address": "90 Adelaide Street, Toronto, ON",
          "lastName": "Sharma",
          "firstName": "Neha",
          "healthCardNo": "HC100000006"
        },
        "carePlan": {
          "notes": "Rest and hydration advised.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-16",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-16",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": false,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": true,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-11",
          "ocpNumber": "OCP-1006",
          "pharmacistName": "Ryan Lopez"
        },
        "assessment": {
          "nka": true,
          "sCr": 79,
          "eGFR": 102,
          "notes": "Mild influenza symptoms.",
          "sCrDate": "2026-01-08",
          "eGFRDate": "2026-01-08",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-6007",
          "phone": "+1-416-555-6008",
          "address": "600 Spadina Ave, Toronto, ON",
          "lastName": "Lopez",
          "firstName": "Ryan",
          "licenseNo": "PHM-1006"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-10",
          "symptomOnsetDate": "2026-01-09",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:38.864469Z"
    },
    {
      "id": 9,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1985-02-20",
          "phone": "+1-416-555-7007",
          "gender": "M",
          "height": "178 cm",
          "weight": "82 kg",
          "address": "77 Bay Street, Toronto, ON",
          "lastName": "Verma",
          "firstName": "Rohit",
          "healthCardNo": "HC100000007"
        },
        "carePlan": {
          "notes": "Standard antiviral treatment initiated.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-12",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-12",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": false,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-07",
          "ocpNumber": "OCP-1007",
          "pharmacistName": "Emily Brown"
        },
        "assessment": {
          "nka": false,
          "sCr": 90,
          "eGFR": 92,
          "notes": "Penicillin allergy noted.",
          "sCrDate": "2026-01-04",
          "eGFRDate": "2026-01-04",
          "allergies": "Penicillin",
          "eGFRandSCr": "Normal",
          "hasAllergies": true,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-7008",
          "phone": "+1-416-555-7009",
          "address": "700 Front Street, Toronto, ON",
          "lastName": "Brown",
          "firstName": "Emily",
          "licenseNo": "PHM-1007"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-06",
          "symptomOnsetDate": "2026-01-05",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:28.271717Z"
    },
    {
      "id": 8,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1993-11-30",
          "phone": "+1-416-555-8008",
          "gender": "F",
          "height": "165 cm",
          "weight": "61 kg",
          "address": "88 Dundas Street, Toronto, ON",
          "lastName": "Khan",
          "firstName": "Aisha",
          "healthCardNo": "HC100000008"
        },
        "carePlan": {
          "notes": "Dietary advice provided.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-17",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-17",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": true,
          "cough": false,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-1008",
          "pharmacistName": "Daniel Ng"
        },
        "assessment": {
          "nka": true,
          "sCr": 82,
          "eGFR": 99,
          "notes": "GI symptoms present.",
          "sCrDate": "2026-01-10",
          "eGFRDate": "2026-01-10",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": false,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": false
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-8009",
          "phone": "+1-416-555-8010",
          "address": "800 College Street, Toronto, ON",
          "lastName": "Ng",
          "firstName": "Daniel",
          "licenseNo": "PHM-1008"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-11",
          "symptomOnsetDate": "2026-01-10",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:18.785603Z"
    },
    {
      "id": 7,
      "ailmentCode": "INFLUENZA_PROPHYLAXIS",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1988-08-18",
          "phone": "+1-416-555-9009",
          "gender": "M",
          "height": "180 cm",
          "weight": "85 kg",
          "address": "9 King West, Toronto, ON",
          "lastName": "Mehta",
          "firstName": "Karan",
          "healthCardNo": "HC100000009"
        },
        "carePlan": {
          "notes": "Exposure-based prophylaxis.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-19",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-19",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": false,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": false,
          "abruptRespiratory": false
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-1009",
          "pharmacistName": "Olivia Clark"
        },
        "assessment": {
          "nka": true,
          "sCr": 86,
          "eGFR": 98,
          "notes": "Preventive therapy considered.",
          "sCrDate": "2026-01-10",
          "eGFRDate": "2026-01-10",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": false,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": true,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": true,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": false,
          "treatmentOseltamivir": false,
          "preventionOseltamivir": true,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-9010",
          "phone": "+1-416-555-9011",
          "address": "901 Queen St, Toronto, ON",
          "lastName": "Clark",
          "firstName": "Olivia",
          "licenseNo": "PHM-1009"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": null,
          "symptomOnsetDate": "2026-01-11",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:08.143389Z"
    },
    {
      "id": 6,
      "ailmentCode": "INFLUENZA_RENAL_IMPAIRMENT",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1975-04-12",
          "phone": "+1-416-555-1010",
          "gender": "F",
          "height": "160 cm",
          "weight": "68 kg",
          "address": "10 Bloor St, Toronto, ON",
          "lastName": "Rao",
          "firstName": "Sunita",
          "healthCardNo": "HC100000010"
        },
        "carePlan": {
          "notes": "Reduced dose prescribed.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": false,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": true,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-15",
          "phone": false,
          "pcpFax": true,
          "inPerson": true,
          "pcpPhone": false,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-15",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": false,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-10",
          "ocpNumber": "OCP-1010",
          "pharmacistName": "Michael Lee"
        },
        "assessment": {
          "nka": true,
          "sCr": 160,
          "eGFR": 42,
          "notes": "Renal dose adjustment required.",
          "sCrDate": "2026-01-07",
          "eGFRDate": "2026-01-07",
          "allergies": null,
          "eGFRandSCr": "Reduced",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": true,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": true,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": true,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": true,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-1011",
          "phone": "+1-416-555-1012",
          "address": "1010 Yonge St, Toronto, ON",
          "lastName": "Lee",
          "firstName": "Michael",
          "licenseNo": "PHM-1010"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-09",
          "symptomOnsetDate": "2026-01-08",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:53:57.338457Z"
    }
  ],
  "pageable": {
    "pageNumber": 1,
    "pageSize": 5,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "offset": 5,
    "unpaged": false,
    "paged": true
  },
  "last": false,
  "totalElements": 14,
  "totalPages": 3,
  "size": 5,
  "number": 1,
  "sort": {
    "empty": false,
    "unsorted": false,
    "sorted": true
  },
  "numberOfElements": 5,
  "first": false,
  "empty": false
}
```
📝 Behavior

- Returns second page (0-based index)

- Each page contains 5 records

- Sorted by createdAt DESC (default)

### 🔃 Example 4: Sorting Only

Use case : Change sort direction without filters.

📤 Request Body (JSON)
```json
{
  "sortDirection": "ASC"
}
```
📤 Response Body (JSON)
```json
{
  "content": [
    {
      "id": 2,
      "ailmentCode": "ALLERGIC_RHINITIS_CETIRIZINE",
      "assessmentData": {
        "consent": {
          "verbalConsent": true
        },
        "patient": {
          "dob": "2001-09-30",
          "phone": "+1-519-555-9090",
          "gender": "M",
          "height": "180 cm",
          "weight": "76 kg",
          "address": "12 King Road, London, ON",
          "lastName": "Wilson",
          "firstName": "Noah",
          "healthCardNo": "HC667788990"
        },
        "carePlan": {
          "notes": "Cetirizine recommended.",
          "recommendOTC": true,
          "prescriptionIssued": false
        },
        "followUp": {
          "date": "2026-01-20",
          "phone": false
        },
        "symptoms": {
          "fever": false,
          "rhinitis": true,
          "sneezing": true,
          "itchyEyes": true
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-343434",
          "pharmacistName": "Laura King"
        },
        "assessment": {
          "nka": true,
          "notes": "Seasonal allergic rhinitis.",
          "hasAllergies": false
        },
        "medication": {
          "cetirizine": true
        },
        "prescriber": {
          "phone": "+1-519-555-8080",
          "address": "88 Wellington Street, London, ON",
          "lastName": "King",
          "firstName": "Laura",
          "licenseNo": "PHM-121212"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:52:06.503922Z"
    },
    {
      "id": 3,
      "ailmentCode": "UTI_NITROFURANTOIN",
      "assessmentData": {
        "consent": {
          "verbalConsent": true
        },
        "patient": {
          "dob": "1992-07-10",
          "phone": "+1-613-555-2323",
          "gender": "F",
          "height": "168 cm",
          "weight": "63 kg",
          "address": "55 Elgin Street, Ottawa, ON",
          "lastName": "Clark",
          "firstName": "Emily",
          "healthCardNo": "HC112233445"
        },
        "carePlan": {
          "notes": "Nitrofurantoin initiated.",
          "recommendOTC": false,
          "prescriptionIssued": true
        },
        "followUp": {
          "date": "2026-01-19",
          "phone": true
        },
        "symptoms": {
          "fever": false,
          "dysuria": true,
          "urgency": true,
          "flankPain": false,
          "frequency": true
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-990011",
          "pharmacistName": "David Lee"
        },
        "assessment": {
          "nka": true,
          "eGFR": 102,
          "notes": "Uncomplicated UTI.",
          "hasAllergies": false,
          "renalImpairment": false
        },
        "medication": {
          "standardDose": true,
          "nitrofurantoin": true
        },
        "prescriber": {
          "faxNo": "+1-613-555-3434",
          "phone": "+1-613-555-4545",
          "address": "300 Rideau Street, Ottawa, ON",
          "lastName": "Lee",
          "firstName": "David",
          "licenseNo": "PHM-889900"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "symptomOnsetDate": "2026-01-11"
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:53:15.686986Z"
    },
    {
      "id": 4,
      "ailmentCode": "URTI_SUPPORTIVE_CARE",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1998-03-21",
          "phone": "+1-905-555-4444",
          "gender": "M",
          "height": "178 cm",
          "weight": "74 kg",
          "address": "77 Main Street, Brampton, ON",
          "lastName": "Mehta",
          "firstName": "Rahul",
          "healthCardNo": "HC555888999"
        },
        "carePlan": {
          "notes": "Rest, hydration, and OTC symptomatic relief.",
          "inPersonCare": false,
          "recommendOTC": true,
          "recommendNonPharm": true,
          "prescriptionIssued": false,
          "virtualCareTelephone": true,
          "prescriptionNotIssued": true
        },
        "followUp": {
          "date": "2026-01-18",
          "phone": true,
          "inPerson": false
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": false,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": false
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-223344",
          "pharmacistName": "Anita Patel"
        },
        "assessment": {
          "nka": true,
          "notes": "Uncomplicated upper respiratory infection.",
          "allergies": null,
          "eGFRandSCr": "Not Required",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": false,
          "pregnancyBreastfeeding": null
        },
        "medication": {},
        "prescriber": {
          "faxNo": "+1-905-555-7766",
          "phone": "+1-905-555-6655",
          "address": "101 Queen Street, Brampton, ON",
          "lastName": "Patel",
          "firstName": "Anita",
          "licenseNo": "PHM-556677"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": null,
          "symptomOnsetDate": "2026-01-09",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:53:27.430677Z"
    },
    {
      "id": 5,
      "ailmentCode": "COVID19_PAXLOVID",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1985-11-02",
          "phone": "+1-647-555-1111",
          "gender": "F",
          "height": "162 cm",
          "weight": "68 kg",
          "address": "22 Bay Street, Toronto, ON",
          "lastName": "Brown",
          "firstName": "Alice",
          "healthCardNo": "HC987654321"
        },
        "carePlan": {
          "notes": "Isolation and symptom monitoring advised.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-16",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": true,
          "pcpNotifiedDate": "2026-01-16",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": true,
          "paxlovidConfirmDate": "2026-01-13"
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": true,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-778899",
          "pharmacistName": "Michael Green"
        },
        "assessment": {
          "nka": false,
          "sCr": 82,
          "eGFR": 98,
          "notes": "Eligible for Paxlovid based on symptom onset and risk profile.",
          "sCrDate": "2026-01-07",
          "eGFRDate": "2026-01-07",
          "allergies": "Penicillin",
          "eGFRandSCr": "Normal",
          "hasAllergies": true,
          "knownPregnant": false,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": false
        },
        "medication": {
          "standardDose": true,
          "reducedDosePaxlovid": false,
          "treatmentOseltamivir": false,
          "preventionOseltamivir": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false
        },
        "prescriber": {
          "faxNo": "+1-647-555-2211",
          "phone": "+1-647-555-3311",
          "address": "900 Yonge Street, Toronto, ON",
          "lastName": "Green",
          "firstName": "Michael",
          "licenseNo": "PHM-332211"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": "2026-01-08",
          "symptomOnsetDate": "2026-01-06",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:53:42.275070Z"
    },
    {
      "id": 6,
      "ailmentCode": "INFLUENZA_RENAL_IMPAIRMENT",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1975-04-12",
          "phone": "+1-416-555-1010",
          "gender": "F",
          "height": "160 cm",
          "weight": "68 kg",
          "address": "10 Bloor St, Toronto, ON",
          "lastName": "Rao",
          "firstName": "Sunita",
          "healthCardNo": "HC100000010"
        },
        "carePlan": {
          "notes": "Reduced dose prescribed.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": false,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": true,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-15",
          "phone": false,
          "pcpFax": true,
          "inPerson": true,
          "pcpPhone": false,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-15",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": false,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-10",
          "ocpNumber": "OCP-1010",
          "pharmacistName": "Michael Lee"
        },
        "assessment": {
          "nka": true,
          "sCr": 160,
          "eGFR": 42,
          "notes": "Renal dose adjustment required.",
          "sCrDate": "2026-01-07",
          "eGFRDate": "2026-01-07",
          "allergies": null,
          "eGFRandSCr": "Reduced",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": true,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": true,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": true,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": true,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-1011",
          "phone": "+1-416-555-1012",
          "address": "1010 Yonge St, Toronto, ON",
          "lastName": "Lee",
          "firstName": "Michael",
          "licenseNo": "PHM-1010"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-09",
          "symptomOnsetDate": "2026-01-08",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:53:57.338457Z"
    },
    {
      "id": 7,
      "ailmentCode": "INFLUENZA_PROPHYLAXIS",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1988-08-18",
          "phone": "+1-416-555-9009",
          "gender": "M",
          "height": "180 cm",
          "weight": "85 kg",
          "address": "9 King West, Toronto, ON",
          "lastName": "Mehta",
          "firstName": "Karan",
          "healthCardNo": "HC100000009"
        },
        "carePlan": {
          "notes": "Exposure-based prophylaxis.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-19",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-19",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": false,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": false,
          "abruptRespiratory": false
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-1009",
          "pharmacistName": "Olivia Clark"
        },
        "assessment": {
          "nka": true,
          "sCr": 86,
          "eGFR": 98,
          "notes": "Preventive therapy considered.",
          "sCrDate": "2026-01-10",
          "eGFRDate": "2026-01-10",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": false,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": true,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": true,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": false,
          "treatmentOseltamivir": false,
          "preventionOseltamivir": true,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-9010",
          "phone": "+1-416-555-9011",
          "address": "901 Queen St, Toronto, ON",
          "lastName": "Clark",
          "firstName": "Olivia",
          "licenseNo": "PHM-1009"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": null,
          "symptomOnsetDate": "2026-01-11",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:08.143389Z"
    },
    {
      "id": 8,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1993-11-30",
          "phone": "+1-416-555-8008",
          "gender": "F",
          "height": "165 cm",
          "weight": "61 kg",
          "address": "88 Dundas Street, Toronto, ON",
          "lastName": "Khan",
          "firstName": "Aisha",
          "healthCardNo": "HC100000008"
        },
        "carePlan": {
          "notes": "Dietary advice provided.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-17",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-17",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": true,
          "cough": false,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-1008",
          "pharmacistName": "Daniel Ng"
        },
        "assessment": {
          "nka": true,
          "sCr": 82,
          "eGFR": 99,
          "notes": "GI symptoms present.",
          "sCrDate": "2026-01-10",
          "eGFRDate": "2026-01-10",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": false,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": false
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-8009",
          "phone": "+1-416-555-8010",
          "address": "800 College Street, Toronto, ON",
          "lastName": "Ng",
          "firstName": "Daniel",
          "licenseNo": "PHM-1008"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-11",
          "symptomOnsetDate": "2026-01-10",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:18.785603Z"
    },
    {
      "id": 9,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1985-02-20",
          "phone": "+1-416-555-7007",
          "gender": "M",
          "height": "178 cm",
          "weight": "82 kg",
          "address": "77 Bay Street, Toronto, ON",
          "lastName": "Verma",
          "firstName": "Rohit",
          "healthCardNo": "HC100000007"
        },
        "carePlan": {
          "notes": "Standard antiviral treatment initiated.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-12",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-12",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": false,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-07",
          "ocpNumber": "OCP-1007",
          "pharmacistName": "Emily Brown"
        },
        "assessment": {
          "nka": false,
          "sCr": 90,
          "eGFR": 92,
          "notes": "Penicillin allergy noted.",
          "sCrDate": "2026-01-04",
          "eGFRDate": "2026-01-04",
          "allergies": "Penicillin",
          "eGFRandSCr": "Normal",
          "hasAllergies": true,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-7008",
          "phone": "+1-416-555-7009",
          "address": "700 Front Street, Toronto, ON",
          "lastName": "Brown",
          "firstName": "Emily",
          "licenseNo": "PHM-1007"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-06",
          "symptomOnsetDate": "2026-01-05",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:28.271717Z"
    },
    {
      "id": 10,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1987-09-09",
          "phone": "+1-416-555-6006",
          "gender": "F",
          "height": "160 cm",
          "weight": "58 kg",
          "address": "90 Adelaide Street, Toronto, ON",
          "lastName": "Sharma",
          "firstName": "Neha",
          "healthCardNo": "HC100000006"
        },
        "carePlan": {
          "notes": "Rest and hydration advised.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-16",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-16",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": false,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": true,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-11",
          "ocpNumber": "OCP-1006",
          "pharmacistName": "Ryan Lopez"
        },
        "assessment": {
          "nka": true,
          "sCr": 79,
          "eGFR": 102,
          "notes": "Mild influenza symptoms.",
          "sCrDate": "2026-01-08",
          "eGFRDate": "2026-01-08",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-6007",
          "phone": "+1-416-555-6008",
          "address": "600 Spadina Ave, Toronto, ON",
          "lastName": "Lopez",
          "firstName": "Ryan",
          "licenseNo": "PHM-1006"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-10",
          "symptomOnsetDate": "2026-01-09",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:38.864469Z"
    },
    {
      "id": 11,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1990-06-15",
          "phone": "+1-416-555-5005",
          "gender": "M",
          "height": "172 cm",
          "weight": "75 kg",
          "address": "55 Queen Street, Toronto, ON",
          "lastName": "Singh",
          "firstName": "Arjun",
          "healthCardNo": "HC100000005"
        },
        "carePlan": {
          "notes": "Virtual follow-up scheduled.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-13",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-13",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": false,
          "rhinitis": false,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-08",
          "ocpNumber": "OCP-1005",
          "pharmacistName": "Laura Kim"
        },
        "assessment": {
          "nka": true,
          "sCr": 86,
          "eGFR": 97,
          "notes": "No contraindications identified.",
          "sCrDate": "2026-01-05",
          "eGFRDate": "2026-01-05",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-5006",
          "phone": "+1-416-555-5007",
          "address": "500 King Street, Toronto, ON",
          "lastName": "Kim",
          "firstName": "Laura",
          "licenseNo": "PHM-1005"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-07",
          "symptomOnsetDate": "2026-01-06",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:48.982450Z"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "last": false,
  "totalElements": 14,
  "totalPages": 2,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "unsorted": false,
    "sorted": true
  },
  "numberOfElements": 10,
  "first": true,
  "empty": false
}
```
### 🎯 Example 5: Filter by Ailment Code Only

Use case : Fetch assessments for a specific ailment.

📤 Request Body (JSON)
```json
{
  "ailmentCode": "INFLUENZA_OSELTAMIVIR"
}
```
📤 Response Body (JSON)
```json
{
  "content": [
    {
      "id": 15,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1992-05-12",
          "phone": "9876543210",
          "gender": "M",
          "height": "175 cm",
          "weight": "72 kg",
          "address": "123 Main Street, Toronto",
          "lastName": "Doe",
          "firstName": "John",
          "healthCardNo": "HC123456789"
        },
        "carePlan": {
          "notes": "Advised rest, hydration, and symptom monitoring.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-22",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": true,
          "pcpNotifiedDate": "2026-01-22",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": true,
          "paxlovidConfirmDate": "2026-01-19"
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-19",
          "ocpNumber": "OCP556677",
          "pharmacistName": "Dr. Alex Brown"
        },
        "assessment": {
          "nka": false,
          "sCr": "0.9",
          "eGFR": "92",
          "notes": "Patient stable. No contraindications identified.",
          "sCrDate": "2026-01-16",
          "eGFRDate": "2026-01-16",
          "allergies": "Penicillin",
          "eGFRandSCr": "eGFR 92, sCr 0.9",
          "hasAllergies": true,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": false,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": false,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "011-2345678",
          "phone": "9123456789",
          "address": "City Pharmacy, Toronto",
          "lastName": "Smith",
          "firstName": "Sarah",
          "licenseNo": "LIC987654"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": true,
          "positiveTestDate": "2026-01-18",
          "symptomOnsetDate": "2026-01-17",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": "PENDING",
      "pdfUrl": null,
      "createdAt": "2026-01-21T09:52:26.672196Z"
    },
    {
      "id": 12,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1985-02-11",
          "phone": "+1-416-555-4004",
          "gender": "F",
          "height": "165 cm",
          "weight": "70 kg",
          "address": "10 Front Street, Toronto, ON",
          "lastName": "Wilson",
          "firstName": "Emma",
          "healthCardNo": "HC100000004"
        },
        "carePlan": {
          "notes": "Oseltamivir started.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-12",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-12",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": false,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-07",
          "ocpNumber": "OCP-1004",
          "pharmacistName": "Alex Green"
        },
        "assessment": {
          "nka": true,
          "sCr": 88,
          "eGFR": 94,
          "notes": "No contraindications.",
          "sCrDate": "2026-01-04",
          "eGFRDate": "2026-01-04",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-4005",
          "phone": "+1-416-555-4006",
          "address": "400 Bay Street, Toronto, ON",
          "lastName": "Green",
          "firstName": "Alex",
          "licenseNo": "PHM-1004"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-06",
          "symptomOnsetDate": "2026-01-05",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:55:00.356258Z"
    },
    {
      "id": 11,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1990-06-15",
          "phone": "+1-416-555-5005",
          "gender": "M",
          "height": "172 cm",
          "weight": "75 kg",
          "address": "55 Queen Street, Toronto, ON",
          "lastName": "Singh",
          "firstName": "Arjun",
          "healthCardNo": "HC100000005"
        },
        "carePlan": {
          "notes": "Virtual follow-up scheduled.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-13",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-13",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": false,
          "rhinitis": false,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-08",
          "ocpNumber": "OCP-1005",
          "pharmacistName": "Laura Kim"
        },
        "assessment": {
          "nka": true,
          "sCr": 86,
          "eGFR": 97,
          "notes": "No contraindications identified.",
          "sCrDate": "2026-01-05",
          "eGFRDate": "2026-01-05",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-5006",
          "phone": "+1-416-555-5007",
          "address": "500 King Street, Toronto, ON",
          "lastName": "Kim",
          "firstName": "Laura",
          "licenseNo": "PHM-1005"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-07",
          "symptomOnsetDate": "2026-01-06",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:48.982450Z"
    },
    {
      "id": 10,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1987-09-09",
          "phone": "+1-416-555-6006",
          "gender": "F",
          "height": "160 cm",
          "weight": "58 kg",
          "address": "90 Adelaide Street, Toronto, ON",
          "lastName": "Sharma",
          "firstName": "Neha",
          "healthCardNo": "HC100000006"
        },
        "carePlan": {
          "notes": "Rest and hydration advised.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-16",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-16",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": false,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": true,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-11",
          "ocpNumber": "OCP-1006",
          "pharmacistName": "Ryan Lopez"
        },
        "assessment": {
          "nka": true,
          "sCr": 79,
          "eGFR": 102,
          "notes": "Mild influenza symptoms.",
          "sCrDate": "2026-01-08",
          "eGFRDate": "2026-01-08",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-6007",
          "phone": "+1-416-555-6008",
          "address": "600 Spadina Ave, Toronto, ON",
          "lastName": "Lopez",
          "firstName": "Ryan",
          "licenseNo": "PHM-1006"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-10",
          "symptomOnsetDate": "2026-01-09",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:38.864469Z"
    },
    {
      "id": 9,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1985-02-20",
          "phone": "+1-416-555-7007",
          "gender": "M",
          "height": "178 cm",
          "weight": "82 kg",
          "address": "77 Bay Street, Toronto, ON",
          "lastName": "Verma",
          "firstName": "Rohit",
          "healthCardNo": "HC100000007"
        },
        "carePlan": {
          "notes": "Standard antiviral treatment initiated.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": true,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": false,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-12",
          "phone": false,
          "pcpFax": false,
          "inPerson": true,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-12",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": false,
          "cough": true,
          "fever": true,
          "chills": true,
          "fatigue": true,
          "malaise": true,
          "myalgia": true,
          "headache": true,
          "rhinitis": false,
          "soreThroat": false,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-07",
          "ocpNumber": "OCP-1007",
          "pharmacistName": "Emily Brown"
        },
        "assessment": {
          "nka": false,
          "sCr": 90,
          "eGFR": 92,
          "notes": "Penicillin allergy noted.",
          "sCrDate": "2026-01-04",
          "eGFRDate": "2026-01-04",
          "allergies": "Penicillin",
          "eGFRandSCr": "Normal",
          "hasAllergies": true,
          "knownPregnant": null,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": null
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-7008",
          "phone": "+1-416-555-7009",
          "address": "700 Front Street, Toronto, ON",
          "lastName": "Brown",
          "firstName": "Emily",
          "licenseNo": "PHM-1007"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-06",
          "symptomOnsetDate": "2026-01-05",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:28.271717Z"
    },
    {
      "id": 8,
      "ailmentCode": "INFLUENZA_OSELTAMIVIR",
      "assessmentData": {
        "consent": {
          "verbalConsent": true,
          "substituteName": null,
          "substituteConsent": false,
          "substituteRelation": null
        },
        "patient": {
          "dob": "1993-11-30",
          "phone": "+1-416-555-8008",
          "gender": "F",
          "height": "165 cm",
          "weight": "61 kg",
          "address": "88 Dundas Street, Toronto, ON",
          "lastName": "Khan",
          "firstName": "Aisha",
          "healthCardNo": "HC100000008"
        },
        "carePlan": {
          "notes": "Dietary advice provided.",
          "other": false,
          "referToMDNP": false,
          "inPersonCare": false,
          "recommendOTC": true,
          "inPersonCareRefer": false,
          "recommendNonPharm": true,
          "prescriptionIssued": true,
          "virtualCareTelephone": true,
          "inPersonCareNotIssued": false,
          "prescriptionNotIssued": false,
          "issueRxWithModification": false,
          "virtualCareTelephoneRefer": false,
          "virtualCareTelephoneNotIssued": false
        },
        "followUp": {
          "date": "2026-01-17",
          "phone": true,
          "pcpFax": false,
          "inPerson": false,
          "pcpPhone": true,
          "paxlovidPhone": false,
          "pcpNotifiedDate": "2026-01-17",
          "paxlovidInPerson": false,
          "paxlovidConfirmed": false,
          "paxlovidConfirmDate": null
        },
        "symptoms": {
          "gi": true,
          "cough": false,
          "fever": true,
          "chills": false,
          "fatigue": true,
          "malaise": true,
          "myalgia": false,
          "headache": false,
          "rhinitis": true,
          "soreThroat": true,
          "abruptRespiratory": true
        },
        "signature": {
          "date": "2026-01-12",
          "ocpNumber": "OCP-1008",
          "pharmacistName": "Daniel Ng"
        },
        "assessment": {
          "nka": true,
          "sCr": 82,
          "eGFR": 99,
          "notes": "GI symptoms present.",
          "sCrDate": "2026-01-10",
          "eGFRDate": "2026-01-10",
          "allergies": null,
          "eGFRandSCr": "Normal",
          "hasAllergies": false,
          "knownPregnant": false,
          "otherPharmacy": false,
          "liverImpairment": false,
          "renalImpairment": false,
          "medicationListAttached": true,
          "pregnancyBreastfeeding": false
        },
        "medication": {
          "standardDose": true,
          "children1to12": false,
          "infantsUnder1": false,
          "weight23to40kg": false,
          "weightOver40kg": true,
          "weightUnder15kg": false,
          "creatinine10to30": false,
          "creatinineOver30": false,
          "prevAdults13Plus": false,
          "prevChildren1to12": false,
          "renalAdults18Plus": false,
          "prevWeight23to40kg": false,
          "prevWeightOver40kg": false,
          "prevWeightUnder15kg": false,
          "reducedDosePaxlovid": false,
          "adultsChildren13Plus": true,
          "treatmentOseltamivir": true,
          "preventionOseltamivir": false,
          "renalPrevAdults18Plus": false,
          "renalImpairmentTreatment": false,
          "renalImpairmentPrevention": false,
          "renalPrevCreatinine10to30": false,
          "renalPrevCreatinineOver30": false
        },
        "prescriber": {
          "faxNo": "+1-416-555-8009",
          "phone": "+1-416-555-8010",
          "address": "800 College Street, Toronto, ON",
          "lastName": "Ng",
          "firstName": "Daniel",
          "licenseNo": "PHM-1008"
        },
        "eligibility": {
          "noRedFlags": true,
          "clinicalJudgment": false,
          "positiveTestDate": "2026-01-11",
          "symptomOnsetDate": "2026-01-10",
          "outbreakDiagnosis": false
        }
      },
      "lastFollowupDate": null,
      "followupStatus": null,
      "pdfUrl": null,
      "createdAt": "2026-01-15T06:54:18.785603Z"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "offset": 0,
    "unpaged": false,
    "paged": true
  },
  "last": true,
  "totalElements": 6,
  "totalPages": 1,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "unsorted": false,
    "sorted": true
  },
  "numberOfElements": 6,
  "first": true,
  "empty": false
}
```
📝 Behavior

- Exact match on ailmentCode

- No other filters applied

## 🔀 Filter Combination Support

- This API supports multiple filters used together in a single request.

- All filter fields in AssessmentFilterRequest are optional

- When multiple filters are provided, the API applies them using AND logic

- Results must satisfy all provided conditions

## ✅ Supported Filter Combinations
Users can combine any of the following in one request:

- ailmentCode

- followupStatus

- patientName (first name or last name)

- dateFrom

- dateTo

- Pagination (page, size)

- Sorting (sortBy, sortDirection)
- ---
- **Response Status**: 200 OK
- ----


