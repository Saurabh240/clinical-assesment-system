import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

//  Replace with useEffect + API call when ready
const MOCK_USERS = [
  { name: "Dr. Sarah Admin", email: "admin@clinic.com",          role: "Admin",      status: "Active",   initial: "D", grad: "from-emerald-400 to-teal-500"   },
  { name: "John Pharmacist",  email: "pharmacist@clinic.com",    role: "Pharmacist", status: "Active",   initial: "J", grad: "from-teal-400 to-emerald-600"   },
  { name: "Lisa Martinez",    email: "lisa.martinez@clinic.com", role: "Pharmacist", status: "Active",   initial: "L", grad: "from-emerald-500 to-teal-600"   },
  { name: "Robert Kim",       email: "robert.kim@clinic.com",    role: "Pharmacist", status: "Inactive", initial: "R", grad: "from-gray-400 to-gray-500"       },
];

export default function UserOverviewTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">User Overview</h3>
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View All <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {MOCK_USERS.map((u) => (
          <div
            key={u.email}
            className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors"
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.grad}
                flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
            >
              {u.initial}
            </div>

            {/* Name + Email */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700 truncate">{u.name}</p>
              <p className="text-xs text-gray-400 truncate">{u.email}</p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold
                  ${u.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                  }`}
              >
                {u.status}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700">
                {u.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}