import React, { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import AuditHeader from "../components/AuditHeader";
import AuditTable from "../components/AuditTable";
import AuditToolbar from "../components/AuditToolbar";
import AuditPagination from "../components/AuditPagination";
import AuditBadge from "../components/AuditBadge";
import { fetchAuditLogs } from "../auditApi";
import { DEFAULT_PAGE_SIZE } from "../auditConstants";

// ── Timestamp formatter ──────────────────────────────────────────────────────
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

// ── Detail Modal ─────────────────────────────────────────────────────────────
const AuditDetailModal = ({ log, onClose }) => {
  if (!log) return null;

  const rows = [
    { label: "ID",         value: log.id },
    { label: "Timestamp",  value: formatTimestamp(log.updatedAt) },
    { label: "User",       value: log.updatedBy },
    { label: "Action",     value: <AuditBadge action={log.action} /> },
    { label: "Entity",     value: log.entity },
    { label: "Entity ID",  value: log.entityId },
    { label: "Field",      value: log.field },
    { label: "Old Value",  value: log.oldValue },
    { label: "New Value",  value: log.newValue },
    { label: "Details",    value: log.details },
    { label: "IP Address", value: log.ipAddress },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-800">Audit Log Detail</h2>
            <p className="text-xs text-gray-400 mt-0.5">Entry #{log.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <dl className="divide-y divide-gray-100">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex py-3 gap-4">
                <dt className="w-28 flex-shrink-0 text-xs font-semibold text-gray-500 uppercase tracking-wide pt-0.5">
                  {label}
                </dt>
                <dd className="text-sm text-gray-800 break-words min-w-0 flex-1">
                  {value ?? <span className="text-gray-400 italic">—</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination — page is 1-based in UI, converted to 0-based in auditApi.js
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const loadAuditLogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchAuditLogs({
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        search,
        action,
        startDate,
        endDate,
      });
      // Spring Page shape: { content, totalPages, totalElements }
      setLogs(response.content || []);
      setTotalPages(response.totalPages || 1);
      setTotalItems(response.totalElements || 0);
    } catch (err) {
      setError("Failed to load audit logs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, search, action, startDate, endDate]);

  useEffect(() => { loadAuditLogs(); }, [loadAuditLogs]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [search, action, startDate, endDate]);

  return (
    <div className="p-6">
      <AuditHeader />

      <AuditToolbar
        searchTerm={search}
        onSearchChange={setSearch}
        actionFilter={action}
        onActionChange={setAction}
        startDate={startDate}
        endDate={endDate}
        onDateChange={({ start, end }) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">{error}</div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
          Loading audit logs...
        </div>
      ) : (
        <>
          <AuditTable
            logs={logs}
            onView={(log) => setSelectedLog(log)}
          />
          <AuditPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={DEFAULT_PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Detail modal — opens when a row's View button is clicked */}
      <AuditDetailModal
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </div>
  );
};

export default AuditLogPage;