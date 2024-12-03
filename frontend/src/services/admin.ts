import api from './api';

export interface AdminStats {
  totalCars: number;
  activeBookings: number;
  totalRevenue: number;
  totalUsers: number;
}

export const getAdminStats = async () => {
  return await api.get('/admin/stats');
};

export const getAdminBookings = async (status?: string) => {
  const params = status ? { status } : {};
  return await api.get('/bookings', { params });
};

export const updateBookingStatus = async (bookingId: number, status: 'confirmed' | 'cancelled') => {
  return await api.patch(`/bookings/${bookingId}/status`, { status });
};
