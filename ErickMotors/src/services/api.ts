import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

// Remove /api from the base URL if it's already included in VITE_API_URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost/car-rental-api/public/api';
const normalizedBaseURL = baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`;

const api = axios.create({
  baseURL: normalizedBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Remove any double slashes in the URL except after http(s):
    if (config.url) {
      config.url = config.url.replace(/([^:]\/)\/+/g, '$1');
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear auth state
      localStorage.removeItem('token');
      
      // Only redirect to login if we're not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // Handle validation errors
    if (error.response?.status === 422) {
      const validationErrors = error.response.data?.errors;
      if (validationErrors) {
        Object.values(validationErrors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach(message => toast.error(message));
          }
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;