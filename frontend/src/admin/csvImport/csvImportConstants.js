

export const ACCEPTED_FILE_TYPES = ["text/csv"];

export const ACCEPTED_FILE_EXTENSIONS = [".csv"];

export const MAX_FILE_SIZE_MB = 5;




export const SAMPLE_CSV_COLUMNS = [
  "Name",
  "Age",
  "Gender",
  "Diagnosis",
  "Prescription",
];

export const SAMPLE_CSV_FILE_NAME = "sample_ailment_import.csv";




export const UPLOAD_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
};




export const CSV_IMPORT_ENDPOINT = "/admin/ailments/import";




export const CSV_UI_TEXT = {
  TITLE: "Import Ailment CSV",
  BUTTON_UPLOAD: "Upload CSV",
  BUTTON_UPLOADING: "Uploading...",
  SUCCESS_MESSAGE: "Upload completed successfully",
  ERROR_MESSAGE: "Upload failed. Please try again.",
};