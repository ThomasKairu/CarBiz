import api from './api';
import { User } from '../types';

export const userService = {
  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user password
  updatePassword: async (passwords: { current_password: string; password: string; password_confirmation: string }) => {
    try {
      const response = await api.put('/user/password', passwords);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (formData: FormData) => {
    try {
      const response = await api.post('/user/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
