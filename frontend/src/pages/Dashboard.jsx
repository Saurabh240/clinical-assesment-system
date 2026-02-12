import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

export default function Assessments() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination metadata
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // API uses 0-based indexing
  
  // Filters and sorting from URL
  const [filters, setFilters] = useState({
    patientName: searchParams.get("patientName") || "",
    status: searchParams.get("status") || "",
    ailment: searchParams.get("ailment") || "",
  });
  
  const [sorting, setSorting] = useState({
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortDirection: searchParams.get("sortDirection") || "desc",
  });
  
  const [pageSize] = useState(parseInt(searchParams.get("size")) || 10);
  
  // Debounce timer
  const debounceTimer = useRef(null);

  // Sync URL with state
  const updateURL = useCallback((params) => {
    const newParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        newParams.set(key, value);
      }
    });
    
    setSearchParams(newParams);
  }, [setSearchParams]);

  // Parse patient name from assessment data
  const getPatientName = (assessmentData) => {
    if (!assessmentData) return "Unknown";
    
    // Check different possible structures
    if (assessmentData.patient) {
      const firstName = assessmentData.patient.firstName?.trim() || "";
      const lastName = assessmentData.patient.lastName?.trim() || "";
      return `${firstName} ${lastName}`.trim() || "Unknown";
    }
    
    if (assessmentData.undefined) {
      const firstName = assessmentData.undefined.firstName?.trim() || "";
      const lastName = assessmentData.undefined.lastName?.trim() || "";
      return `${firstName} ${lastName}`.trim() || "Unknown";
    }
    
    return "Unknown";
  };

  // Calculate overdue days from followup data
  const calculateOverdueDays = (lastFollowupDate, followupStatus) => {
    if (!lastFollowupDate || followupStatus === "COMPLETED") return 0;
    
    const followupDate = new Date(lastFollowupDate);
    const today = new Date();
    const diffTime = today - followupDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Fetch assessments from API
  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const requestBody = {
        page: currentPage,
        size: pageSize,
        sortBy: sorting.sortBy,
        sortDirection: sorting.sortDirection.toUpperCase(), // API expects uppercase
      };
      
      // Add filters if they exist
      if (filters.patientName) {
        requestBody.patientName = filters.patientName;
      }
      if (filters.status) {
        requestBody.status = filters.status;
      }
      if (filters.ailment) {
        requestBody.ailment = filters.ailment;
      }
      
      const response = await api.post("/assessments/getAllAssessments", requestBody);
      
      // Parse the response
      const content = response.data.content || [];
      
      // Transform data to match our component structure
      const transformedData = content.map(item => ({
        id: item.id,
        date: item.createdAt,
        patientName: getPatientName(item.assessmentData),
        ailmentCode: item.ailmentCode,
        status: item.followupStatus || "PENDING",
        overdueDays: calculateOverdueDays(item.lastFollowupDate, item.followupStatus),
        pdfUrl: item.pdfUrl,
        lastFollowupDate: item.lastFollowupDate,
      }));
      
      setAssessments(transformedData);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);
      
      // Update URL with current params
      updateURL({
        page: currentPage,
        size: pageSize,
        sortBy: sorting.sortBy,
        sortDirection: sorting.sortDirection,
        ...(filters.patientName && { patientName: filters.patientName }),
        ...(filters.status && { status: filters.status }),
        ...(filters.ailment && { ailment: filters.ailment }),
      });
    } catch (err) {
      console.error("Error fetching assessments:", err);
      
      // More detailed error message
      let errorMessage = "Failed to fetch assessments";
      
      if (err.response) {
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "No response from server. Please check if the backend is running.";
      } else {
        errorMessage = err.message || "An unexpected error occurred";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, sorting, filters, updateURL]);

  // Initial fetch and URL sync
  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page")) || 0;
    const urlSortBy = searchParams.get("sortBy") || "createdAt";
    const urlSortDirection = searchParams.get("sortDirection") || "desc";
    
    setCurrentPage(urlPage);
    setSorting({ sortBy: urlSortBy, sortDirection: urlSortDirection });
  }, [searchParams]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchAssessments();
  }, [currentPage, pageSize, sorting, filters.status, filters.ailment]);

  // Debounced search
  const handleSearchChange = (value) => {
    setFilters(prev => ({ ...prev, patientName: value }));
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      setCurrentPage(0); // Reset to first page on search
    }, 500);
  };

  // Handle filter change
const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(0);
  };

  // Handle sorting
  const handleSort = (column) => {
    setSorting(prev => ({
      sortBy: column,
  sortDirection: prev.sortBy === column && prev.sortDirection === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(0);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // View assessment details
  const handleViewAssessment = (assessmentId) => {
    navigate(`/assessments/${assessmentId}`);
  };

  // Handle follow-up action
  const handleFollowUp = (assessmentId) => {
    navigate(`/assessments/${assessmentId}/follow-up`);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "OVERDUE":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Get follow-up status badge
  const getFollowUpBadge = (overdueDays) => {
    if (overdueDays > 0) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          OVERDUE ({overdueDays}d)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        COMPLETED
      </span>
    );
  };

  // Sort icon
  const getSortIcon = (column) => {
    if (sorting.sortBy !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sorting.sortDirection === "asc") {
      return (
        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      );
    }
    
    return (
      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  };

  if (loading && assessments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading assessments...</p>
        </div>
      </div>
    );
  }

  if (error && assessments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 p-4">
        <div className="text-center bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-6 text-sm">{error}</p>
          <div className="space-y-2">
            <button
              onClick={fetchAssessments}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        {/* <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-1 sm:mb-2">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Manage and track patient assessments
          </p>
        </div> */}

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search by Patient Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Patient
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by patient name..."
                  value={filters.patientName}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <svg
                  className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-4 py-2.5 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            {/* Ailment Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ailment
              </label>
              <input
                type="text"
                placeholder="Filter by ailment..."
                value={filters.ailment}
                onChange={(e) => handleFilterChange("ailment", e.target.value)}
                className="w-full px-4 py-2.5 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.patientName || filters.status || filters.ailment) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.patientName && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Patient: {filters.patientName}
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, patientName: "" }));
                      setCurrentPage(0);
                    }}
                    className="ml-1 hover:bg-emerald-100 rounded-full p-0.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.status && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Status: {filters.status}
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, status: "" }));
                      setCurrentPage(0);
                    }}
                    className="ml-1 hover:bg-emerald-100 rounded-full p-0.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.ailment && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                  Ailment: {filters.ailment}
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, ailment: "" }));
                      setCurrentPage(0);
                    }}
                    className="ml-1 hover:bg-emerald-100 rounded-full p-0.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rest of the component continues... */}
        {assessments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8 sm:p-16 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Assessments Found</h3>
            <p className="text-sm sm:text-base text-gray-600">
              {(filters.patientName || filters.status || filters.ailment)
                ? "Try adjusting your filters"
                : "No assessments available at the moment"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-emerald-100">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr>
                      <th
                        onClick={() => handleSort("createdAt")}
                        className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Date
                          {getSortIcon("createdAt")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("patientName")}
                        className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Patient Name
                          {getSortIcon("patientName")}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                        Ailment
                      </th>
                      <th
                        onClick={() => handleSort("followupStatus")}
                        className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          Status
                          {getSortIcon("followupStatus")}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                        Follow-Up Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {assessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <svg className="w-4 h-4 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(assessment.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                              <span className="text-white font-bold text-sm">
                                {assessment.patientName?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {assessment.patientName}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {assessment.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {assessment.ailmentCode}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(assessment.status)}`}>
                            {assessment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getFollowUpBadge(assessment.overdueDays || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewAssessment(assessment.id)}
                              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                            {assessment.overdueDays > 0 && (
                              <button
                                onClick={() => handleFollowUp(assessment.id)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg transition-all shadow-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Follow-up
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 px-6 py-4 border-t border-emerald-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-semibold text-emerald-700">{(currentPage * pageSize) + 1}</span> to{" "}
                      <span className="font-semibold text-emerald-700">
                        {Math.min((currentPage + 1) * pageSize, totalElements)}
                      </span>{" "}
                      of <span className="font-semibold text-emerald-700">{totalElements}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-emerald-200 text-sm font-medium ${
                          currentPage === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index;
                        if (
                          pageNumber === 0 ||
                          pageNumber === totalPages - 1 ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNumber
                                  ? "z-10 bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-md"
                                  : "bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                              }`}
                            >
                              {pageNumber + 1}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <span
                              key={pageNumber}
                              className="relative inline-flex items-center px-4 py-2 border border-emerald-200 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-emerald-200 text-sm font-medium ${
                          currentPage === totalPages - 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-white font-bold text-base">
                          {assessment.patientName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {assessment.patientName}
                        </h3>
                        <p className="text-xs text-gray-500">ID: {assessment.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Date</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(assessment.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Ailment</span>
                      <span className="text-sm font-medium text-gray-900">
                        {assessment.ailmentCode}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(assessment.status)}`}>
                        {assessment.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Follow-Up</span>
                      {getFollowUpBadge(assessment.overdueDays || 0)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewAssessment(assessment.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    {assessment.overdueDays > 0 && (
                      <button
                        onClick={() => handleFollowUp(assessment.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Follow-up
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Mobile Pagination */}
              <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-600">
                    Page <span className="font-semibold text-emerald-700">{currentPage + 1}</span> of{" "}
                    <span className="font-semibold text-emerald-700">{totalPages}</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-emerald-700">{totalElements}</span> total
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      currentPage === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      currentPage === totalPages - 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}