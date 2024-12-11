import React from 'react';
import { Car } from '../../types';
import { Button } from '../ui/Button';
import { Users, Gauge, Car as CarIcon } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onBookNow: (carId: string) => void;
}

const categoryLabels = {
  'suv': 'SUV',
  'mpv': 'MPV',
  'compact': 'Compact Car',
  'mid-size-suv': 'Mid-Size SUV'
};

export const CarCard: React.FC<CarCardProps> = ({ car, onBookNow }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {categoryLabels[car.category]}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
            <p className="text-gray-600 text-sm mt-1">{car.year}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">KES {car.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>
        </div>

        <div className="flex gap-6 my-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span className="text-sm">{car.seats} seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={18} />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <CarIcon size={18} />
            <span className="text-sm">{car.year}</span>
          </div>
        </div>

        <Button
          onClick={() => onBookNow(car.id)}
          className="w-full mt-4"
          size="lg"
        >
          Rent Now
        </Button>
      </div>
    </div>
  );
};