import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Booking } from '../../types';
import { CalendarRange, Car, Settings } from 'lucide-react';
import bookingService from '../../services/bookingService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const UserBookings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const bookingsData = await bookingService.getUserBookings();
      console.log('Fetched bookings:', bookingsData);
      
      if (Array.isArray(bookingsData)) {
        setBookings(bookingsData);
      } else {
        console.error('Unexpected bookings data format:', bookingsData);
        setError('Invalid data format received from server');
      }
    } catch (error: any) {
      console.error('Error loading bookings:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to load bookings';
      setError(errorMessage);
      
      if (error?.response?.status === 401) {
        toast.error('Please log in again to view your bookings');
        navigate('/login');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.updateBooking(bookingId.toString(), { status: 'cancelled' });
        toast.success('Booking cancelled successfully');
        loadBookings();
      } catch (error: any) {
        console.error('Error cancelling booking:', error);
        const errorMessage = error?.response?.data?.message || 'Failed to cancel booking';
        toast.error(errorMessage);
      }
    }
  };

  const calculateTotalAmount = (booking: Booking) => {
    if (!booking.car?.price_per_day || !booking.start_date || !booking.end_date) return 0;
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * booking.car.price_per_day;
  };

  const getCarImagePath = (make: string, model: string) => {
    const imageMap: { [key: string]: string } = {
      'Toyota Alphard': 'alphard.jpg',
      'Toyota Harrier': 'toyota-harrier.jpg',
      'Toyota Prado': 'toyota-prado.jpg',
      'Toyota RAV4': 'toyota-rav4.jpg',
      'Toyota Wish': 'toyota-wish.jpg',
      'Toyota Mark X': 'toyota-mark-x.jpg',
      'Land Cruiser V8': 'landcruiser-v8.jpg',
      'Mazda CX-5': 'mazda-cx5.jpg',
      'Nissan X-Trail': 'nissan-xtrail.jpg',
      'Nissan Teana': 'nissan-teana.jpg',
      'Range Rover': 'range-rover.jpg'
    };

    const carKey = `${make} ${model}`;
    return imageMap[carKey] || 'default-car.jpg';
  };

  const filteredBookings = bookings.filter(booking => 
    booking.car?.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.car?.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeBookings = filteredBookings.filter(b => ['pending', 'confirmed'].includes(b.status.toLowerCase()));
  const bookingHistory = filteredBookings.filter(b => ['completed', 'cancelled'].includes(b.status.toLowerCase()));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <button
          onClick={() => navigate('/cars')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Booking
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Active Bookings */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Active Bookings</h2>
          <div className="mt-4 space-y-4">
            {activeBookings.length === 0 ? (
              <p className="text-gray-500">No active bookings found.</p>
            ) : (
              activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/src/assets/${getCarImagePath(booking.car?.make || '', booking.car?.model || '')}`}
                      alt={`${booking.car?.make} ${booking.car?.model}`}
                      className="w-16 h-16 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/src/assets/alphard.jpg'; // Fallback to alphard as default
                      }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {booking.car?.make} {booking.car?.model}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.start_date).toLocaleDateString()} -{' '}
                        {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Total: KES {calculateTotalAmount(booking).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {booking.status}
                    </span>
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Booking History</h2>
          <div className="mt-4 space-y-4">
            {bookingHistory.length === 0 ? (
              <p className="text-gray-500">No booking history found.</p>
            ) : (
              bookingHistory.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/src/assets/${getCarImagePath(booking.car?.make || '', booking.car?.model || '')}`}
                      alt={`${booking.car?.make} ${booking.car?.model}`}
                      className="w-16 h-16 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/src/assets/alphard.jpg'; // Fallback to alphard as default
                      }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {booking.car?.make} {booking.car?.model}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.start_date).toLocaleDateString()} -{' '}
                        {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Total: KES {calculateTotalAmount(booking).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
