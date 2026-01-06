


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgetPassword';
import PharmacySelect from './pages/PharmacySelect';
import PharmacyProfile from './pages/PharmacyProfile';
import Subscription from "./pages/Subscription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pharmacy-select" element={<PharmacySelect />} />
         <Route path="/pharmacy-profile" element={<PharmacyProfile />} />
     <Route path="/subscription" element={<Subscription />} />
     
      </Routes>
    </Router>
  );
}

export default App;