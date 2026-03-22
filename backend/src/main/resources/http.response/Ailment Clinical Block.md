# Ailment Clinical Block - JSON Bodies

## Tamiflu -Json Body
{
  "consent": {
    "verbalConsent": true,
    "substituteName": null,
    "substituteConsent": false,
    "substituteRelation": null
  },
  "patient": {
    "dob": "1992-06-15",
    "phone": "+1-416-555-1234",
    "gender": "M",
    "height": "175 cm",
    "weight": "72 kg",
    "address": "123 Main Street, Toronto, ON",
    "lastName": "Doe",
    "firstName": "John",
    "healthCardNo": "HC123456789"
  },
  "carePlan": {
    "notes": "",
    "other": false,
    "referToMDNP": false,
    "inPersonCare": true,
    "recommendOTC": false,
    "inPersonCareRefer": false,
    "recommendNonPharm": false,
    "prescriptionIssued": true,
    "virtualCareTelephone": false,
    "inPersonCareNotIssued": false,
    "prescriptionNotIssued": false,
    "issueRxWithModification": false,
    "virtualCareTelephoneRefer": false,
    "virtualCareTelephoneNotIssued": false
  },
  "followUp": {
    "date": null,
    "phone": false,
    "pcpFax": false,
    "inPerson": false,
    "pcpPhone": false,
    "paxlovidPhone": false,
    "pcpNotifiedDate": null,
    "paxlovidInPerson": false,
    "paxlovidConfirmed": false,
    "paxlovidConfirmDate": null
  },
  "symptoms": {
    "gi": false,
    "cough": true,
    "fever": true,
    "chills": false,
    "fatigue": false,
    "malaise": true,
    "myalgia": false,
    "headache": true,
    "rhinitis": false,
    "soreThroat": false,
    "abruptRespiratory": true
  },
  "signature": {
    "date": "2025-01-03",
    "ocpNumber": "OCP-445566",
    "pharmacistName": "Sarah Smith"
  },
  "assessment": {
    "nka": true,
    "sCr": null,
    "eGFR": null,
    "notes": "",
    "sCrDate": null,
    "eGFRDate": null,
    "allergies": "NKA",
    "eGFRandSCr": null,
    "hasAllergies": false,
    "knownPregnant": false,
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
    "faxNo": "+1-416-555-7788",
    "phone": "+1-416-555-8899",
    "address": "456 Pharmacy Ave, Toronto, ON",
    "lastName": "Smith",
    "firstName": "Sarah",
    "licenseNo": "PHR-998877"
  },
  "eligibility": {
    "noRedFlags": true,
    "clinicalJudgment": true,
    "positiveTestDate": "2025-01-02",
    "symptomOnsetDate": "2025-01-01",
    "outbreakDiagnosis": false
  }
}

---
## UTI -Jsom Body

{
"ailmentCode": "UTI",
"data": {
"ailment": {
"code": "UTI",
"displayName": "Urinary Tract Infection (UTI)",
"clinicalBlock": {
"criteria": {
"notMale": true,
"ageAbove12": true,
"noRedFlags": true,
"noRecentUTI": true,
"noRedFlagSymptoms": true,
"previousDiagnosisUTI": true
},
"symptoms": {
"dysuria": true,
"frequency": true,
"noVaginalDischarge": true,
"suprapubicDiscomfort": true
},
"treatment": {
"selected": "Nitrofurantoin"
}
}
},
"patient": {
"dob": "1990-05-14",
"gender": "F",
"phone": "416-555-0192",
"height": "165 cm",
"weight": "62 kg",
"address": "123 Maple Street, Toronto, ON M4B 1B3",
"lastName": "Doe",
"firstName": "Jane",
"healthCardNo": "1234-567-890"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0101",
"phone": "416-555-0100",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Mitchell",
"firstName": "Sarah",
"licenseNo": "RPH-20341"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": true,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": true,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": true,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Nitrofurantoin (MacroBID)",
"strength": "100 mg",
"quantity": "10 capsules",
"direction": "Take 1 capsule twice daily x 5 days with food"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-02-15",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-02-20",
"phone": true,
"inPerson": false,
"monitoringParameters": ""
}
}
}

## DERMATITIS -Json body

{
"ailmentCode": "DERMATITIS",
"data": {
"ailment": {
"code": "DERMATITIS",
"displayName": "Atopic and Contact Dermatitis",
"clinicalBlock": {
"criteria": {
"noBleeding": true,
"palmsNotAffected": true,
"noRecentContact": true,
"noSignsOfInfection": true,
"lesionsBelow30BSA": true,
"notSignificantlyInterfering": true
},
"symptoms": {
"other": false,
"drySkin": true,
"pruritus": true,
"otherDetail": "",
"rednessPatches": true
},
"treatment": {
"desonide005": false,
"desonide005g": "",
"hydrocortisone": true,
"hydrocortisone1": false,
"hydrocortisone1g": "",
"hydrocortisone2": true,
"hydrocortisone2g": "30",
"hydrocortisone25": false,
"hydrocortisone25g": "",
"beclomethasone": false,
"beclomethasoneG": "",
"betamethasone005": false,
"betamethasone005g": "",
"betamethasone01": false,
"betamethasone01g": "",
"betamethasoneValerate": false,
"clobetasone": false,
"clobetasoneG": "",
"desonide002": false,
"desonide002g": "",
"fluocinolone": false,
"fluocinoloneG": "",
"prednicarbate": false,
"prednicarbateG": "",
"triamcinolone": false,
"triamcinolone01": false,
"triamcinolone01g": "",
"triamcinolone05": false,
"triamcinolone05g": "",
"hydrocortisoneValerate": false,
"hydrocortisoneValerateG": "",
"crisaborole": false,
"crisaboroleG": ""
}
}
},
"patient": {
"dob": "1995-08-20",
"gender": "F",
"phone": "416-555-0234",
"height": "160 cm",
"weight": "58 kg",
"address": "789 Oak Avenue, Toronto, ON M6K 2T1",
"lastName": "Smith",
"firstName": "Emily",
"healthCardNo": "9876-543-210"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0202",
"phone": "416-555-0201",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Mitchell",
"firstName": "Sarah",
"licenseNo": "RPH-20341"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": true,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": false,
"none": true,
"notes": "",
"allergies": true,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "Penicillin",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": true,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": true,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Hydrocortisone 2% Cream",
"strength": "2%",
"quantity": "30 g",
"direction": "Apply thin layer to affected area twice daily x 2 weeks"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-02-15",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-02-22",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for improvement in symptoms after 2 weeks. Watch for signs of skin infection or worsening condition."
}
}
}
---
## DYSMENORRHEA
{
"ailmentCode": "DYSMENORRHEA",
"data": {
"ailment": {
"code": "DYSMENORRHEA",
"displayName": "Dysmenorrhea",
"clinicalBlock": {
"symptoms": {
"other": false,
"otherDetail": "",
"painLasts2to3Days": true,
"painWithMenses": true,
"painRadiating": true,
"lowerAbdominalPain": true
},
"criteria": {
"ageAbove12": true,
"noIUDLastYear": true,
"noSystemicInfection": true,
"noPainOutsideMenses": true,
"noHistoryOfComplications": true,
"initialOnsetWithMenstruation": true
},
"treatment": {
"selected": "Naproxen500"
}
}
},
"patient": {
"dob": "2000-03-15",
"gender": "F",
"phone": "647-555-0312",
"height": "165 cm",
"weight": "62 kg",
"address": "321 Maple Street, Toronto, ON M4B 1B3",
"lastName": "Johnson",
"firstName": "Rachel",
"healthCardNo": "1234-567-890"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": true,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Naproxen",
"strength": "500 mg",
"quantity": "6 tablets",
"direction": "Take 1 tablet twice daily x 3 days. Refills x 3"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-02-15",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-02-18",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for pain relief after first cycle. Reassess if symptoms worsen or do not improve."
}
}
}
---
## INSECT_BITES
{
"ailmentCode": "INSECT_BITES",
"data": {
"ailment": {
"code": "INSECT_BITES",
"displayName": "Insect Bites and Urticaria",
"clinicalBlock": {
"symptoms": {
"areaOfBites": true,
"inflammation": true,
"redness": true,
"itch": true,
"pain": false,
"hives": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"noRednessExpanded": true,
"noAnaphylacticReaction": true,
"noExtensiveSkinSymptoms": true,
"noLesionsOver7Days": true,
"noLesionsInfected": true,
"noSwollenLymphNodes": true
},
"treatment": {
"desonide": false,
"hydrocortisone": true,
"bilastine": false,
"bilastineAdult": false,
"bilastineChild": false,
"cetirizine": true,
"cetirizineAdult": true,
"cetirizineChild6to12m": false,
"cetirizineChild12to23m": false,
"cetirizineChild2to5": false,
"rupatadine": false,
"rupatadineAdult": false,
"rupatadineChild2to11": false,
"rupatadine10to25kg": false,
"rupatadineOver25kg": false,
"hydroxyzine": false,
"hydroxyzineAdult": false,
"hydroxyzineChild6to40kg": false,
"hydroxyzineChildUnder6": false
},
"otcTreatment": {
"benzocaine": false,
"pramoxine": false,
"camphor": true,
"calamine": true
}
}
},
"patient": {
"dob": "1990-06-10",
"gender": "M",
"phone": "416-555-0789",
"height": "175 cm",
"weight": "78 kg",
"address": "55 King Street West, Toronto, ON M5H 1J9",
"lastName": "Brown",
"firstName": "Michael",
"healthCardNo": "5678-901-234"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0202",
"phone": "416-555-0201",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": true,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNA": true,
"pregnantNo": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": true,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Hydrocortisone 1% Cream",
"strength": "1%",
"quantity": "15 g",
"direction": "Apply to affected area twice daily PRN, maximum 7 days"
},
{
"name": "Cetirizine",
"strength": "10 mg",
"quantity": "7 tablets",
"direction": "Take 1 tablet once daily PO PRN for itching"
}
]
},
"signature": {
"date": "2025-02-15",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-02-22",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of symptoms within 7 days. Return if redness expands, signs of infection develop, or symptoms worsen."
}
}
}
---
## CONJUNCTIVITIS
{
"ailmentCode": "CONJUNCTIVITIS",
"data": {
"ailment": {
"code": "CONJUNCTIVITIS",
"displayName": "Conjunctivitis",
"clinicalBlock": {
"symptoms": {
"bacterial": {
"generalizedRedness": true,
"mucopurulentDischarge": true,
"minimalItching": true,
"unilateralToBilateral": false
},
"viral": {
"generalizedRedness": false,
"wateryMucoidDischarge": false,
"minimalItching": false,
"bilateralLymphadenopathy": false,
"unilateralToBilateral": false,
"pharyngitisAndFever": false
},
"allergic": {
"itching": false,
"wateryMucoid": false,
"generalizedRedness": false,
"conjunctivalEdema": false,
"bilateral": false,
"sneezingCongestion": false
}
},
"criteria": {
"noVisualAcuityLoss": true,
"noIrregularPupils": true,
"noCornealOpacity": true,
"noFocalRedness": true,
"noHyperPurulentDischarge": true,
"noCiliaryFlush": true,
"noPhotophobia": true,
"noRashBlisters": true,
"noModerateSeverePain": true,
"noHeadacheNausea": true,
"symptomsDurationUnder2Weeks": true,
"noForeignBodySensation": true,
"noHistoryEyeTrauma": true,
"noUnresponsiveSymptoms": true,
"noContactLensUse": true
},
"treatment": {
"bacterial": {
"gramicidinPolymyxin": false,
"erythromycin": false,
"fusidicAcid": true,
"polymyxinTrimethoprim": false,
"tobramycin": false,
"tobramycinDrops": false,
"tobramycinOintment": false,
"other": false,
"otherDetail": ""
},
"viral": {
"antazolineNaphazoline": false,
"pheniramiineNaphazoline": false,
"tetrahydrozoline": false,
"naphazoline": false,
"other": false,
"otherDetail": ""
},
"allergic": {
"firstLine": {
"olopatadine": false,
"olopatadineOver3y07": false,
"olopatadineOver3y07Days": "",
"olopatadineOver3y01": false,
"olopatadineOver3y01Days": "",
"olopatadineAdult02": false,
"olopatadineAdult02Days": "",
"lodoxamide": false,
"lodoxamideDays": "",
"bepotastine": false,
"bepotastineDays": "",
"ketotifen": false,
"ketotifenDays": "",
"other": false,
"otherDetail": ""
},
"secondLine": {
"sodiumCromoglycate": false,
"sodiumCromoglycateDays": "",
"lodoxamide": false,
"lodoxamideDays": "",
"antazolineNaphazoline": false,
"pheniramiineNaphazoline": false,
"naphazoline005": false,
"tetrahydrozoline": false,
"other": false,
"otherDetail": ""
}
}
}
}
},
"patient": {
"dob": "1985-07-10",
"gender": "F",
"phone": "416-555-0150",
"height": "162 cm",
"weight": "58 kg",
"address": "88 Birch Street, Toronto, ON M4E 2R1",
"lastName": "Patel",
"firstName": "Priya",
"healthCardNo": "5678-901-234"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": true,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Fusidic Acid",
"strength": "1%",
"quantity": "1 tube (3g)",
"direction": "Instill 1 drop in affected eye(s) Q12H x 7 days"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of discharge and redness. Reassess if symptoms worsen or do not improve within 7 days, or if visual changes occur."
}
}
}
---
## HEMORRHOIDS
{
"ailmentCode": "HEMORRHOIDS",
"data": {
"ailment": {
"code": "HEMORRHOIDS",
"displayName": "Hemorrhoids",
"clinicalBlock": {
"symptoms": {
"constipation": true,
"strainingWithDefecation": true,
"pruritus": true,
"minimalBleeding": false,
"minorAnalPain": true,
"other": false,
"otherDetail": ""
},
"criteria": {
"ageOver12AndOver50NoNewOnset": true,
"noRecentPhysicalTrauma": true,
"noDarkRedRectalBleeding": true,
"noPersonalFamilyHistoryPolyps": true,
"noPreviousTherapiesWithin7Days": true
},
"treatment": {
"proctosedylOintment": true,
"proctosedylOintmentGrams": "30",
"proctosedylSuppositories": false,
"proctosedylSuppositoriesQty": "",
"anusolvHCOintment": false,
"anusolvHCOintmentGrams": "",
"anusolvHCSuppositories": false
},
"otcTreatment": {
"anusolvPlusOintment": false,
"anusolvPlusOintmentGrams": "",
"anusolvPlusSuppositories": false,
"anusolvPlusSuppositoriesQty": "",
"preparationHPEGel": false,
"preparationHPEGelGrams": ""
}
}
},
"patient": {
"dob": "1972-04-22",
"gender": "M",
"phone": "416-555-0275",
"height": "178 cm",
"weight": "85 kg",
"address": "55 Elm Street, Toronto, ON M5G 1H1",
"lastName": "Chen",
"firstName": "David",
"healthCardNo": "3456-789-012"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": true,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Proctosedyl",
"strength": "1% ointment",
"quantity": "30 g",
"direction": "Apply BID and after each bowel movement x 7 days"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for relief of pruritus and anal pain. Reassess if symptoms worsen, bleeding increases, or no improvement within 7 days."
}
}
}
---
## IMPETIGO
{
"ailmentCode": "IMPETIGO",
"data": {
"ailment": {
"code": "IMPETIGO",
"displayName": "Impetigo",
"clinicalBlock": {
"symptoms": {
"smallVesicles": true,
"honeyCrust": true,
"tenderItchy": true,
"multipleVesicles": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"nonBullousBlister": true,
"noSystemicSymptoms": true,
"immunocompetent": true,
"noExtensiveSkinLesions": true
},
"treatment": {
"firstLine": {
"fucidinCream": true,
"mupirocinOintment": false
},
"secondLine": {
"ozenoxacin": false,
"bacitracin": false,
"bacitracin15g": false
}
}
}
},
"patient": {
"dob": "1995-11-03",
"gender": "M",
"phone": "647-555-0188",
"height": "172 cm",
"weight": "74 kg",
"address": "210 Cedar Avenue, Toronto, ON M6K 2H5",
"lastName": "Nguyen",
"firstName": "Kevin",
"healthCardNo": "7890-123-456"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": true,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Fucidin",
"strength": "2% Cream",
"quantity": "15 g",
"direction": "Apply BID-TID to affected area x 7-14 days"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of lesions and crusting. Reassess if symptoms worsen, spread, or do not improve within 7 days, or if systemic symptoms develop."
}
}
}
---
## TICK_BITES
{
"ailmentCode": "TICK_BITES",
"data": {
"ailment": {
"code": "TICK_BITES",
"displayName": "Tick Bites",
"clinicalBlock": {
"symptoms": {
"inflammation": true,
"redness": true,
"itch": false,
"pain": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"noErythemaMigrainesBullsEye": true,
"noSystemicSymptoms": true,
"mustMeetAll3": true,
"tickRemovedWithin72Hours": true,
"tickBiteInBlackleggedArea": true,
"tickAttached36HoursOrMore": true
},
"treatment": {
"doxycycline": true,
"doxycyclineAdult": true,
"doxycyclineChild": false
}
}
},
"patient": {
"dob": "1988-09-14",
"gender": "M",
"phone": "416-555-0322",
"height": "180 cm",
"weight": "82 kg",
"address": "77 Spruce Lane, Toronto, ON M4C 3K2",
"lastName": "Thompson",
"firstName": "Mark",
"healthCardNo": "2345-678-901"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": true,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Doxycycline",
"strength": "200 mg",
"quantity": "1 tablet",
"direction": "Take 1 tablet PO x 1 dose"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for development of erythema migrans rash, fever, chills, headache, or joint aches. Advise patient to seek immediate medical attention if any systemic symptoms develop within 30 days."
}
}
}
---
## ALLERGIC_RHINITIS
{
"ailmentCode": "ALLERGIC_RHINITIS",
"data": {
"ailment": {
"code": "ALLERGIC_RHINITIS",
"displayName": "Allergic Rhinitis",
"clinicalBlock": {
"symptoms": {
"congestion": true,
"sneezing": true,
"postnasalDrip": true,
"coughing": false,
"runnyNose": true,
"headache": false,
"soreThroat": false,
"hives": false,
"itchyEyes": true,
"allergicShiner": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"over2YearsOfAge": true,
"noConcomitantAsthma": true,
"symptomsUnder2Weeks": true,
"noShortnessOfBreath": true,
"bilateralSymptoms": true,
"noFever": true,
"noSevereHeadacheOrEyePain": true,
"noCloseContactInfectiousDisease": true,
"noRecurrentNosebleeds": true
},
"treatment": {
"bilastine": false,
"bilastineAdult": false,
"bilastineChild4to11": false,
"cetirizine": false,
"cetirizineAdult": false,
"cetirizineChild6to12m": false,
"cetirizineChild12to23m": false,
"cetirizineChild2to5": false,
"desloratadine": false,
"desloratadineAdult": false,
"desloratadineChild6to11m": false,
"desloratadineChild1to5": false,
"desloratadineChild6to11": false,
"fexofenadine": false,
"fexofenadineAdult": false,
"fexofenadineChild2to11": false,
"rupatadine": false,
"rupatadineAdult": false,
"rupatadineChild2to11": false,
"rupatadine10to25kg": false,
"rupatadineOver25kg": false,
"loratadine": false,
"loratadineAdult": false,
"loratadineChild2to5": false,
"beclomethasone": false,
"beclomethasoneAdult": false,
"budesonide": true,
"budesonideNasalSuspension": true,
"budesonideNasalSuspensionAdult": true,
"budesonideNasalPowder": false,
"budesonideNasalPowderAdult": false,
"ciclesonide": false,
"ciclesonideAdult": false,
"fluticasonePropionate": false,
"fluticasonePropionateAdult": false,
"fluticasonePropionateChild4to11": false,
"fluticasoneFuroate": false,
"fluticasoneFuroateAdult": false,
"fluticasoneFuroateChild2to11": false,
"mometasone": false,
"mometasoneAdult": false,
"mometasoneChild3to11": false,
"triamcinolone": false,
"triamcinoloneAdult": false,
"triamcinoloneChild4to11": false,
"azelastineFluticasone": false,
"azelastineFluticasoneAdult": false
},
"otcTreatment": {
"chlorpheniramine": false,
"chlorpheniramineAdult": false,
"chlorpheniramineChild": false,
"diphenhydramine": false,
"diphenhydramineAdult": false,
"diphenhydramineChild": false,
"cyproheptadine": false,
"cyproheptadineAdult": false,
"cyproheptadineChild2to6": false,
"cyproheptadineChild7to14": false,
"pseudoephedrine": false,
"pseudoephedrineAdult": false,
"pseudoephedrineSR": false,
"pseudoephedrineChild6to11": false,
"cetirizinePseudoephedrine": false,
"cetirizinePseudoephedrineAdult": false,
"desloratadinePseudoephedrine": false,
"desloratadinePseudoephedrineAdult": false,
"fexofenadinePseudoephedrine": false,
"fexofenadinePseudoephedrineAdult": false,
"loratadinePseudoephedrine": false,
"loratadinePseudoephedrineAdult": false,
"oxymetazoline": false,
"oxymetazolineAdult": false,
"pheniraminePhenylepherine": false,
"pheniraminePhenylepherineAdult": false,
"xylometazoline": false,
"xylometazolineAdult": false
}
}
},
"patient": {
"dob": "1992-05-18",
"gender": "F",
"phone": "416-555-0245",
"height": "168 cm",
"weight": "64 kg",
"address": "33 Willow Crescent, Toronto, ON M3H 2L4",
"lastName": "Kaur",
"firstName": "Simran",
"healthCardNo": "4567-890-123"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": true,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Budesonide",
"strength": "64 mcg/metered dose nasal suspension",
"quantity": "1 bottle",
"direction": "2 sprays in each nostril once daily. May decrease to 1 spray in each nostril daily once controlled."
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-23",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for reduction in congestion, sneezing, and rhinorrhea. Reassess if symptoms do not improve within 2 weeks or if new symptoms develop."
}
}
}
---
## COLD_SORE
{
"ailmentCode": "COLD_SORE",
"data": {
"ailment": {
"code": "COLD_SORE",
"displayName": "Cold Sores",
"clinicalBlock": {
"symptoms": {
"prodromalSymptoms": true,
"lesionsUnder14Days": false,
"singlePainfulLesion": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"atLeast1PreviousColdSore": true,
"noLesionsNoseOrOcular": true,
"noSystemicIllness": true
},
"treatment": {
"valacyclovir2000mg": true,
"acyclovir400mg": false,
"famciclovir750mg": false,
"famciclovir1500mg": false,
"acyclovirTopical": false,
"acyclovirHydrocortisone": false
},
"otcTreatment": {
"docosanol": false
}
}
},
"patient": {
"dob": "1992-08-17",
"gender": "F",
"phone": "416-555-0244",
"height": "167 cm",
"weight": "63 kg",
"address": "33 Birchwood Drive, Toronto, ON M6S 2P1",
"lastName": "Martin",
"firstName": "Sophie",
"healthCardNo": "6789-012-345"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": true,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Valacyclovir",
"strength": "2000 mg",
"quantity": "2 tablets",
"direction": "Take 2000 mg BID PO x 1 day (2 doses total, 12 hours apart)"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of prodromal symptoms and prevention of lesion outbreak. Advise patient to seek medical attention if lesions spread to ocular area or systemic symptoms develop."
}
}
}
---
## GERD
{
"ailmentCode": "GERD",
"data": {
"ailment": {
"code": "GERD",
"displayName": "GERD",
"clinicalBlock": {
"symptoms": {
"burningThroat": true,
"worseLyingDown": true,
"regurgitation": false,
"other": false,
"otherDetail": "",
"mild": true,
"mildInfrequent": false,
"mildFrequent": true,
"moderate": false
},
"criteria": {
"noRedFlags": true,
"ageOver18Or50NoNewOnset": true,
"noGICancer": true,
"noRecurrenceWithin90Days": true
},
"treatment": {
"mildInfrequent": {
"firstLine": {
"otcH2RA": false,
"otcH2RAProduct": ""
},
"secondLine": {
"cimetidine": false,
"famotidine": false,
"nizatidine": false,
"ranitidine": false
},
"thirdLine": {
"dexlansoprazole": false,
"esomeprazole": false,
"lansoprazole": false,
"omeprazole": true,
"pantoprazoleSodium": false,
"pantoprazoleMagnesium": false,
"rabeprazole": false
}
},
"moderateFrequent": {
"dexlansoprazole": false,
"esomeprazole": false,
"lansoprazole": false,
"omeprazole": false,
"pantoprazoleSodium": false,
"pantoprazoleMagnesium": false,
"rabeprazole": false
}
}
}
},
"patient": {
"dob": "1978-05-30",
"gender": "M",
"phone": "416-555-0311",
"height": "176 cm",
"weight": "88 kg",
"address": "90 Walnut Street, Toronto, ON M5T 2Z1",
"lastName": "Kowalski",
"firstName": "Peter",
"healthCardNo": "8901-234-567"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": true,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Omeprazole",
"strength": "20 mg",
"quantity": "28 capsules",
"direction": "Take 1 capsule PO daily x 4 weeks"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-04-06",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of heartburn and regurgitation symptoms. Advise patient to take 30 minutes before meals. Reassess if symptoms persist or worsen after 4 weeks."
}
}
}
---
## MUSCULOSKELETAL_SPRAINS
{
"ailmentCode": "MUSCULOSKELETAL_SPRAINS",
"data": {
"ailment": {
"code": "MUSCULOSKELETAL_SPRAINS",
"displayName": "Musculoskeletal Sprains and Strains",
"clinicalBlock": {
"symptoms": {
"pain": true,
"swelling": true,
"tenderness": true,
"bruising": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"noEyeHeadInjury": true,
"noSeverePainOrFracture": true,
"ableToBearWeight": true
},
"treatment": {
"acetaminophen": false,
"asa": false,
"ibuprofen": false,
"naproxen": false,
"diclofenacDiethylamine": true,
"diclofenacSodium": false,
"celecoxib": false,
"flurbiprofen": false,
"ketoprofen": false,
"mefenamicAcid": false
},
"otcTreatment": {
"ibuprofen": false,
"ibuprofenAdult": false,
"ibuprofenChild": false,
"naproxenSodium": false
}
}
},
"patient": {
"dob": "1995-02-11",
"gender": "M",
"phone": "647-555-0177",
"height": "181 cm",
"weight": "86 kg",
"address": "45 Lakeview Crescent, Toronto, ON M8V 1Y3",
"lastName": "Rivera",
"firstName": "Carlos",
"healthCardNo": "9012-345-678"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": true,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Diclofenac diethylamine (Voltaren)",
"strength": "1.16% gel",
"quantity": "1 tube (100g)",
"direction": "Apply to affected area TID-QID x 7 days"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for reduction in pain, swelling, and tenderness. Advise RICE (Rest, Ice, Compression, Elevation). Reassess if symptoms worsen or do not improve within 7 days."
}
}
}
---
## CANDIDAL_STOMATITIS
{
"ailmentCode": "CANDIDAL_STOMATITIS",
"data": {
"ailment": {
"code": "CANDIDAL_STOMATITIS",
"displayName": "Candidal Stomatitis",
"clinicalBlock": {
"symptoms": {
"curdLikeSpots": true,
"plaqueRemoval": true,
"fuzzyFeeling": true,
"other": false,
"otherDetail": ""
},
"criteria": {
"noRecentAntibioticOrCorticosteroid": true,
"noDenturesOrSwelling": true,
"lesionsUnder3Weeks": true,
"lesionsNotUlcerousOrVesicular": true
},
"treatment": {
"nystatinAdult": true,
"nystatinInfant": false
}
}
},
"patient": {
"dob": "1968-11-22",
"gender": "F",
"phone": "416-555-0388",
"height": "160 cm",
"weight": "65 kg",
"address": "27 Pine Avenue, Toronto, ON M6J 1W4",
"lastName": "Dubois",
"firstName": "Marie",
"healthCardNo": "1234-098-765"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": true,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Nystatin",
"strength": "100,000 units/mL oral suspension",
"quantity": "300 mL",
"direction": "Swish & swallow 400,000 - 600,000 units (4-6 mL) QID x 7-14 days"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-23",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of white plaques and oral discomfort. Advise patient to continue treatment for full duration even if symptoms resolve. Reassess if no improvement within 7 days or symptoms worsen."
}
}
}
---
## ACNE
{
"ailmentCode": "ACNE",
"data": {
"ailment": {
"code": "ACNE",
"displayName": "Acne",
"clinicalBlock": {
"symptoms": {
"comedonal": true,
"mildInflammatory": true,
"previousDiagnosis": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"ageOver12": true,
"noSuspectedDrugInduced": true,
"noFamilyHistoryScarring": true,
"noAlarmSigns": true,
"noNodulesOrCysts": true,
"under20Comedones": true,
"under15InflammatoryPapules": true,
"totalLesionUnder30": true,
"noErythemaPapulesWithoutComedones": true,
"noWidespreadInflammatory": true,
"noHighAnxietyLowSelfEsteem": true,
"newOnsetAgeUnder30": true
},
"treatment": {
"clindamycin1Sol": false,
"azelaicAcid15Gel": false,
"adapalene01or03": false,
"tazarotene": false,
"tretinoin": false,
"trifarotene": false,
"dapsone5Gel": false,
"benzoylPeroxide10": false,
"adapaleneBenzoylPeroxide": true,
"clindamycinBenzoylPeroxide": false,
"erythromycinBenzoylPeroxide": false,
"tretinoinClindamycin": false
},
"otcTreatment": {
"benzoylPeroxide25to5": false,
"glycolicAcid": false,
"salicylicAcid": false
}
}
},
"patient": {
"dob": "2006-04-18",
"gender": "F",
"phone": "647-555-0421",
"height": "163 cm",
"weight": "55 kg",
"address": "12 Rosewood Lane, Toronto, ON M4E 1P2",
"lastName": "Tran",
"firstName": "Lily",
"healthCardNo": "3456-210-987"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": true,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Adapalene 0.1% / Benzoyl Peroxide 2.5% Gel (TactuPump)",
"strength": "0.1% / 2.5%",
"quantity": "1 pump (45g)",
"direction": "Apply a thin layer to entire affected area QHS x 8-12 weeks"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-05-04",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for reduction in comedones and inflammatory papules. Advise patient that improvement may take 6-8 weeks. Reassess if no response after 12 weeks or irritation/worsening occurs."
}
}
}
---
## APHTHOUS_ULCERS
{
"ailmentCode": "APHTHOUS_ULCERS",
"data": {
"ailment": {
"code": "APHTHOUS_ULCERS",
"displayName": "Aphthous Ulcers",
"clinicalBlock": {
"symptoms": {
"roundOrOvalUlcers": true,
"durationUnder14Days": true,
"mucosalSurfaces": true,
"shallowAndPainful": true,
"historyRecurrentUnder6PerYear": true,
"other": false,
"otherDetail": ""
},
"criteria": {
"notImmunocompromised": true,
"noHistoryUlcersOver14DaysOrScarring": true,
"currentLesionUnder14Days": true,
"firstOccurrenceUnder30": true,
"noRecentContactSameSymptoms": true,
"noRecentNewDrug": true,
"noSystemicSymptoms": true,
"noLesionsElsewhere": true,
"noSeverePainInhibitingEating": true,
"noRecurrencesOver6PerYear": true,
"diameterUnder1cm": true,
"under5UlcersPresent": true,
"noClustersManySmallUlcers": true
},
"treatment": {
"triamcinoloneAcetonide": true
},
"otcTreatment": {
"benzocaine": false,
"lidocaineViscous": false,
"carboxymethylCellulose": true
}
}
},
"patient": {
"dob": "1993-07-05",
"gender": "F",
"phone": "416-555-0455",
"height": "166 cm",
"weight": "61 kg",
"address": "58 Chestnut Street, Toronto, ON M5G 1R4",
"lastName": "Ahmed",
"firstName": "Sara",
"healthCardNo": "5678-321-098"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"aphthousUlcers": true,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": true,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Triamcinolone Acetonide",
"strength": "0.1% oral paste",
"quantity": "1 tube (5g)",
"direction": "Dab small amount (0.5cm) to ulcer(s) QHS and as required up to TID PC PRN x 7 days. Do not rub in."
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of ulcer pain and healing within 7 days. Advise patient to avoid spicy/acidic foods. Reassess if ulcers persist beyond 14 days, worsen, or new lesions develop elsewhere."
}
}
}
---
## NAUSEA_VOMITING_PREGNANCY
{
"ailmentCode": "NAUSEA_VOMITING_PREGNANCY",
"data": {
"ailment": {
"code": "NAUSEA_VOMITING_PREGNANCY",
"displayName": "Nausea and Vomiting of Pregnancy",
"clinicalBlock": {
"symptoms": {
"confirmedPregnancy": true,
"onsetFirst9Weeks": true,
"mildNausea": true,
"personalHistoryGERD": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"noRedFlags": true,
"noDiabetes": true,
"noFeverOrOtherSymptoms": true,
"noAbdominalPain": true,
"mildToModerateNVP": true,
"noIronDeficiencyAnemia": true,
"ableToKeepDownMeds": true
},
"treatment": {
"doxylaminePyridoxine": true,
"pyridoxine25mg": false,
"gingerTablet": false,
"dimenhydrinate50mg": false,
"diphenhydramine25mg": false,
"promethazine": false
},
"otherRecommendations": {
"fluidAndElectrolyte": true,
"smallBlandMeals": true,
"eatWhenNauseaLess": true,
"avoidStrongFoodOdours": true
},
"puqe": {
"q1": 3,
"q2": 2,
"q3": 1,
"totalScore": 6
}
}
},
"patient": {
"dob": "1994-09-12",
"gender": "F",
"phone": "647-555-0233",
"height": "165 cm",
"weight": "68 kg",
"address": "74 Elm Park Drive, Toronto, ON M6S 1B3",
"lastName": "Hassan",
"firstName": "Layla",
"healthCardNo": "2345-876-543"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": true,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": false,
"pregnantNA": false,
"pregnantYes": true,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": true,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Doxylamine succinate/Pyridoxine hydrochloride (Diclectin)",
"strength": "10mg/10mg",
"quantity": "30 tablets",
"direction": "Start with 2 tablets PO QHS. Add 1 tablet QAM and 1 tablet mid-afternoon as required."
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for improvement in nausea and vomiting. Reassess PUQE score at follow-up. Advise patient to seek immediate care if red flag symptoms develop (inability to keep fluids down >12 hours, signs of dehydration, or bloody vomit)."
}
}
}
---
## PINWORMS
{
"ailmentCode": "PINWORMS",
"data": {
"ailment": {
"code": "PINWORMS",
"displayName": "Threadworms Or Pinworms",
"clinicalBlock": {
"symptoms": {
"perianalPruritus": true,
"firstEpisodeOrReinfection": true,
"sleeplessness": true,
"confirmedDiagnosis": false,
"caregiverOrHouseholdContact": false,
"asymptomatic": false,
"other": false,
"otherDetail": ""
},
"criteria": {
"under2WeeksSinceCompletedTreatment": true,
"noSystemicSymptoms": true,
"noGastrointestinalSymptoms": true,
"noRashOrSkinLesions": true,
"normalBowelHabits": true,
"noBurningSwellingRectalBleeding": true,
"notPregnant": true,
"ageOver2Years": true
},
"treatment": {
"mebendazole": true
},
"otcTreatment": {
"pyrantelPamoate": false
}
}
},
"patient": {
"dob": "2018-03-20",
"gender": "M",
"phone": "416-555-0512",
"height": "110 cm",
"weight": "20 kg",
"address": "18 Oakdale Road, Toronto, ON M3N 1E5",
"lastName": "Park",
"firstName": "Ethan",
"healthCardNo": "6789-543-210"
},
"consent": {
"substituteName": "Jennifer Park",
"substituteRelation": "Mother",
"verbalConsentSubstitute": true,
"verbalConsentIndividual": false
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": true,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": false,
"pregnantNA": true,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": false,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Mebendazole",
"strength": "100 mg",
"quantity": "3 tablets",
"direction": "Take 1 tablet (100mg) as a single dose. Repeat on Day 14 and Day 28. Total 3 doses."
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-23",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of perianal pruritus and sleep disturbance after first dose. Remind caregiver to administer repeat doses on Day 14 and Day 28. Advise strict hand hygiene and laundering of bedding/clothing to prevent reinfection."
}
}
}
---
## VAGINAL_CANDIDIASIS
{
"ailmentCode": "VAGINAL_CANDIDIASIS",
"data": {
"ailment": {
"code": "VAGINAL_CANDIDIASIS",
"displayName": "Vaginal Candidiasis",
"clinicalBlock": {
"symptoms": {
"vulvarPruritusIrritation": true,
"thickCurdDischarge": true,
"perceivedDysuria": false,
"vulvarBurning": true,
"vulvarEdema": false,
"sporadicOrInfrequent": true,
"mildToModerate": true,
"other": false,
"otherDetail": ""
},
"criteria": {
"notHighRisk": true,
"noFeverPelvicPain": true,
"noSevereDisease": true,
"noThinWhitenedVulvarSkin": true,
"noVaginalAtrophy": true,
"noHypoestrogenicState": true,
"noPotentialForSTI": true,
"noForeignBody": true,
"noAllergicReactionOrDermatitis": true,
"previousDiagnosisVaginalCandidiasis": true,
"over12YearsPostPuberty": true,
"notBornWithoutVagina": true,
"noPreviousEpisodeWithin8Weeks": true,
"noTreatmentFailureCurrentEpisode": true
},
"treatment": {
"terconazole": false
},
"otcTreatment": {
"fluconazole": true,
"fluconazole150mg": true,
"clotrimazole": false,
"clotrimazole200mgTablet3Days": false,
"clotrimazole500mgTabletSingle": false,
"clotrimazole1PercentCream7Days": false,
"clotrimazole2PercentCream3Days": false,
"clotrimazole10PercentCreamSingle": false,
"miconazole": false,
"miconazole100mgOvule7Days": false,
"miconazole2PercentCream7Days": false,
"miconazole4PercentCream3Days": false
}
}
},
"patient": {
"dob": "1991-06-14",
"gender": "F",
"phone": "416-555-0378",
"height": "168 cm",
"weight": "64 kg",
"address": "39 Willowdale Avenue, Toronto, ON M2N 4Y2",
"lastName": "Rossi",
"firstName": "Giulia",
"healthCardNo": "7890-654-321"
},
"consent": {
"substituteName": "",
"substituteRelation": "",
"verbalConsentSubstitute": false,
"verbalConsentIndividual": true
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": false,
"candidalStomatitis": false,
"vaginalCandidiasis": true,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": true,
"pregnantNA": false,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": true,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Fluconazole",
"strength": "150 mg",
"quantity": "1 tablet",
"direction": "Take 1 tablet (150mg) PO as a single dose"
},
{
"name": "",
"strength": "",
"quantity": "",
"direction": ""
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-16",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of vulvar pruritus, discharge, and burning. Advise patient to return if symptoms persist beyond 7 days, worsen, or recur within 8 weeks."
}
}
}
---
## DIAPER_DERMATITIS
{
"ailmentCode": "DIAPER_DERMATITIS",
"data": {
"ailment": {
"code": "DIAPER_DERMATITIS",
"displayName": "Diaper Dermatitis",
"clinicalBlock": {
"symptoms": {
"rashInCreases": true,
"brightRedPatches": true,
"satellitePapulesPustules": true,
"presentInDiaperArea": true,
"painfulCrying": true
},
"criteria": {
"noAcuteOnsetOozing": true,
"noModerateOrSeverePresentation": true,
"noSystemicSigns": true,
"notImmunocompromised": true,
"noSignsOfAbuseOrNeglect": true,
"noFrequentRecurrences": true,
"noBehaviorChanges": true,
"noComplicatedSecondaryInfection": true,
"noRashOutsideDiaperArea": true
},
"treatment": {
"clotrimazole1Percent": true,
"miconazole2Percent": false,
"nystatin100000": false,
"ketoconazole2Percent": false,
"ciclopirox1Percent": false,
"hydrocortisoneAcetate": true,
"hydrocortisone05Percent": false,
"hydrocortisone05PercentGrams": "",
"hydrocortisone1Percent": true,
"hydrocortisone1PercentGrams": "15",
"hydrocortisone1PercentOver30g": "",
"hydrocortisoneOther": false,
"hydrocortisoneOtherDetail": "",
"zincOxide": true,
"barrierOther": false,
"barrierOtherDetail": ""
}
}
},
"patient": {
"dob": "2024-01-10",
"gender": "F",
"phone": "647-555-0601",
"height": "72 cm",
"weight": "9 kg",
"address": "52 Hazelwood Crescent, Toronto, ON M4J 2K8",
"lastName": "Santos",
"firstName": "Mia",
"healthCardNo": "8765-432-109"
},
"consent": {
"substituteName": "Carlos Santos",
"substituteRelation": "Father",
"verbalConsentSubstitute": true,
"verbalConsentIndividual": false
},
"prescriber": {
"faxNo": "416-555-0404",
"phone": "416-555-0403",
"address": "456 Pharmacy Ave, Toronto, ON M5A 2T3",
"lastName": "Wilson",
"firstName": "Jane",
"licenseNo": "PHR780"
},
"eligibility": {
"acne": false,
"noRedFlags": true,
"impetigo": false,
"tickBites": false,
"pinworms": false,
"dermatitis": false,
"hemorrhoids": false,
"notPrecluded": true,
"conjunctivitis": false,
"dysmenorrhea": false,
"insectBites": false,
"herpesLabialis": false,
"allergicRhinitis": false,
"diaperDermatitis": true,
"candidalStomatitis": false,
"vaginalCandidiasis": false,
"musculoskeletalSprains": false,
"urinaryTractInfections": false,
"gastroesophagealReflux": false,
"nauseaVomitingPregnancy": false,
"validOntarioHealthNumber": true
},
"assessment": {
"nka": true,
"none": true,
"notes": "",
"allergies": false,
"scrDate": "",
"scrValue": "",
"egfrDate": "",
"egfrValue": "",
"pregnantNo": false,
"pregnantNA": true,
"pregnantYes": false,
"scrProvided": false,
"allergiesDetail": "",
"egfrProvided": false,
"liverImpairmentNo": true,
"renalImpairmentNo": true,
"liverImpairmentYes": false,
"renalImpairmentYes": false,
"medicalConditions": false,
"drugInteractions": false,
"liverImpairmentUnknown": false,
"renalImpairmentUnknown": false,
"drugInteractionsDetail": "",
"attachCurrentMedication": false,
"historyOfPresentingComplaint": true,
"medicationsFromAnotherPharmacyNo": true,
"medicationsFromAnotherPharmacyYes": false
},
"carePlan": {
"fax": false,
"date": "",
"notes": "",
"other": false,
"phone": true,
"referToMD": false,
"recommendOTC": true,
"rationalProvided": false,
"inPersonCareIssued": true,
"virtualCareIssued": false,
"noPrimaryCareProvider": false,
"recommendNonPharm": false,
"virtualCareNotIssued": false,
"inPersonCareNotIssued": false,
"primaryCareProviderNotified": true
},
"medicationOrder": {
"medications": [
{
"name": "Clotrimazole",
"strength": "1% cream",
"quantity": "1 tube (30g)",
"direction": "Apply to affected area and surrounding skin BID x 14 days minimum"
},
{
"name": "Hydrocortisone acetate",
"strength": "1% cream",
"quantity": "15 g",
"direction": "Apply a thin layer to affected area up to TID for no more than 2 weeks"
}
]
},
"signature": {
"date": "2025-03-09",
"ocpNumber": "PHR780",
"pharmacistName": "Dr. Jane Wilson"
},
"followUp": {
"date": "2025-03-23",
"phone": true,
"inPerson": false,
"monitoringParameters": "Monitor for resolution of rash, satellite lesions, and crying during diaper changes. Advise caregiver on frequent diaper changes, gentle cleaning, and barrier cream application. Reassess if no improvement within 7 days or symptoms worsen."
}
}
}


