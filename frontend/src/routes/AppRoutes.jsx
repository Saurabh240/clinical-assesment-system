import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Assessments from "../pages/Assessments";
import Patients from "../pages/Patients";
import Billing from "../pages/Billing";
import Settings from "../pages/Settings";
import FollowUps from "../pages/FollowUps";

import AssessmentView from "../modules/assessment/AssessmentView";
import ProductsPage from "../pages/ProductsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Protected dashboard */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/assessments/:id" element={<AssessmentView />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/follow-ups" element={<FollowUps />} />
      </Route>
    </Routes>
  );
}
