import StatsGrid from "./components/StatsGrid";
import QuickActions from "./components/QuickActions";
import UserOverviewTable from "./components/UserOverviewTable";
import RecentActivity from "./components/RecentActivity";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">System overview and management</p>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Quick Actions */}
      <QuickActions />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserOverviewTable />
        <RecentActivity />
      </div>
    </div>
  );
}