import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import api from "../api/axios";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

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
    const response = await api.post("/auth/signIn", {
      email: formData.email,
      password: formData.password,
    });

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    navigate("/PharmacySelect");
  } catch (err) {
    if (!err.response) {
      setError("Unable to connect to server. Please try again later.");
    } else if (err.response.status === 401) {
      setError("Invalid email or password.");
    } else {
      setError(
        err.response.data?.message ||
          "Login failed. Please try again."
      );
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
          <Card.Title>Welcome Back</Card.Title>
          <Card.Description>Sign in to your account</Card.Description>
        </Card.Header>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
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
              leftIcon={<Mail className="w-5 h-5" />}
              required
              disabled={loading}
            />

            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              required
              disabled={loading}
              helperText={
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot Password?
                </Link>
              }
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              variant="secondary"
            >
              Sign In
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="text-center text-sm">
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
