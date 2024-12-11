import api from './api';
import { Booking } from '../types';

export const createBooking = async (data: {
  car_id: string;
  start_date: string;
  end_date: string;
  notes?: string;
}) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const getBookings = async (params?: {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  search?: string;
  page?: number;
  user_id?: string;
}) => {
  const response = await api.get('/bookings', { params });
  return response.data;
};

export const getUserBookings = async (params?: {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  page?: number;
}) => {
  // Use the main bookings endpoint with a filter for the current user
  const response = await api.get('/bookings', { 
    params: { 
      ...params,
      current_user: true // Add a parameter to indicate we want current user's bookings
    } 
  });
  return response.data;
};

export const getBooking = async (id: string) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const updateBooking = async (id: string, data: {
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}) => {
  const response = await api.put(`/bookings/${id}`, data);
  return response.data;
};

export const deleteBooking = async (id: string) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

export const getBookingStats = async () => {
  const response = await api.get('/bookings/stats');
  return response.data;
};