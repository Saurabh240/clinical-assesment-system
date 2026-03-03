import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../admin/components/AdminLayout";
import AdminDashboard from "../admin/dashboard/AdminDashboard";
import AuditLogPage from "../admin/auditLogs/pages/AuditLogPage";
import CsvImportPage from "../admin/csvImport/pages/CsvImportPage";
import UserManagementPage from "../admin/userManagement/pages/UserManagementPage";


export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Pages */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="audit-logs" element={<AuditLogPage />} />
        <Route path="csv-import" element={<CsvImportPage />} />
        <Route path="users" element={<UserManagementPage />} />
      </Route>
    </Routes>
  );
}