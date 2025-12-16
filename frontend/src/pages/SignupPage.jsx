
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Mail, Lock, User } from 'lucide-react'; // Import User icon
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

// const BASE_URL = "http://localhost:8080";

export default function Signup({ onSignupSuccess, onToggleView }) {
  // 1. STATE FIX: Use camelCase for consistency and fix the state name in the setter
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Corrected state name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) { // Include confirmPassword in required check
        throw new Error('All fields are required.');
      }
      
      // 2. ERROR FIX: Use 'Error' class
      if(password !== confirmPassword){
        throw new Error('Password and Confirm Password must match.'); // Corrected capitalization
      }
      
      // Assuming BASE_URL is defined somewhere accessible
      const api = axios.create({ baseURL: BASE_URL }); 

      const response = await api.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      console.log('Signup success response:', response.data);

      alert(`Account for ${name} created successfully! Please complete your professional profile.`);
      
      // 3. NAVIGATION FIX: Redirect to the next professional form step
      navigate("/onboarding/pharmacy"); 
      
    } catch (err) {
      console.error("Signup failed:", err);
      // Ensure the error message is correctly pulled, using the client-side thrown error first
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
           <Input // UNCOMMENTED: You need this for the 'name' state and API call
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
              // 4. CRITICAL FIX: Use 'confirmPassword' state for value and setter
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
}