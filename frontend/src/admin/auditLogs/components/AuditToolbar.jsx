import React from "react";
import { Search, Filter } from "lucide-react";

const AuditToolbar = ({
  searchTerm,
  onSearchChange,
  actionFilter,
  onActionChange,
  startDate,
  endDate,
  onDateChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/*  Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by user, action, resource..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-3">
          

          <select
            value={actionFilter}
            onChange={(e) => onActionChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
            <option value="LOGOUT">Logout</option>
          </select>

          {/* 📅 Date Range */}
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              onDateChange({ start: e.target.value, end: endDate })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <span className="text-gray-500 text-sm">to</span>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              onDateChange({ start: startDate, end: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

        
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition">
            <Filter size={16} />
            Filters
          </button>

        </div>
      </div>
    </div>
  );
};

export default AuditToolbar;