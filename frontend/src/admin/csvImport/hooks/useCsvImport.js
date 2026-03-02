import { useState } from "react";
import { uploadCsvFile } from "../csvImportApi";
import { UPLOAD_STATUS } from "../csvImportConstants";

export const useCsvImport = () => {
  const [status, setStatus] = useState(UPLOAD_STATUS.IDLE);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const uploadFile = async (file) => {
    if (!file) return;

    try {
      setStatus(UPLOAD_STATUS.UPLOADING);
      setProgress(0);
      setError("");
      setResult(null);

      const response = await uploadCsvFile(file, (percent) => {
        setProgress(percent);
      });

      setResult(response);
      setStatus(UPLOAD_STATUS.SUCCESS);

      return response;
    } catch (err) {
      setStatus(UPLOAD_STATUS.ERROR);
      setError(
        err?.message ||
          "Something went wrong while uploading the CSV."
      );
      throw err;
    }
  };

  const resetImport = () => {
    setStatus(UPLOAD_STATUS.IDLE);
    setProgress(0);
    setResult(null);
    setError("");
  };

  return {
    status,
    progress,
    result,
    error,
    uploadFile,
    resetImport,
  };
};