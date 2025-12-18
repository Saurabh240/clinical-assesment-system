


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgetPassword';
import PharmacySelect from './pages/PharmacySelect';
import PharmacyProfile from './pages/PharmacyProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/pharmacy-select" element={<PharmacySelect />} />
         <Route path="/pharmacy-profile" element={<PharmacyProfile />} />
     
      </Routes>
    </Router>
  );
}

export default App;