import { NavLink } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../api/axios";

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

const subNavLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-emerald-600/50 text-white"
      : "text-gray-300 hover:bg-emerald-700/30 hover:text-white"
  }`;

export default function Sidebar() {
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-linear-to-b from-emerald-800 to-teal-900 text-white flex flex-col shadow-xl
        transform transition-transform duration-300
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-emerald-700/40">
          <h2 className="text-xl font-bold">RxPrescribe</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto">

          <NavLink to="/dashboard" className={navLinkClass} onClick={closeMobileSidebar}>
            Dashboard
          </NavLink>

          {/* Assessments */}
          <div>
            <button
              onClick={() => setIsAssessmentsOpen(!isAssessmentsOpen)}
              className="w-full text-left"
            >
              <span className={navLinkClass({ isActive: false })}>
                Assessments
              </span>
            </button>

            {isAssessmentsOpen && (
              <div className="ml-4 space-y-1">
                <NavLink
                  to="/assessments"
                  className={subNavLinkClass}
                  onClick={closeMobileSidebar}
                >
                  All Assessments
                </NavLink>

                <NavLink
                  to="/follow-ups"
                  className={subNavLinkClass}
                  onClick={closeMobileSidebar}
                >
                  Follow Ups
                </NavLink>
              </div>
            )}
          </div>

          {/* Products (your addition) */}
          <NavLink to="/products" className={navLinkClass} onClick={closeMobileSidebar}>
            Products
          </NavLink>

          <NavLink to="/patients" className={navLinkClass} onClick={closeMobileSidebar}>
            Patients
          </NavLink>

          <NavLink to="/billing" className={navLinkClass} onClick={closeMobileSidebar}>
            Billing
          </NavLink>

          <NavLink to="/settings" className={navLinkClass} onClick={closeMobileSidebar}>
            Settings
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-emerald-700/40">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-emerald-700/30"
          >
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}
