import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import { createCar } from '../../services/cars';
import { X } from 'lucide-react';
import { Car } from '../../types';
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

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<Car>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price_per_day: 0,
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    description: '',
    is_available: true,
    features: [],
    image_url: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Set the image URL based on the make and model
      const imageUrl = getCarImage(formData.make || '', formData.model || '');
      const carData = {
        ...formData,
        image_url: imageUrl,
      };

      const response = await createCar(carData);
      console.log('Car creation response:', response);
      toast.success('Car added successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to add car:', error);
      if (error instanceof Error) {
        toast.error(`Failed to add car: ${error.message}`);
      } else {
        toast.error('Failed to add car');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                    Add New Car
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Make
                      </label>
                      <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        min={1900}
                        max={new Date().getFullYear() + 1}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price per Day (KES)
                      </label>
                      <input
                        type="number"
                        name="price_per_day"
                        value={formData.price_per_day}
                        onChange={handleChange}
                        min={0}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      >
                        <option value="suv">SUV</option>
                        <option value="mpv">MPV</option>
                        <option value="compact">Compact</option>
                        <option value="mid-size-suv">Mid-size SUV</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Seats
                      </label>
                      <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        min={2}
                        max={10}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="automatic">Automatic</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Adding...' : 'Add Car'}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
