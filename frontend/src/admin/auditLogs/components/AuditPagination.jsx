import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AuditPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const generatePages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
      
      {/* Showing Info */}
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span>–
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> logs
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg border ${
            currentPage === 1
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {generatePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border ${
            currentPage === totalPages
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AuditPagination;