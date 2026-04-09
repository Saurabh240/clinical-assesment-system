import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, RefreshCw, AlertCircle, Clock } from "lucide-react";
import api from "../api/axios";

// ── Status badge ─────────────────────────────────────────────────────────────
const OverdueBadge = ({ overdueDays }) => {
  if (overdueDays > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
        <Clock size={11} />
        {overdueDays}d overdue
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
      On track
    </span>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function FollowUps() {
  const navigate = useNavigate();
  const [followUps, setFollowUps] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [ailmentFilter, setAilmentFilter] = useState("");
  const debounce = useRef(null);

  // Sorting
  const [sortBy, setSortBy] = useState("overdueDays");
  const [sortDir, setSortDir] = useState("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/followups");
      setFollowUps(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load follow-ups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFollowUps(); }, []);

  // ── Filter + sort whenever deps change ────────────────────────────────────
  useEffect(() => {
    let data = [...followUps];

    if (search.trim()) {
      data = data.filter((f) =>
        f.patientName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (ailmentFilter.trim()) {
      data = data.filter((f) =>
        f.ailment?.toLowerCase().includes(ailmentFilter.toLowerCase())
      );
    }

    data.sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (sortBy === "lastFollowupDate") {
        av = av ? new Date(av) : new Date(0);
        bv = bv ? new Date(bv) : new Date(0);
      }
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv?.toLowerCase() ?? ""; }
      return sortDir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    setFiltered(data);
    setCurrentPage(1);
  }, [followUps, search, ailmentFilter, sortBy, sortDir]);

  // ── Cleanup debounce ───────────────────────────────────────────────────────
  useEffect(() => () => clearTimeout(debounce.current), []);

  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(debounce.current);
  };

  const handleSort = (col) => {
    setSortBy(col);
    setSortDir((d) => (sortBy === col && d === "asc" ? "desc" : "asc"));
  };

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <span className="text-gray-400 text-xs">↕</span>;
    return <span className="text-emerald-600 text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const hasFilters = search || ailmentFilter;
  const clearFilters = () => { setSearch(""); setAilmentFilter(""); };

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Follow Ups</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track and manage patient follow-up schedules</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm
              focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition"
          />
        </div>

        {/* Ailment filter */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Filter by ailment..."
            value={ailmentFilter}
            onChange={(e) => setAilmentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none
              focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 w-40"
          />
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            title="Clear filters"
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <RefreshCw size={13} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          {error}
          <button onClick={fetchFollowUps} className="ml-auto text-xs font-semibold underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">
            All Follow-ups ({filtered.length})
          </h2>
        </div>

        {pageItems.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">
              {hasFilters ? "No follow-ups match your filters" : "No follow-ups to display"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: "patientName", label: "Patient" },
                    { key: "ailment", label: "Ailment" },
                    { key: "overdueDays", label: "Status" },
                    { key: "lastFollowupDate", label: "Last Follow-up" },
                    { key: null, label: "Actions" },
                  ].map(({ key, label }) => (
                    <th
                      key={label}
                      onClick={key ? () => handleSort(key) : undefined}
                      className={`px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider
                        ${key ? "cursor-pointer hover:text-emerald-600" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        {key && <SortIcon col={key} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageItems.map((f) => (
                  <tr key={f.assessmentId} className="hover:bg-gray-50 transition-colors">

                    {/* Patient */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {f.patientName?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{f.patientName || "—"}</span>
                      </div>
                    </td>

                    {/* Ailment */}
                    <td className="px-6 py-4 text-sm text-gray-700">{f.ailment || "—"}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <OverdueBadge overdueDays={f.overdueDays} />
                    </td>

                    {/* Last follow-up */}
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {f.lastFollowupDate
                        ? new Date(f.lastFollowupDate).toLocaleDateString("en-CA")
                        : "Not scheduled"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/assessments/${f.assessmentId}`)}
                        className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                ‹ Prev
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pg = i + 1;
                return (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`px-3 py-1.5 text-xs border rounded-lg ${
                      currentPage === pg
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}