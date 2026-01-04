
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const BASE_URL =  import.meta.env.VITE_API_BASE_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const api = axios.create({ baseURL: BASE_URL });
      await api.post('/api/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password failed:", err);
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card shadow="xl" padding="lg" className="w-full max-w-md">
        <Card.Header className="text-center">
          <Link 
            to="/login"
            className="inline-flex items-center text-md text-teal-600 hover:text-teal-500 mb-4"
          >
            {/*<ArrowLeft className="w-4 h-4 mr-1" />*/}
            Back to login
          </Link>
          
          <Card.Title>Reset Your Password</Card.Title>
          <Card.Description>
            Enter your email and we'll send you a reset link
          </Card.Description>
        </Card.Header>

        {error && (
          <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <Card.Content>
          {success ? (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <Link to="/login">
                <Button variant="secondary">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
              
              <Button
                type="submit"
                fullWidth
                loading={loading}
                variant="secondary"
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </Card.Content>

        <Card.Footer className="text-center text-sm text-gray-500">
          Remember your password?{' '}
          <Link to="/login" className="text-teal-600 hover:text-teal-500 font-medium">
            Sign in
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}