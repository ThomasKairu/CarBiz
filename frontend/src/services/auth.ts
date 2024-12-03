import api from './api';
import { User } from '../types';
import { AxiosError } from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<any>('/login', credentials);
    const roleMap: { [key: number]: 'admin' | 'user' } = {
      1: 'admin',
      2: 'user'
    };

    return {
      user: {
        ...response.data.user,
        role: roleMap[response.data.user.role_id] || 'user'
      },
      token: response.data.token
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post<any>('/register', data);
    const roleMap: { [key: number]: 'admin' | 'user' } = {
      1: 'admin',
      2: 'user'
    };

    return {
      user: {
        ...response.data.user,
        role: roleMap[response.data.user.role_id] || 'user'
      },
      token: response.data.token
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout');
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Logout failed';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<any>('/user');
    // Map the role_id to role string
    const roleMap: { [key: number]: 'admin' | 'user' } = {
      1: 'admin',
      2: 'user'
    };
    
    return {
      ...response.data,
      role: roleMap[response.data.role_id] || 'user'
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Failed to get user data';
      throw new Error(errorMessage);
    }
    throw error;
  }
};