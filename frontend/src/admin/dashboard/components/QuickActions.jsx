import { useNavigate } from "react-router-dom";
import { Users, Upload, FileText } from "lucide-react";

const ACTIONS = [
  {
    label: "Manage Users",
    desc: "Add or edit user accounts",
    icon: Users,
    color: "bg-emerald-50 text-emerald-700",
    hoverBorder: "hover:border-emerald-200 hover:bg-emerald-50/60",
    path: "/admin/users",
  },
  {
    label: "CSV Import",
    desc: "Bulk import data",
    icon: Upload,
    color: "bg-teal-50 text-teal-700",
    hoverBorder: "hover:border-teal-200 hover:bg-teal-50/60",
    path: "/admin/csv-import",
  },
  {
    label: "Audit Logs",
    desc: "View system activity",
    icon: FileText,
    color: "bg-amber-50 text-amber-700",
    hoverBorder: "hover:border-amber-200 hover:bg-amber-50/60",
    path: "/admin/audit-logs",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              onClick={() => navigate(a.path)}
              className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100
                ${a.hoverBorder} transition-all duration-200 text-left group`}
            >
              <div
                className={`w-9 h-9 rounded-lg ${a.color} flex items-center justify-center
                  flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{a.label}</p>
                <p className="text-xs text-gray-400">{a.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}