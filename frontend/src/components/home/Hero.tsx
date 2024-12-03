import React from 'react';
import { SearchForm } from '../search/SearchForm';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rent Your Perfect Car in Kenya
          </h1>
          <p className="text-xl opacity-90">
            Choose from our wide selection of vehicles at the best prices
          </p>
        </div>
        <SearchForm />
      </div>
    </div>
  );
};