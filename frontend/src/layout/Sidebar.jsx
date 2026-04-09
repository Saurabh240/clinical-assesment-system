import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, ClipboardList, Repeat, History, CreditCard, Settings, LogOut, ChevronDown } from "lucide-react";
import { authApi } from "../api/axios";

const handleLogout = async () => {
  try { await authApi.logout(); } catch (err) { console.error("Logout failed:", err); }
};

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
      : "text-gray-300 hover:bg-emerald-700/30 hover:text-white"
  }`;

const subNavLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-emerald-600/50 text-white"
      : "text-gray-300 hover:bg-emerald-700/30 hover:text-white"
  }`;

export default function Sidebar() {
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const close = () => setIsMobileSidebarOpen(false);

  return (
    <>
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-all duration-200"
      >
        {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64
        bg-linear-to-b from-emerald-800 to-teal-900 text-white flex flex-col shadow-xl
        transform transition-transform duration-300
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 border-b border-emerald-700/40">
          <h2 className="text-xl font-bold">RxPrescribe</h2>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto">

          <NavLink to="/dashboard" className={navLinkClass} onClick={close}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Assessments dropdown */}
          <div>
            <button onClick={() => setIsAssessmentsOpen(!isAssessmentsOpen)} className="w-full text-left">
              <span className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-gray-300 hover:bg-emerald-700/30 hover:text-white transition">
                <span className="flex items-center gap-3">
                  <ClipboardList size={18} />
                  Assessments
                </span>
                <ChevronDown size={16} className={`transition-transform ${isAssessmentsOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            {isAssessmentsOpen && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink to="/assessments" className={subNavLinkClass} onClick={close}>
                  <ClipboardList size={16} /> All Assessments
                </NavLink>
                <NavLink to="/follow-ups" className={subNavLinkClass} onClick={close}>
                  <Repeat size={16} /> Follow Ups
                </NavLink>
              </div>
            )}
          </div>

          {/* Products tab is hidden — re-enable by uncommenting below */}
          {/* <NavLink to="/products" className={navLinkClass} onClick={close}>
            <Package size={18} />
            Products
          </NavLink> */}

          <NavLink to="/patient-history" className={navLinkClass} onClick={close}>
            <History size={18} />
            Patient History
          </NavLink>

          <NavLink to="/billing" className={navLinkClass} onClick={close}>
            <CreditCard size={18} />
            Billing
          </NavLink>

          <NavLink to="/settings" className={navLinkClass} onClick={close}>
            <Settings size={18} />
            Settings
          </NavLink>

        </nav>

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