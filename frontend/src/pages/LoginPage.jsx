
/*import  { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import {  Mail, Lock,Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
// Assuming BASE_URL is defined elsewhere or locally
const BASE_URL = "http://localhost:8080"; 

export default function Login({ onLoginSuccess, onToggleView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const api = axios.create({ baseURL: BASE_URL }); 
      
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, companyId, username } = response.data;

      if (!token) {
        throw new Error('Login succeeded, but no token was received.');
      }

      localStorage.setItem("userData", JSON.stringify({ 
        token, 
        companyId: companyId || 1, 
        username: username || email 
      }));
      
      alert(`Login Successful! Redirecting...`);
      window.location.href = "/dashboard";
      
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message 
                           || err.message 
                           || 'Authentication failed. Please check your network and credentials.';
      setError(errorMessage);
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
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleLogin} className="space-y-6">
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
            {/*<Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              required
              disabled={loading}
            />


            <Button
              type="submit"
              fullWidth
              loading={loading}
              variant='secondary'
              className="cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            
           
            <Link 
              to="/signup" // 👈 Navigates to the /signup route
              className="font-medium text-teal-600 hover:text-teal-400 cursor-pointer"
            >
              Sign up
            </Link>
            
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}*/

import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const BASE_URL = "http://localhost:8080"; 

export default function Login({ onLoginSuccess, onToggleView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Added this function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const api = axios.create({ baseURL: BASE_URL }); 
      
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, companyId, username } = response.data;

      if (!token) {
        throw new Error('Login succeeded, but no token was received.');
      }

      localStorage.setItem("userData", JSON.stringify({ 
        token, 
        companyId: companyId || 1, 
        username: username || email 
      }));
      
      alert(`Login Successful! Redirecting...`);
      window.location.href = "/dashboard";
      
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message 
                           || err.message 
                           || 'Authentication failed. Please check your network and credentials.';
      setError(errorMessage);
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
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleLogin} className="space-y-6">
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
               type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded p-1"
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? ( 
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
              required
              disabled={loading}
              helperText={
                <Link to="/forget-password"
                className="text-sm font-medium text-teal-600 hover:text-teal-500">Forget Password?</Link>
              }
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              variant='secondary'
              className="cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/signup"
              className="font-medium text-teal-600 hover:text-teal-400 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}