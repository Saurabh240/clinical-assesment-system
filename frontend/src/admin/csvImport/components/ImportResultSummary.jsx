import React from "react";
import { CheckCircle, XCircle, FileText, RefreshCw } from "lucide-react";

const ImportResultSummary = ({ result }) => {
  if (!result) return null;

  // Backend CsvImportSummary record fields:
  // totalRows, inserted, updated, skipped, failed, rows[]
  const {
    totalRows   = 0,
    inserted    = 0,
    updated     = 0,
    skipped     = 0,
    failed      = 0,
  } = result;

  const cards = [
    {
      label: "Total Rows",
      value: totalRows,
      className: "bg-gray-50 border-gray-200",
      textClass: "text-gray-900",
    },
    {
      label: "Inserted",
      value: inserted,
      className: "bg-green-50 border-green-200",
      textClass: "text-green-700",
      icon: <CheckCircle size={15} className="text-green-600" />,
    },
    {
      label: "Updated",
      value: updated,
      className: "bg-blue-50 border-blue-200",
      textClass: "text-blue-700",
      icon: <RefreshCw size={15} className="text-blue-600" />,
    },
    {
      label: "Skipped",
      value: skipped,
      className: "bg-amber-50 border-amber-200",
      textClass: "text-amber-700",
    },
    {
      label: "Failed",
      value: failed,
      className: "bg-red-50 border-red-200",
      textClass: "text-red-700",
      icon: <XCircle size={15} className="text-red-600" />,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Import Summary</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map(({ label, value, className, textClass, icon }) => (
          <div key={label} className={`rounded-lg p-4 border ${className}`}>
            {icon && (
              <div className="flex items-center gap-1.5 mb-1">
                {icon}
                <p className={`text-xs font-medium ${textClass}`}>{label}</p>
              </div>
            )}
            {!icon && (
              <p className="text-xs text-gray-500 mb-1">{label}</p>
            )}
            <p className={`text-2xl font-bold ${textClass}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportResultSummary;