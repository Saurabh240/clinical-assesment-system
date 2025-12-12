// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; // 👈 Added Link import
import {  Mail, Lock } from 'lucide-react';
import Button from '../components/ui/Button'; 
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
// const BASE_URL = "http://localhost:8080";

export default function Signup({ onSignupSuccess, onToggleView }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password) {
        throw new Error('All fields are required.');
      }
      
      const api = axios.create({ baseURL: BASE_URL }); 

      const response = await api.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      console.log('Signup success response:', response.data);

      alert(`Account for ${name} created successfully! Please log in.`);
      // Redirect to login page after successful signup
      // window.location.href = "/login"; 
      
    } catch (err) {
      console.error("Signup failed:", err);
      const errorMessage = err.response?.data?.message 
                           || err.message 
                           || 'Registration failed. The email might already be in use.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
         {/* <UserPlus className="w-10 h-10 mx-auto text-green-600 mb-4" />*/}
          <Card.Title>Create Account</Card.Title>
          {/*<Card.Description>Get started with DocManager</Card.Description>*/}
        </Card.Header>
        
        {error && (
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          <form onSubmit={handleSignup} className="space-y-6">
           {/*<Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              leftIcon={<User className="w-5 h-5" />}
              required
              disabled={loading}
            />*/}
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
            <Button
              type="submit"
              variant="secondary" 
              fullWidth
              loading={loading}
              className = "cursor-pointer"
              

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