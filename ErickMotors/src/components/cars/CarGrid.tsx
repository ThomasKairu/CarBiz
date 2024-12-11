import React, { useState } from 'react';
import { CarCard } from './CarCard';
import { Car } from '../../types';

interface CarGridProps {
  cars: Car[];
  onBookNow: (carId: string) => void;
}

export const CarGrid: React.FC<CarGridProps> = ({ cars, onBookNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Cars' },
    { id: 'suv', name: 'SUVs' },
    { id: 'mid-size-suv', name: 'Mid-Size SUVs' },
    { id: 'mpv', name: 'MPVs' },
    { id: 'compact', name: 'Compact Cars' },
  ];

  const filteredCars = selectedCategory === 'all' 
    ? cars 
    : cars.filter(car => {
        if (selectedCategory === 'suv') {
          return ['Range Rover Sport', 'Toyota Landcruiser V8', 'Toyota Prado'].includes(car.make + ' ' + car.model);
        }
        if (selectedCategory === 'mpv') {
          return car.make + ' ' + car.model === 'Toyota Alphard';
        }
        if (selectedCategory === 'mid-size-suv') {
          return ['Toyota Harrier', 'Mazda CX-5', 'Toyota RAV4', 'Nissan X-Trail'].includes(car.make + ' ' + car.model);
        }
        if (selectedCategory === 'compact') {
          return ['Nissan Teana', 'Toyota Mark X'].includes(car.make + ' ' + car.model);
        }
        return car.category === selectedCategory;
    });

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} onBookNow={onBookNow} />
        ))}
      </div>
    </div>
  );
};