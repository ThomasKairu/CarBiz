import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Attempting login with:', { email: formData.email });
      await login(formData.email, formData.password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      console.error('Login Error Details:', {
        error,
        isAxiosError: error instanceof AxiosError,
        response: error instanceof AxiosError ? error.response : null,
        message: error instanceof Error ? error.message : 'Unknown error',
      });

      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message 
          || error.response?.data?.error 
          || 'Login failed. Please check your credentials.';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            'Signing in...'
          ) : (
            <>
              <LogIn size={20} />
              Sign In
            </>
          )}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};