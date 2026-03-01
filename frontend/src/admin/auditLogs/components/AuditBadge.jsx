import React from "react";

const actionStyles = {
  CREATE:
    "bg-green-100 text-green-700 border border-green-200",
  UPDATE:
    "bg-blue-100 text-blue-700 border border-blue-200",
  DELETE:
    "bg-red-100 text-red-700 border border-red-200",
  LOGIN:
    "bg-purple-100 text-purple-700 border border-purple-200",
};

const AuditBadge = ({ action }) => {
  const style =
    actionStyles[action] ||
    "bg-gray-100 text-gray-700 border border-gray-200";

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1
        text-xs font-semibold rounded-full
        ${style}
      `}
    >
      {action}
    </span>
  );
};

export default AuditBadge;