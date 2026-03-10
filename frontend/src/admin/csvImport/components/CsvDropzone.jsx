import React, { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

const MAX_FILE_SIZE_MB = 10;

const CsvDropzone = ({ file, setFile }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    if (selectedFile.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
  };

  return (
    <div>
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center
            transition-all duration-200
            ${
              dragActive
                ? "border-teal-500 bg-teal-50/40"
                : "border-gray-300 hover:border-teal-400"
            }
          `}
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <UploadCloud
              size={26}
              className="text-gray-500"
            />
          </div>

          <p className="text-gray-800 font-medium">
            Drag and drop your CSV file here
          </p>

          <p className="text-sm text-gray-500 my-2">or</p>

          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="
              px-4 py-2 text-sm
              rounded-lg border border-gray-300
              hover:bg-gray-50 transition
            "
          >
            Browse Files
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Supported format: CSV (Max size: 10MB)
          </p>

          <input
            type="file"
            accept=".csv"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-800">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>

          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};

export default CsvDropzone;