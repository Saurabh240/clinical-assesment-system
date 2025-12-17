
{/*import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios'; 
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const BASE_URL = "http://localhost:8082"; 

function Login() {
const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const LOGIN_ENDPOINT = `${BASE_URL}/auth/signIn`; 
      
      const response = await axios.post(LOGIN_ENDPOINT, {
        email,
        password,
      });

      const { token, companyId, username } = response.data;

      // Check for mandatory fields: token and companyId
      if (!token || companyId === undefined || companyId === null) {
        throw new Error('Login succeeded, but critical user data (token or companyId) was not received from the server.');
      }

      
      localStorage.setItem("userData", JSON.stringify({ 
        token, 
        companyId: companyId, 
        username: username || email 
      }));
      
      alert(`Login Successful! Redirecting...`);
     /* window.location.href = "/dashboard";*/
     /*navigate("/dashboard");
      
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
export default Login;*/}


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 


import api from '../api/axios'; 


import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      
      const response = await api.post('/auth/signIn', {
        email,
        password,
      });

      const { token, refreshToken, companyId, username } = response.data;

      // Validation
      if (!token || companyId == null) {
        throw new Error('Critical user data (token/companyId) missing from server.');
      }

      // Save everything to localStorage
      localStorage.setItem("userData", JSON.stringify({ 
        token, 
        refreshToken, // Interceptor uses this to stay logged in
        companyId, 
        username: username || email 
      }));
      
      // Navigate to dashboard
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message 
                           || err.message 
                           || 'Authentication failed. Please check your credentials.';
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
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded p-1 cursor-pointer"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
            <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-400">
              Sign up
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Login;