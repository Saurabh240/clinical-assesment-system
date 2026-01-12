
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
- ## 🔄 Endpoint: "/assessments/{ASSESSMENT_ID}/pdf"

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
