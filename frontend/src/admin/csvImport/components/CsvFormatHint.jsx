import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { downloadCsvTemplate } from "../csvImportApi";

const CsvFormatHint = () => {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownloadTemplate = async () => {
    setDownloading(true);
    setError("");
    try {
      await downloadCsvTemplate();
    } catch (err) {
      setError("Failed to download template. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center">
            <Download size={22} className="text-teal-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">CSV Template</h3>
            <p className="text-sm text-gray-500 mt-1">
              Required columns: <code className="bg-gray-100 px-1 rounded text-xs">code</code>,{" "}
              <code className="bg-gray-100 px-1 rounded text-xs">name</code>,{" "}
              <code className="bg-gray-100 px-1 rounded text-xs">active</code>,{" "}
              <code className="bg-gray-100 px-1 rounded text-xs">fields_config</code> (optional)
            </p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadTemplate}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
            rounded-lg border border-gray-300 bg-white hover:bg-gray-50
            disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {downloading
            ? <Loader2 size={15} className="animate-spin" />
            : <Download size={15} />}
          {downloading ? "Downloading..." : "Download Template"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CsvFormatHint;