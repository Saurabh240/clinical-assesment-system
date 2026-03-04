import { Users, Activity, FileText, TrendingUp, TrendingDown } from "lucide-react";


const STATS = [
  {
    label: "Total Users",
    value: "4",
    sub: "3 active",
    subColor: "text-emerald-600",
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: "+1 this week",
    trendUp: true,
  },
  {
    label: "Active Sessions",
    value: "12",
    sub: "+3 from yesterday",
    subColor: "text-emerald-600",
    icon: Activity,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    trend: "+33%",
    trendUp: true,
  },
  {
    label: "Audit Logs Today",
    value: "48",
    sub: "Last 24 hours",
    subColor: "text-gray-400",
    icon: FileText,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: "5 warnings",
    trendUp: false,
  },
  {
    label: "System Health",
    value: "98%",
    sub: "All systems operational",
    subColor: "text-emerald-600",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: "Excellent",
    trendUp: true,
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-gray-800 tracking-tight">
            {stat.value}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center
            group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon size={20} className={stat.iconColor} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${stat.subColor}`}>{stat.sub}</span>
        <span
          className={`flex items-center gap-1 text-xs font-semibold
            ${stat.trendUp ? "text-emerald-600" : "text-red-500"}`}
        >
          {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {stat.trend}
        </span>
      </div>
    </div>
  );
}

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </div>
  );
}