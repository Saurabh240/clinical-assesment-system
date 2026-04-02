import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../admin/components/AdminLayout";
import AdminDashboard from "../admin/dashboard/AdminDashboard";
import AuditLogPage from "../admin/auditLogs/pages/AuditLogPage";
import CsvImportPage from "../admin/csvImport/pages/CsvImportPage";
import UserManagementPage from "../admin/userManagement/pages/UserManagementPage";

// Reads the role that was stored in localStorage on login
function RequirePharmacyAdmin({ children }) {
  const raw = localStorage.getItem("authUser");
  if (!raw) return <Navigate to="/login" replace />;

  try {
    const { role } = JSON.parse(raw);
    if (role !== "PHARMACY_ADMIN") return <Navigate to="/dashboard" replace />;
  } catch {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequirePharmacyAdmin>
            <AdminLayout />
          </RequirePharmacyAdmin>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="audit-logs" element={<AuditLogPage />} />
        <Route path="csv-import" element={<CsvImportPage />} />
        <Route path="users" element={<UserManagementPage />} />
      </Route>
    </Routes>
  );
}