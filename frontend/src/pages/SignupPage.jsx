

/*import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react'; 
import api from '../api/axios';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';




export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required.');
      }
      
      if(password !== confirmPassword){
        throw new Error('Password and Confirm Password must match.');
      }
      

      

      const response = await api.post('/auth/signUp', {
        name,
        email,
        password,
      });

      console.log('Signup success :', response.data);

      /*alert(`Account created successfully! Please login.`);
      
      navigate("/PharmacySelect"); 
      
    } catch (err) {
      console.error("Signup failed:", err);
      const errorMessage = err.message || err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
          <Card.Title>Create Account</Card.Title>
        </Card.Header>
        
        {error && (
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleSignup} className="space-y-6">
           <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              leftIcon={<User className="w-5 h-5" />}
              required
              disabled={loading}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
              required
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (Min 8 characters)"
              helperText="Minimum 8 characters required"
              leftIcon={<Lock className="w-5 h-5" />}
              required
              disabled={loading}
            />
             <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="•••••••• (Re-enter password)"
              helperText="Must match the password above"
              leftIcon={<Lock className="w-5 h-5" />}
              required
              disabled={loading}
            />
           
            <Button
              type="submit"
              variant="secondary" 
              fullWidth
              loading={loading}
              className="cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
          <Link 
              to="/login"
              className="font-medium  text-teal-600 hover:text-teal-400 cursor-pointer" 
            >
              Login
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}*/
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ error is ALWAYS an object
  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // reset error
    setError({ type: "", message: "" });

    const { name, email, password, confirmPassword } = formData;

    // ======================
    // 1️⃣ FRONTEND VALIDATION
    // ======================
    if (!name || !email || !password || !confirmPassword) {
      setError({
        type: "frontend",
        message: "All fields are required.",
      });
      return;
    }

    if (password.length < 8) {
      setError({
        type: "frontend",
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        type: "frontend",
        message: "Password and Confirm Password must match.",
      });
      return;
    }

    // ======================
    // 2️⃣ API CALL
    // ======================
    setLoading(true);

    try {
      await api.post("/auth/signUp", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      navigate("/login");
    } catch (err) {
      if (!err.response) {
        // network / cors / server down
        setError({
          type: "network",
          message: "Unable to connect to server. Please try again later.",
        });
      } else {
        // backend error
        setError({
          type: "backend",
          message:
            err.response.data?.message ||
            "Registration failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
          <Card.Title>Create Account</Card.Title>
          <Card.Description>Sign up to get started</Card.Description>
        </Card.Header>

        {/*  Error UI */}
        {error.message && (
          <div
            className={`p-3 mb-6 text-sm rounded-lg ${
              error.type === "frontend"
                ? "text-yellow-800 bg-yellow-100"
                : error.type === "network"
                ? "text-orange-800 bg-orange-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {error.message}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleSignup} className="space-y-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              leftIcon={<User className="w-5 h-5" />}
              disabled={loading}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              leftIcon={<Mail className="w-5 h-5" />}
              disabled={loading}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              helperText="Minimum 8 characters"
              disabled={loading}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              helperText="Must match the password"
              disabled={loading}
              required
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
