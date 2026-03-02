import { NavLink } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../../api/axios";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Users,
  LogOut
} from "lucide-react";

const handleLogout = async () => {
  try {
    await authApi.logout();
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
      : "text-gray-300 hover:bg-emerald-700/30 hover:text-white"
  }`;

export default function AdminSidebar() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <>
 
      <button
  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
  className="
    lg:hidden fixed top-4 left-4 z-50
    p-2 rounded-lg
    bg-emerald-600 text-white
    shadow-md hover:bg-emerald-700
    transition-all duration-200
  "
>
  {isMobileSidebarOpen ? (
    <X size={22} />
  ) : (
    <Menu size={22} />
  )}
</button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-linear-to-b from-emerald-800 to-teal-900 text-white flex flex-col shadow-xl
        transform transition-transform duration-300
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-emerald-700/40">
          <h2 className="text-xl font-bold tracking-wide">
            RxPrescribe Admin
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            className={navLinkClass}
            onClick={closeMobileSidebar}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/audit-logs"
            className={navLinkClass}
            onClick={closeMobileSidebar}
          >
            <FileText size={18} />
            Audit Logs
          </NavLink>

          <NavLink
            to="/admin/csv-import"
            className={navLinkClass}
            onClick={closeMobileSidebar}
          >
            <Upload size={18} />
            CSV Import
          </NavLink>

          <NavLink
            to="/admin/users"
            className={navLinkClass}
            onClick={closeMobileSidebar}
          >
            <Users size={18} />
            User Management
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-emerald-700/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-emerald-700/30 hover:text-white transition-all duration-200 w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}