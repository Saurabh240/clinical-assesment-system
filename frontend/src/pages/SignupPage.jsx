

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

import api from "../api/axios";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // sign up (just creates user)
    await api.post("/auth/signUp", {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });

    //  login (creates session / cookie)
    const loginRes = await api.post("/auth/signIn", {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });

    const { accessToken, user } = loginRes.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/pharmacy-select");
  } catch (err) {
    setError(
      err.response?.data?.message || "Signup failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
 <Card.Title className="text-xl font-bold text-teal-600">
            RxPrescribe
          </Card.Title>
          <Card.Description>Sign up to get started</Card.Description>
        </Card.Header>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleSignup} className="space-y-6">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              leftIcon={<User className="w-5 h-5" />}
              required
              disabled={loading}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              leftIcon={<User className="w-5 h-5" />}
              required
              disabled={loading}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              leftIcon={<Mail className="w-5 h-5" />}
              required
              disabled={loading}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              leftIcon={<Lock className="w-5 h-5" />}
              required
              disabled={loading}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              leftIcon={<Lock className="w-5 h-5" />}
              required
              disabled={loading}
            />

            <Button type="submit" fullWidth loading={loading} variant="secondary">
              Create Account
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-600 hover:text-teal-400"
            >
              Login
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Signup;
