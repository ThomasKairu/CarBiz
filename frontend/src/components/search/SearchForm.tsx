import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      location: searchData.location,
      pickup: searchData.pickupDate,
      return: searchData.returnDate,
    }).toString();
    
    navigate(`/cars?${queryParams}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="location"
              value={searchData.location}
              onChange={handleChange}
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pickup location"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              name="pickupDate"
              value={searchData.pickupDate}
              onChange={handleChange}
              min={today}
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Return Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              name="returnDate"
              value={searchData.returnDate}
              onChange={handleChange}
              min={searchData.pickupDate || today}
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2">
          <Search size={20} />
          Search Available Cars
        </Button>
      </div>
    </form>
  );
};