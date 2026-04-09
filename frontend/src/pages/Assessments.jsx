import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, X } from "lucide-react";
import api from "../api/axios";
import { getAilments } from "../services/ailment.service";
import useAssessment from "../hooks/useAssessment";
import AilmentSelect from "../components/assessment/AilmentSelect";
import DynamicAssessmentForm from "../components/assessment/DynamicAssessmentForm";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

// ── Helpers ──────────────────────────────────────────────────────────────────

const getPatientName = (assessmentData) => {
  if (!assessmentData) return "Unknown";
  if (assessmentData.patient) {
    const first = assessmentData.patient.firstName?.trim() || "";
    const last = assessmentData.patient.lastName?.trim() || "";
    return `${first} ${last}`.trim() || "Unknown";
  }
  return "Unknown";
};

const calculateOverdueDays = (lastFollowupDate, followupStatus) => {
  if (!lastFollowupDate || followupStatus === "COMPLETED") return 0;
  const dueDate = new Date(lastFollowupDate);
  dueDate.setDate(dueDate.getDate() + 14);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

const StatusBadge = ({ status, overdueDays = 0 }) => {
  if (status === "OVERDUE" || overdueDays > 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
        Overdue {overdueDays > 0 ? `(${overdueDays}d)` : ""}
      </span>
    );
  }
  if (status === "COMPLETED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
      Pending
    </span>
  );
};

// ── New Assessment Modal ──────────────────────────────────────────────────────

function NewAssessmentModal({ onClose, onCreated }) {
  const navigate = useNavigate();
  const [ailments, setAilments] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const {
    template, loading, error, submitting,
    assessmentId, pdfReady,
    loadTemplate, submitAssessment, generatePdf, hasSections,
  } = useAssessment();

  useEffect(() => {
    getAilments()
      .then((res) => setAilments(res.data || []))
      .catch(console.error);
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await submitAssessment({ ailmentCode: selectedCode, data: formData });
      onCreated?.();
    } catch {}
  };

  const handleGeneratePdf = async () => {
    const result = await generatePdf();
    if (result?.url) setPdfUrl(result.url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl z-10 mb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">New Assessment</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!assessmentId && (
            <Card shadow="md" className="bg-white">
              <h3 className="text-base font-semibold text-gray-800 mb-4">
                Select Medical Condition / Ailment
              </h3>
              <AilmentSelect
                ailments={ailments}
                value={selectedCode}
                onChange={(code) => { setSelectedCode(code); loadTemplate(code); }}
                loading={loading}
              />
            </Card>
          )}

          {loading && selectedCode && (
            <div className="text-center py-8 text-gray-500">Loading assessment form...</div>
          )}

          {hasSections && !assessmentId && !loading && (
            <DynamicAssessmentForm
              config={template}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          )}

          {pdfReady && assessmentId && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-4">
              <p className="text-lg font-medium text-green-800">Assessment Submitted Successfully!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="secondary"
                  onClick={() => { onClose(); navigate(`/assessments/${assessmentId}`); }}
                >
                  View Assessment
                </Button>
                {!pdfUrl ? (
                  <Button variant="success" onClick={handleGeneratePdf} disabled={loading}>
                    {loading ? "Generating..." : "Generate PDF"}
                  </Button>
                ) : (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                  >
                    Open PDF
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Assessments() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [filters, setFilters] = useState({
    patientName: searchParams.get("patientName") || "",
    status: searchParams.get("status") || "",
    ailment: searchParams.get("ailment") || "",
  });

  const [sorting, setSorting] = useState({
    sortBy: searchParams.get("sortBy") || "date",
    sortDirection: searchParams.get("sortDirection") || "desc",
  });

  const [pageSize] = useState(parseInt(searchParams.get("size")) || 10);
  const debounceTimer = useRef(null);
  const ailmentDebounceTimer = useRef(null);

  const updateURL = useCallback((params) => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== "") p.set(k, v);
    });
    setSearchParams(p);
  }, [setSearchParams]);

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const body = {
        page: currentPage,
        size: pageSize,
        sortBy: sorting.sortBy,
        sortDirection: sorting.sortDirection.toUpperCase(),
        ...(filters.patientName?.trim() && { patientName: filters.patientName.trim() }),
      };
      const res = await api.post("/assessments/getAllAssessments", body);
      let content = res.data.content || [];

      if (filters.status) {
        content = content.filter((item) => {
          const s = item.followupStatus;
          if (filters.status === "COMPLETED") return s === "COMPLETED";
          if (filters.status === "OVERDUE") {
            if (s === "OVERDUE") return true;
            if (s === "COMPLETED") return false;
            if (item.lastFollowupDate) {
              const due = new Date(item.lastFollowupDate);
              due.setDate(due.getDate() + 14);
              return new Date() > due;
            }
            return false;
          }
          if (filters.status === "PENDING") {
            if (s === "COMPLETED" || s === "OVERDUE") return false;
            if (item.lastFollowupDate) {
              const due = new Date(item.lastFollowupDate);
              due.setDate(due.getDate() + 14);
              if (new Date() > due) return false;
            }
            return true;
          }
          return true;
        });
      }

      if (filters.ailment?.trim()) {
        const a = filters.ailment.trim().toUpperCase();
        content = content.filter((item) => item.ailmentCode?.toUpperCase().includes(a));
      }

      setAssessments(content.map((item) => ({
        id: item.id,
        date: item.createdAt,
        patientName: getPatientName(item.assessmentData),
        ailmentCode: item.ailmentCode,
        status: item.followupStatus,
        overdueDays: calculateOverdueDays(item.lastFollowupDate, item.followupStatus),
        pdfUrl: item.pdfUrl,
      })));

      setTotalPages(res.data.totalPages || 1);
      setTotalElements(res.data.totalElements || content.length);

      updateURL({
        page: currentPage, size: pageSize,
        sortBy: sorting.sortBy, sortDirection: sorting.sortDirection,
        ...(filters.patientName?.trim() && { patientName: filters.patientName.trim() }),
        ...(filters.status && { status: filters.status }),
        ...(filters.ailment?.trim() && { ailment: filters.ailment.trim() }),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load assessments.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, sorting.sortBy, sorting.sortDirection, filters.patientName, filters.status, filters.ailment, updateURL]);

  useEffect(() => { fetchAssessments(); }, [fetchAssessments]);

  useEffect(() => () => {
    clearTimeout(debounceTimer.current);
    clearTimeout(ailmentDebounceTimer.current);
  }, []);

  const handleSearchChange = (value) => {
    setFilters((p) => ({ ...p, patientName: value }));
    clearTimeout(debounceTimer.current);
    if (!value?.trim()) { setCurrentPage(0); return; }
    debounceTimer.current = setTimeout(() => setCurrentPage(0), 500);
  };

  const handleFilterChange = (name, value) => {
    setFilters((p) => ({ ...p, [name]: value }));
    if (name === "ailment") {
      clearTimeout(ailmentDebounceTimer.current);
      if (!value?.trim()) { setCurrentPage(0); return; }
      ailmentDebounceTimer.current = setTimeout(() => setCurrentPage(0), 500);
    } else {
      setCurrentPage(0);
    }
  };

  const handleSort = (col) => {
    setSorting((p) => ({
      sortBy: col,
      sortDirection: p.sortBy === col && p.sortDirection === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(0);
  };

  const SortIcon = ({ col }) => {
    if (sorting.sortBy !== col) return <span className="text-gray-400">↕</span>;
    return <span className="text-emerald-600">{sorting.sortDirection === "asc" ? "↑" : "↓"}</span>;
  };

  if (loading && assessments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and review patient assessments</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
            bg-gradient-to-r from-emerald-500 to-teal-500
            hover:from-emerald-600 hover:to-teal-600
            text-white text-sm font-semibold shadow-md transition-all"
        >
          <Plus size={16} />
          New Assessment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by patient name or complaint..."
            value={filters.patientName}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 outline-none transition"
          />
        </div>
        {/* Status filter */}
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
        >
          <option value="">All Status</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="OVERDUE">Overdue</option>
        </select>
        {/* Ailment filter */}
        <input
          type="text"
          placeholder="Filter by ailment..."
          value={filters.ailment}
          onChange={(e) => handleFilterChange("ailment", e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 w-40"
        />
        {(filters.patientName || filters.status || filters.ailment) && (
          <button
            onClick={() => { setFilters({ patientName: "", status: "", ailment: "" }); setCurrentPage(0); }}
            className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg"
          >
            Clear
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">
            All Assessments ({totalElements})
          </h2>
        </div>

        {assessments.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm">No assessments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: "patientName", label: "Patient" },
                    { key: "date", label: "Date" },
                    { key: "ailmentCode", label: "Type" },
                    { key: null, label: "Chief Complaint" },
                    { key: "followupStatus", label: "Status" },
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
                {assessments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {a.patientName?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{a.patientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {a.date ? new Date(a.date).toLocaleDateString("en-CA") : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{a.ailmentCode || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">—</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={a.status} overdueDays={a.overdueDays} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/assessments/${a.id}`)}
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
              Showing {currentPage * pageSize + 1}–{Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                ‹ Prev
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const pg = i;
                return (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`px-3 py-1.5 text-xs border rounded-lg ${currentPage === pg ? "bg-emerald-500 text-white border-emerald-500" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    {pg + 1}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Assessment Modal */}
      {showNewModal && (
        <NewAssessmentModal
          onClose={() => setShowNewModal(false)}
          onCreated={() => { setShowNewModal(false); fetchAssessments(); }}
        />
      )}
    </div>
  );
}