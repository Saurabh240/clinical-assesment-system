import React, { useState } from "react";
import { Upload } from "lucide-react";
import CsvDropzone from "./CsvDropzone";
import UploadProgress from "./UploadProgress";

const CsvUploadCard = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");

  const handleUpload = async () => {
    if (!file) return;

    try {
      setStatus("uploading");
      setProgress(0);

      await onUpload(file, (percent) => {
        setProgress(percent);
      });

      setStatus("success");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload CSV File</h2>

      {/* Dropzone */}
      <CsvDropzone file={file} setFile={setFile} />

      {/* Upload button — only shown when a file is selected */}
      {file && status !== "uploading" && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-gradient-to-r from-emerald-500 to-teal-500
              hover:from-emerald-600 hover:to-teal-600
              text-white text-sm font-semibold shadow-md
              transition-all duration-200"
          >
            <Upload size={16} />
            Upload & Import
          </button>
        </div>
      )}

      {/* Progress / status indicator */}
      <UploadProgress progress={progress} status={status} />
    </div>
  );
};

export default CsvUploadCard;