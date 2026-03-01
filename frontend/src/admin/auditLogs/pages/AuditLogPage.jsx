import React, { useEffect, useState, useCallback } from "react";
import AuditTable from "../components/AuditTable";
import AuditToolbar from "../components/AuditToolbar";
import AuditPagination from "../components/AuditPagination";
import { fetchAuditLogs } from "../auditApi";
import { DEFAULT_PAGE_SIZE } from "../auditConstants";

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //filters
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch logs
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

      setLogs(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalItems(response.totalItems || 0);
    } catch (err) {
      setError("Failed to load audit logs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, search, action, startDate, endDate]);

  // Load when filters/page change
  useEffect(() => {
    loadAuditLogs();
  }, [loadAuditLogs]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, action, startDate, endDate]);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Audit Logs
      </h1>

      {/* Toolbar */}
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

      {/* Error State */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
          Loading audit logs...
        </div>
      ) : (
        <>
          {/* Table */}
          <AuditTable
            logs={logs}
            onView={(log) => {
              console.log("View log:", log);
            
            }}
          />

          {/* Pagination */}
          <AuditPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={DEFAULT_PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default AuditLogPage;