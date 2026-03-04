import { Search, Filter } from "lucide-react";
import Input from "../../../components/ui/Input";      
import CustomSelect from "../../../components/ui/Select"; 

const AuditToolbar = ({
  searchTerm,
  onSearchChange,
  actionFilter,
  onActionChange,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/*  Search */}
        <div className="w-full md:max-w-md">
          <Input
            placeholder="Search by user, action, resource..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-3">

          {/*  Action Filter */}
          <div className="w-48">
            <CustomSelect
              value={actionFilter}
              onChange={onActionChange}
              placeholder="All Actions"
              options={[
                { label: "All Actions", value: "" },
                { label: "Create", value: "CREATE" },
                { label: "Update", value: "UPDATE" },
                { label: "Delete", value: "DELETE" },
              ]}
            />
          </div>

          {/* Extra Filters Button */}
          <button
            className="
              flex items-center gap-2
              border border-gray-300
              rounded-lg px-4 py-3 text-sm
              transition-all duration-200
              hover:border-teal-400 hover:bg-teal-50
              focus:outline-none focus:ring-2 focus:ring-teal-500
            "
          >
            <Filter size={16} />
            Filters
          </button>

        </div>
      </div>
    </div>
  );
};

export default AuditToolbar;