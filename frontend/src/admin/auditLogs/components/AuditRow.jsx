import React from "react";
import { Eye } from "lucide-react";
import AuditBadge from "./AuditBadge";

// Formats an ISO timestamp → "Apr 6, 2026, 8:42 AM"
const formatTimestamp = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const AuditRow = ({ log, onView }) => {
  return (
    <tr className="border-b last:border-0 hover:bg-gray-50 transition-colors">

      {/* Timestamp — backend field: updatedAt */}
      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
        {formatTimestamp(log.updatedAt)}
      </td>

      {/* User — backend field: updatedBy */}
      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        {log.updatedBy || "—"}
      </td>

      {/* Action Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <AuditBadge action={log.action} />
      </td>

      {/* Resource — backend fields: entity + entityId */}
      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="font-medium text-gray-900">{log.entity || "—"}</div>
        {log.entityId != null && (
          <div className="text-xs text-gray-500">ID: {log.entityId}</div>
        )}
      </td>

      {/* Details */}
      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
        {log.details || "—"}
      </td>

      {/* IP Address */}
      <td className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap">
        {log.ipAddress || "—"}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-sm text-right">
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