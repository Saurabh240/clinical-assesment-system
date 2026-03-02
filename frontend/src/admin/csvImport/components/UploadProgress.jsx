
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const UploadProgress = ({ progress = 0, status = "idle" }) => {
  if (status === "idle") return null;

  const isUploading = status === "uploading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isUploading && (
            <Loader2 className="animate-spin text-blue-600" size={18} />
          )}
          {isSuccess && (
            <CheckCircle className="text-green-600" size={18} />
          )}
          {isError && (
            <XCircle className="text-red-600" size={18} />
          )}

          <span className="text-sm font-medium text-gray-800">
            {isUploading && "Uploading CSV..."}
            {isSuccess && "Upload completed successfully"}
            {isError && "Upload failed"}
          </span>
        </div>

        {isUploading && (
          <span className="text-sm text-gray-600">
            {progress}%
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadProgress;