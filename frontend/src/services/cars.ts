import api from './api';
import { Car } from '../types';

interface GetCarsParams {
  search?: string;
  category?: string;
  page?: number;
  per_page?: number;
}

export const getCars = async (params?: GetCarsParams) => {
  return await api.get('/cars', { 
    params: {
      ...params,
      per_page: params?.per_page || 10
    }
  });
};

export const getCar = async (id: number) => {
  return await api.get(`/cars/${id}`);
};

export const createCar = async (carData: Partial<Car>) => {
  return await api.post('/cars', carData);
};

export const updateCar = async (id: number, carData: Partial<Car>) => {
  return await api.put(`/cars/${id}`, carData);
};

export const deleteCar = async (id: number) => {
  return await api.delete(`/cars/${id}`);
};

export const checkCarAvailability = async (
  carId: string,
  startDate: string,
  endDate: string
) => {
  const response = await api.get(`/cars/${carId}/availability`, {
    params: { start_date: startDate, end_date: endDate },
  });
  return response.data;
};