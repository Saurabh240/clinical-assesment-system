import { useNavigate } from "react-router-dom";
import { ArrowUpRight, PlusCircle, RefreshCw, AlertCircle } from "lucide-react";


const MOCK_ACTIVITY = [
  {
    action: "Updated user role from Pharmacist to Senior Pharmacist",
    user: "Dr. Sarah Admin",
    timestamp: "2026-02-25 14:32:15",
    type: "update",
  },
  {
    action: "Created new assessment for patient Sarah Johnson",
    user: "John Pharmacist",
    timestamp: "2026-02-25 13:15:42",
    type: "create",
  },
  {
    action: "Deleted inactive user account",
    user: "Dr. Sarah Admin",
    timestamp: "2026-02-25 12:45:30",
    type: "delete",
  },
  {
    action: "Updated assessment status to Completed",
    user: "John Pharmacist",
    timestamp: "2026-02-25 11:20:18",
    type: "update",
  },
  {
    action: "Created new pharmacist account",
    user: "Dr. Sarah Admin",
    timestamp: "2026-02-25 10:05:52",
    type: "create",
  },
];

const TYPE_STYLES = {
  create: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    Icon: PlusCircle,
  },
  update: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    Icon: RefreshCw,
  },
  delete: {
    bg: "bg-red-50",
    text: "text-red-500",
    Icon: AlertCircle,
  },
};

export default function RecentActivity() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
        <button
          onClick={() => navigate("/admin/audit-logs")}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View All <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-gray-50">
        {MOCK_ACTIVITY.map((item, i) => {
          const { bg, text, Icon } = TYPE_STYLES[item.type];
          return (
            <div
              key={i}
              className="flex items-start gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg ${bg} ${text}
                  flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 leading-snug">
                  {item.action}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {item.user} · {item.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}