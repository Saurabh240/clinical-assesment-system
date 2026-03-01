import React from "react";
import { Eye } from "lucide-react";
import AuditBadge from "./AuditBadge";

const AuditRow = ({ log, onView }) => {
  return (
    <tr className="border-b last:border-0 hover:bg-gray-50 transition-colors">
      {/* Timestamp */}
      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {log.timestamp}
      </td>

      {/* User */}
      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        {log.user}
      </td>

      {/* Action Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <AuditBadge action={log.action} />
      </td>

      {/* Resource + ID */}
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="font-medium text-gray-900">
          {log.resource}
        </div>
        {log.resourceId && (
          <div className="text-xs text-gray-500">
            {log.resourceId}
          </div>
        )}
      </td>

      {/* Details */}
      <td className="px-6 py-4 text-sm text-gray-700 max-w-md truncate">
        {log.details}
      </td>

      {/* IP Address */}
      <td className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap">
        {log.ipAddress}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-sm">
        <button
          onClick={() => onView?.(log)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Eye size={16} />
          View
        </button>
      </td>
    </tr>
  );
};

export default AuditRow;