import React from "react";
import { AlertTriangle } from "lucide-react";

const RowErrorTable = ({ errors = [] }) => {
  // Backend CsvImportRowResult record: rowNumber, code, status, message
  // Only show rows that actually failed (status === "ERROR")
  const failedRows = errors.filter((r) => r.status === "ERROR");

  if (!failedRows.length) return null;

  return (
    <div className="bg-white border border-red-200 rounded-xl shadow-sm p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-red-600" size={20} />
        <h3 className="text-lg font-semibold text-red-700">
          Row Errors ({failedRows.length})
        </h3>
      </div>

      <div className="overflow-x-auto max-h-72 overflow-y-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-red-50 text-red-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Row #</th>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Error</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {failedRows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {row.rowNumber}
                </td>
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                  {row.code || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">{row.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RowErrorTable;