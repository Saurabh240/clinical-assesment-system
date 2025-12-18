

import { useState } from 'react';

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

      /*alert(`Account created successfully! Please login.`);*/
      
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
}