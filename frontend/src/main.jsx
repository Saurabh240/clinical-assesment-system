import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { AssessmentProvider } from "./context/AssessmentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <AssessmentProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </AssessmentProvider>
    </BrowserRouter>
  </StrictMode>
);
