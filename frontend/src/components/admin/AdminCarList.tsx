import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Car } from '../../types';
import { getCars, deleteCar } from '../../services/cars';
import { toast } from 'react-hot-toast';
import { AddCarModal } from './AddCarModal';
import { EditCarModal } from './EditCarModal';
import alphard from '../../assets/alphard.jpg';
import landcruiserV8 from '../../assets/landcruiser-v8.jpg';
import mazdaCx5 from '../../assets/mazda-cx5.jpg';
import nissanTeana from '../../assets/nissan-teana.jpg';
import nissanXtrail from '../../assets/nissan-xtrail.jpg';
import rangeRover from '../../assets/range-rover.jpg';
import toyotaHarrier from '../../assets/toyota-harrier.jpg';
import toyotaMarkX from '../../assets/toyota-mark-x.jpg';
import toyotaPrado from '../../assets/toyota-prado.jpg';
import toyotaRav4 from '../../assets/toyota-rav4.jpg';
import toyotaWish from '../../assets/toyota-wish.jpg';

const carImages: { [key: string]: string } = {
  'Toyota|Wish': toyotaWish,
  'Toyota|Landcruiser V8': landcruiserV8,
  'Mazda|CX-5': mazdaCx5,
  'Nissan|Teana': nissanTeana,
  'Nissan|X-Trail': nissanXtrail,
  'Range Rover|Sport': rangeRover,
  'Toyota|Harrier': toyotaHarrier,
  'Toyota|Mark X': toyotaMarkX,
  'Toyota|Prado': toyotaPrado,
  'Toyota|RAV4': toyotaRav4,
  'Toyota|Alphard': alphard,
};

const getCarImage = (make: string, model: string): string => {
  // Create a key in the format "Make|Model"
  const key = `${make}|${model}`;
  
  // First try exact match
  if (carImages[key]) {
    return carImages[key];
  }
  
  // Try case-insensitive match
  const keyLower = key.toLowerCase();
  const matchingKey = Object.keys(carImages).find(k => k.toLowerCase() === keyLower);
  if (matchingKey) {
    return carImages[matchingKey];
  }
  
  // If no match found, return a default image
  return toyotaHarrier; // Default image
};

export const AdminCarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadCars();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

  const loadCars = async () => {
    try {
      setLoading(true);
      const response = await getCars({ 
        search: searchTerm,
        page: currentPage 
      });
      setCars(response.data.data);
      setTotalPages(Math.ceil(response.data.total / response.data.per_page));
    } catch (error) {
      toast.error('Failed to load cars');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleEdit = (car: Car) => {
    setSelectedCar(car);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(id);
        toast.success('Car deleted successfully');
        loadCars();
      } catch (error) {
        toast.error('Failed to delete car');
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Cars</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your car inventory
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Car
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div key={car.id} className="bg-white overflow-hidden shadow rounded-lg">
                <img
                  src={getCarImage(car.make, car.model)}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="px-4 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {car.make} {car.model}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {car.year} • {car.transmission} • {car.seats} seats
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    KES {car.price_per_day.toLocaleString()}/day
                  </p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(car)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(car.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-primary border-primary text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </>
      )}

      <AddCarModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          loadCars();
        }}
      />

      {selectedCar && (
        <EditCarModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCar(null);
          }}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setSelectedCar(null);
            loadCars();
          }}
          car={selectedCar}
        />
      )}
    </div>
  );
};
