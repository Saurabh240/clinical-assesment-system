import axios from "axios";

const BASE_URL = "/api"; 

export const uploadCsvFile = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${BASE_URL}/admin/ailments/import`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          if (onUploadProgress) {
            onUploadProgress(percent);
          }
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("CSV Upload Failed:", error);
    throw error?.response?.data || error;
  }
};