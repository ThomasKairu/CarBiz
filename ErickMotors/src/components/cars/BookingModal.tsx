import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { Car } from '../../types';
import { cars } from '../../data/cars'; // TODO: Replace with API call

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: string;
  onSubmit: (data: BookingFormData) => void;
  defaultDates?: {
    startDate?: Date;
    endDate?: Date;
  };
}

interface BookingFormData {
  startDate: string;
  endDate: string;
  pickupLocation: string;
  returnLocation: string;
  additionalNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  carId,
  onSubmit,
  defaultDates,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    defaultValues: {
      startDate: defaultDates?.startDate?.toISOString().split('T')[0],
      endDate: defaultDates?.endDate?.toISOString().split('T')[0],
    },
  });

  const car = cars.find((c) => c.id.toString() === carId);

  if (!car) return null;

  const onSubmitForm = async (data: BookingFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to submit booking:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Book {car.make} {car.model}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Date
                </label>
                <input
                  type="date"
                  {...register('startDate', { required: 'Pickup date is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Return Date
                </label>
                <input
                  type="date"
                  {...register('endDate', { required: 'Return date is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pickup Location
              </label>
              <input
                type="text"
                {...register('pickupLocation', {
                  required: 'Pickup location is required',
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter pickup location"
              />
              {errors.pickupLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pickupLocation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Return Location
              </label>
              <input
                type="text"
                {...register('returnLocation', {
                  required: 'Return location is required',
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter return location"
              />
              {errors.returnLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.returnLocation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                {...register('additionalNotes')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Any special requirements or notes"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
