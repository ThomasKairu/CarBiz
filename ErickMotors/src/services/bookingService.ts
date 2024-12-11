import api from './api';
import { Booking } from '../types';

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData: Partial<Booking>) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all bookings for the current user
  getUserBookings: async () => {
    try {
      const response = await api.get('/user/bookings');
      console.log('Raw API response:', response);
      // Check if response.data is an array or has a data property
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get a specific booking by ID
  getBooking: async (id: string) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a booking
  updateBooking: async (id: string, updateData: Partial<Booking>) => {
    try {
      const response = await api.put(`/bookings/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel a booking
  cancelBooking: async (id: string) => {
    try {
      const response = await api.put(`/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all bookings (admin only)
  getAllBookings: async () => {
    try {
      const response = await api.get('/bookings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default bookingService;
