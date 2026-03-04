import React, { useState } from "react";
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
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
       Upload CSV File
      </h2>

      {/* Dropzone */}
      <CsvDropzone file={file} setFile={setFile} />

      

   

      {/* Progress */}
      <UploadProgress progress={progress} status={status} />
    </div>
  );
};

export default CsvUploadCard;