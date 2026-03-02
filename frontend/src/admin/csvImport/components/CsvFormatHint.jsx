import { Download } from "lucide-react";

const CsvFormatHint = () => {
  const handleDownloadTemplate = () => {
    // Empty template or minimal header
    const csvContent = "column1,column2,column3\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "csv_template.csv";
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">
      
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center">
          <Download size={22} className="text-teal-600" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900">
            CSV Template
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Download the template to ensure correct format
          </p>
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={handleDownloadTemplate}
        className="
          px-4 py-2 text-sm font-medium
          rounded-lg border border-gray-300
          bg-white hover:bg-gray-50
          transition
        "
      >
        Download Template
      </button>
    </div>
  );
};

export default CsvFormatHint;