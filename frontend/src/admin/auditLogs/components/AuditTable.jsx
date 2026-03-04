
import AuditRow from "./AuditRow";

const AuditTable = ({ logs = [], onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Activity Log ({logs.length})
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-3 font-medium">Timestamp</th>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Action</th>
              <th className="px-6 py-3 font-medium">Resource</th>
              <th className="px-6 py-3 font-medium">Details</th>
              <th className="px-6 py-3 font-medium">IP Address</th>
              <th className="px-6 py-3 font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {logs.length > 0 ? (
              logs.map((log) => (
                <AuditRow
                  key={log.id}
                  log={log}
                  onView={onView}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No audit logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTable;