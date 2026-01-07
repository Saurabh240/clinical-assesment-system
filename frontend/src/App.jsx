import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgetPassword";
import PharmacySelect from "./pages/PharmacySelect";
import PharmacyProfile from "./pages/PharmacyProfile";
import Subscription from "./pages/Subscription";


import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pharmacy-select" element={<PharmacySelect />} />
      <Route path="/pharmacy-profile" element={<PharmacyProfile />} />
        <Route path="/subscription" element={<Subscription />} />

      {/* Protected dashboard routes */}
      <Route path="/*" element={<AppRoutes />} />
    </Routes>

  );
}

export default App;
