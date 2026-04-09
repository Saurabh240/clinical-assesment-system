import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ClipboardList, Calendar, TrendingUp, Plus, ChevronRight, Clock } from "lucide-react";
import api from "../api/axios";
import { authApi } from "../api/axios";

const StatusBadge = ({ status }) => {
  const map = {
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    OVERDUE:   "bg-red-50 text-red-700 border-red-200",
    PENDING:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  const labels = { COMPLETED: "Completed", OVERDUE: "Follow-up Required", PENDING: "Pending" };
  const cls = map[status] || map["PENDING"];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {labels[status] || "Pending"}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, subColor = "text-emerald-600", iconBg = "bg-emerald-50", iconColor = "text-emerald-600" }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
      </div>
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
        <Icon size={20} className={iconColor} />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recent, setRecent] = useState([]);
  const [overdueFollowups, setOverdueFollowups] = useState([]);
  const [stats, setStats] = useState({
    total: 0, pending: 0, followupsRequired: 0, completedToday: 0,
  });
  const [loading, setLoading] = useState(true);

  // Build display name from the fields AssessmentSummaryResponse actually returns:
  // patientFirstName and patientLastName are top-level fields — NOT nested in assessmentData
  const getPatientName = (item) => {
    const first = item.patientFirstName?.trim() || "";
    const last  = item.patientLastName?.trim()  || "";
    return `${first} ${last}`.trim() || "Unknown";
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const userData = await authApi.getCurrentUser();
        setUser(userData);

        const res = await api.post("/assessments/getAllAssessments", {
          page: 0, size: 20, sortBy: "date", sortDirection: "DESC",
        });

        const content = res.data.content || [];
        const today = new Date().toDateString();

        const mapped = content.map((item) => {
          // overdue calculation using fields directly on AssessmentSummaryResponse
          const isOverdue = item.overdue || item.overdueDays > 0;
          return {
            id: item.id,
            patientName: getPatientName(item),   // ← reads patientFirstName/patientLastName
            ailmentCode: item.ailmentCode,
            date: item.createdAt,
            status: item.followupStatus === "COMPLETED"
              ? "COMPLETED"
              : isOverdue ? "OVERDUE" : "PENDING",
            lastFollowupDate: item.lastFollowupDate,
            overdueDays: item.overdueDays || 0,
          };
        });

        setRecent(mapped.slice(0, 5));

        const total = res.data.totalElements || mapped.length;
        const pending = mapped.filter((a) => a.status === "PENDING").length;
        const overdue = mapped.filter((a) => a.status === "OVERDUE").length;
        const completedToday = mapped.filter(
          (a) => a.status === "COMPLETED" && new Date(a.date).toDateString() === today
        ).length;

        setStats({ total, pending, followupsRequired: overdue, completedToday });
        setOverdueFollowups(mapped.filter((a) => a.status === "OVERDUE").slice(0, 3));
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Navigate to Assessments page and auto-open the New Assessment modal via ?new=1
  const handleNewAssessment = () => navigate("/assessments?new=1");

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}! Here's your overview for today.
          </p>
        </div>
        <button
          onClick={handleNewAssessment}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
            bg-gradient-to-r from-emerald-500 to-teal-500
            hover:from-emerald-600 hover:to-teal-600
            text-white text-sm font-semibold shadow-md transition-all"
        >
          <Plus size={16} />
          New Assessment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Patients"
          value={stats.total}
          sub="+12% from last month"
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          icon={ClipboardList}
          label="Pending Assessments"
          value={stats.pending}
          sub={stats.pending === 1 ? "1 needs attention" : `${stats.pending} need attention`}
          subColor="text-yellow-600"
          iconBg="bg-yellow-50"
          iconColor="text-yellow-500"
        />
        <StatCard
          icon={Calendar}
          label="Follow-ups Required"
          value={stats.followupsRequired}
          sub="This week"
          subColor="text-red-600"
          iconBg="bg-red-50"
          iconColor="text-red-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Completed Today"
          value={stats.completedToday}
          sub="+2 from yesterday"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: ClipboardList,
              label: "New Assessment",
              desc: "Create patient assessment",
              onClick: handleNewAssessment,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              icon: Calendar,
              label: "View Assessments",
              desc: "Review all assessments",
              onClick: () => navigate("/assessments"),
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: Users,
              label: "Patient History",
              desc: "View patient records",
              onClick: () => navigate("/patient-history"),
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
          ].map(({ icon: Icon, label, desc, onClick, color, bg }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">Recent Assessments</h2>
          <button
            onClick={() => navigate("/assessments")}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>

        {recent.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No recent assessments</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recent.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate(`/assessments/${a.id}`)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{a.patientName}</span>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {a.ailmentCode || "—"} &bull; {a.date ? new Date(a.date).toLocaleDateString("en-CA") : "—"}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Follow-ups */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Upcoming Follow-ups</h2>
        </div>

        {overdueFollowups.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No pending follow-ups</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {overdueFollowups.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {a.patientName?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{a.patientName}</p>
                    <p className="text-xs text-gray-500">{a.ailmentCode}</p>
                    {a.lastFollowupDate && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={11} />
                        Scheduled: {new Date(a.lastFollowupDate).toLocaleDateString("en-CA")}
                      </p>
                    )}
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-red-50 text-red-700 border-red-200">
                  Overdue
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}