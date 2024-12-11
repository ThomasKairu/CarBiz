import React, { useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { CarGrid } from '../components/cars/CarGrid';
import { cars } from '../data/cars';
import { useAvailableCars } from '../hooks/useAvailableCars';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { BookingModal } from '../components/cars/BookingModal';
import * as bookingService from '../services/bookings';

export const CarsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const pickupDate = searchParams.get('pickup') || undefined;
  const returnDate = searchParams.get('return') || undefined;
  const locationParam = searchParams.get('location');

  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [selectedCarId, setSelectedCarId] = React.useState<string | null>(null);

  const availableCars = useAvailableCars(cars, pickupDate, returnDate);

  // Check if we should open the booking modal (coming from dashboard)
  useEffect(() => {
    if (location.state?.openBooking) {
      // Clear the state so it doesn't persist
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleBookNow = (carId: string) => {
    if (!user) {
      toast.error('Please login to book a car');
      navigate('/login', { state: { from: location } });
      return;
    }

    setSelectedCarId(carId);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData: {
    startDate: string;
    endDate: string;
    pickupLocation: string;
    returnLocation: string;
    additionalNotes?: string;
  }) => {
    try {
      if (!selectedCarId) {
        throw new Error('No car selected');
      }

      // Create the booking
      await bookingService.createBooking({
        car_id: selectedCarId,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        notes: `Pickup: ${bookingData.pickupLocation}\nReturn: ${bookingData.returnLocation}\n${bookingData.additionalNotes || ''}`
      });

      toast.success('Booking created successfully!');
      setIsBookingModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking creation failed:', error);
      toast.error('Failed to create booking. Please try again.');
    }
  };

  return (
    <main className="flex-grow">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(pickupDate && returnDate) ? (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Available Cars</h2>
            <p className="mt-2 text-gray-600">
              {locationParam && `Location: ${locationParam}`}
              {pickupDate && ` • Pickup: ${new Date(pickupDate).toLocaleDateString()}`}
              {returnDate && ` • Return: ${new Date(returnDate).toLocaleDateString()}`}
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
            <p className="mt-2 text-gray-600">Choose from our selection of premium vehicles</p>
          </div>
        )}

        <CarGrid cars={availableCars} onBookNow={handleBookNow} />
      </div>

      {selectedCarId && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          carId={selectedCarId}
          onSubmit={handleBookingSubmit}
          defaultDates={{
            startDate: pickupDate ? new Date(pickupDate) : undefined,
            endDate: returnDate ? new Date(returnDate) : undefined
          }}
        />
      )}
    </main>
  );
};