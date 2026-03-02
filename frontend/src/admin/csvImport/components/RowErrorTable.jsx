import React from "react";
import { AlertTriangle } from "lucide-react";

const RowErrorTable = ({ errors = [] }) => {
  if (!errors.length) return null;

  return (
    <div className="bg-white border border-red-200 rounded-xl shadow-sm p-5 mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-red-600" size={20} />
        <h3 className="text-lg font-semibold text-red-700">
          Row Validation Errors
        </h3>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto max-h-72 overflow-y-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-red-50 text-red-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Row</th>
              <th className="px-4 py-3 font-medium">Error Message</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {errors.map((error, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {error.row}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {error.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RowErrorTable;