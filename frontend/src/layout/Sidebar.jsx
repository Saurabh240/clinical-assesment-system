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
          {/*<NavLink to="/products" className={navLinkClass} onClick={closeMobileSidebar}>
            Products
          </NavLink>*/}
            <NavLink
            to="/products"
            className={navLinkClass}
            onClick={closeMobileSidebar}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Products
          </NavLink>

          <NavLink to="/patients" className={navLinkClass} onClick={closeMobileSidebar}>
            Patients
          </NavLink>

          <NavLink to="/billing" className={navLinkClass} onClick={closeMobileSidebar}>
            Billing
          </NavLink>
      

          <NavLink 
            to="/settings" 
            className={navLinkClass}
            onClick={closeMobileSidebar}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
            </NavLink>

         

        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-emerald-700/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-emerald-700/30 hover:text-white transition-all duration-200 w-full"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Logout
          </button>
        </div>

      

      </aside>
    </>
  );
}
