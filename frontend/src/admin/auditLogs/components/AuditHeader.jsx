import React from "react";

const AuditHeader = ({
  title = "Audit Logs",
  description = "Track all system activities and changes",
  rightContent,
}) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-gray-600 text-base">
          {description}
        </p>
      </div>

      {rightContent && (
        <div className="flex items-center gap-3">
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default AuditHeader;