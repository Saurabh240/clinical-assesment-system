import React from "react";
import { CheckCircle, XCircle, FileText } from "lucide-react";

const ImportResultSummary = ({ result }) => {
  if (!result) return null;

  const { totalRows, successCount, failedCount, importedAt } = result;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">
          Import Summary
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Rows */}
        <div className="bg-gray-50 rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Total Rows</p>
          <p className="text-xl font-bold text-gray-900">
            {totalRows}
          </p>
        </div>

        {/* Success */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <p className="text-sm text-green-700">Successful</p>
          </div>
          <p className="text-xl font-bold text-green-700 mt-1">
            {successCount}
          </p>
        </div>

        {/* Failed */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-600" />
            <p className="text-sm text-red-700">Failed</p>
          </div>
          <p className="text-xl font-bold text-red-700 mt-1">
            {failedCount}
          </p>
        </div>

        {/* Timestamp */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700">Imported At</p>
          <p className="text-sm font-medium text-blue-800 mt-1">
            {importedAt
              ? new Date(importedAt).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportResultSummary;