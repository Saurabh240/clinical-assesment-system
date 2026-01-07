

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import api from "../api/axios";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { logoutUser } from "../utils/logout";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signIn", {
        email: formData.email,
        password: formData.password,
      });

      const { accessToken, nextStep, userId, status } = res.data;

      if (!accessToken) {
        throw new Error("Access token not received");
      }

      // 1. Store auth data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("authUser", JSON.stringify({ userId, status }));

      // 2. Optimized Navigation Logic
      // This logic ensures that if the backend says "SUBSCRIPTION", 
      // the user CANNOT reach the dashboard.
      switch (nextStep) {
        case "DASHBOARD":
          navigate("/dashboard", { replace: true });
          break;

        case "PHARMACY_SELECTION":
          navigate("/pharmacy-select", { replace: true });
          break;

        case "SUBSCRIPTION":
          // If user linked pharmacy but didn't pay, backend sends "SUBSCRIPTION"
          // We force them to the subscription page here.
          navigate("/subscription", { replace: true });
          break;

        default:
          /* FALLBACK LOGIC 
           * If nextStep is missing/undefined, we use the 'status' as a backup*/
           
          if (status === "PENDING_PHARMACY") {
            navigate("/pharmacy-select", { replace: true });
          } else if (status === "PENDING_SUBSCRIPTION") {
            navigate("/subscription", { replace: true });
          } else if (status === "ACTIVE") {
            navigate("/dashboard", { replace: true });
          } else {
            // If we truly don't know where they are, logout to be safe
            console.error("Unknown user state. Logging out.");
            logoutUser();
          }
      }

    } catch (err) {
      if (!err.response) {
        setError("Unable to connect to server. Please try again later.");
      } else if (err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.response.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
          <Card.Title className="text-2xl font-bold">Welcome Back</Card.Title>
          <Card.Description>Sign in to your account</Card.Description>
        </Card.Header>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
              required
              disabled={loading}
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                leftIcon={<Lock className="w-5 h-5 text-gray-400" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                required
                disabled={loading}
              />
              <div className="flex justify-end mt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              variant="secondary"
              className="mt-4"
            >
              Sign In
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="text-center text-sm pt-4 border-t">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-teal-600 hover:text-teal-400"
            >
              Sign up
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Login;

