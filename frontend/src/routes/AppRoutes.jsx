import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Assessments from "../pages/Assessments";
import PatientHistory from "../pages/PatientHistory";
import Billing from "../pages/Billing";
import Settings from "../pages/Settings";
import AssessmentView from "../modules/assessment/AssessmentView";
import ProductsPage from "../pages/ProductsPage";
import FollowUps from "../pages/FollowUps";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="assessments/:id" element={<AssessmentView />} />
        <Route path="patient-history" element={<PatientHistory />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="follow-ups" element={<FollowUps />} />
      </Route>
    </Routes>
  );
}