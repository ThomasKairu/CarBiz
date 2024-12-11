import api from './api';
import { User } from '../types';

export const updateProfile = async (data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}) => {
  const response = await api.put('/user/profile', data);
  return response.data;
};

export const changePassword = async (data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.put('/user/password', data);
  return response.data;
};

export const uploadAvatar = async (data: FormData) => {
  const response = await api.post('/user/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get('/user/stats');
  return response.data;
};
