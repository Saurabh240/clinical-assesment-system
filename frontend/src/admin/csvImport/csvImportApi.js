import api from "../../api/axios";  // authenticated instance — carries Bearer token automatically

/**
 * GET /admin/ailments/csv/template
 * Downloads the CSV template as a blob and triggers a browser download.
 */
export const downloadCsvTemplate = async () => {
  const response = await api.get("/admin/ailments/csv/template", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: "text/csv" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "ailments-template.csv";
  link.click();
  window.URL.revokeObjectURL(url);
};

/**
 * POST /admin/ailments/csv/import
 * Uploads the CSV file and returns a CsvImportSummary from the backend.
 */
export const uploadCsvFile = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(
      "/admin/ailments/csv/import",   // correct path — was /api/admin/ailments/import
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total || !onUploadProgress) return;
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percent);
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("CSV Upload Failed:", error);
    throw error?.response?.data || error;
  }
};