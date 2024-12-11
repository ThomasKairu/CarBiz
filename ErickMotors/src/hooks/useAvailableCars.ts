import { useMemo } from 'react';
import { Car } from '../types';

export const useAvailableCars = (
  cars: Car[],
  pickupDate?: string,
  returnDate?: string
) => {
  return useMemo(() => {
    if (!pickupDate || !returnDate) {
      return cars;
    }

    const pickup = new Date(pickupDate);
    const return_ = new Date(returnDate);

    // In a real application, you would check against actual bookings
    // For now, we'll just filter based on the available flag
    return cars.filter(car => {
      return car.available;
    });
  }, [cars, pickupDate, returnDate]);
};