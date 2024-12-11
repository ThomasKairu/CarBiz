import React, { useEffect } from 'react';
import { Car, CalendarRange, Clock, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Booking } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookings';
import { toast } from 'react-hot-toast';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeBookings, setActiveBookings] = React.useState<Booking[]>([]);
  const [bookingHistory, setBookingHistory] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  const calculateTotalAmount = (booking: Booking) => {
    if (!booking.car) return 'KES 0';
    
    const rate = booking.car.price_per_day || booking.car.daily_rate;
    if (!rate || !booking.start_date || !booking.end_date) return 'KES 0';
    
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return `KES ${(days * rate).toLocaleString()}`;
  };

  const getCarImagePath = (car?: { make: string; model: string }) => {
    if (!car) return 'alphard.jpg';
    
    // Normalize the make and model
    const make = car.make.toLowerCase().trim();
    const model = car.model.toLowerCase().trim();
    
    // Create the exact mapping based on the assets we have
    const carMapping: { [key: string]: string } = {
      'mazda cx-5': 'mazda-cx5.jpg',
      'nissan x-trail': 'nissan-xtrail.jpg',
      'toyota prado': 'toyota-prado.jpg',
      'toyota harrier': 'toyota-harrier.jpg',
      'toyota mark x': 'toyota-mark-x.jpg',
      'toyota rav4': 'toyota-rav4.jpg',
      'land cruiser': 'landcruiser-v8.jpg',
      'range rover': 'range-rover.jpg',
      'nissan teana': 'nissan-teana.jpg',
      'alphard': 'alphard.jpg'
    };

    // Get the exact key match
    const carKey = `${make} ${model}`;
    if (carMapping[carKey]) {
      return carMapping[carKey];
    }

    // Try matching just the model if make+model doesn't match
    if (carMapping[model]) {
      return carMapping[model];
    }

    // Default fallback
    return 'alphard.jpg';
  };

  const handleViewDetails = (booking: Booking) => {
    navigate(`/bookings/${booking.id}`);
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await bookingService.updateBooking(bookingId.toString(), { status: 'cancelled' });
      toast.success('Booking cancelled successfully');
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getUserBookings();
      console.log('Bookings response:', response); // Debug log
      
      // Handle the response data structure
      let bookings: Booking[] = [];
      if (Array.isArray(response)) {
        bookings = response;
      } else if (response?.data && Array.isArray(response.data)) {
        bookings = response.data;
      } else if (response?.bookings && Array.isArray(response.bookings)) {
        bookings = response.bookings;
      }
      
      console.log('Processed bookings:', bookings); // Debug log
      
      // Filter active and history bookings
      const active = bookings.filter(b => ['pending', 'confirmed'].includes(b.status.toLowerCase()));
      const history = bookings.filter(b => ['completed', 'cancelled'].includes(b.status.toLowerCase()));
      
      console.log('Active bookings:', active); // Debug log
      console.log('Booking history:', history); // Debug log
      
      setActiveBookings(active);
      setBookingHistory(history);
    } catch (error) {
      console.error('Failed to load bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderBookingCard = (booking: Booking) => (
    <div
      key={booking.id}
      className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <img
          src={new URL(`../../assets/${getCarImagePath(booking.car)}`, import.meta.url).href}
          alt={`${booking.car?.make} ${booking.car?.model}`}
          className="w-16 h-16 rounded-lg object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = new URL('../../assets/alphard.jpg', import.meta.url).href;
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
          <p className="text-sm font-semibold text-gray-700 mt-1">
            Total: {calculateTotalAmount(booking)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span 
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleViewDetails(booking)}
        >
          View Details
        </Button>
        {booking.status === 'pending' && (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => handleCancelBooking(booking.id)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">
          Manage your bookings and account settings from your personal dashboard.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Button
          className="flex items-center justify-center gap-2 h-20 text-lg"
          variant="outline"
          onClick={() => navigate('/cars')}
        >
          <Car className="h-6 w-6" />
          Browse Cars
        </Button>
        <Button
          className="flex items-center justify-center gap-2 h-20 text-lg"
          variant="outline"
          onClick={() => navigate('/dashboard/bookings')}
        >
          <CalendarRange className="h-6 w-6" />
          My Bookings
        </Button>
        <Button
          className="flex items-center justify-center gap-2 h-20 text-lg"
          variant="outline"
          onClick={() => navigate('/dashboard/profile')}
        >
          <Settings className="h-6 w-6" />
          Profile Settings
        </Button>
      </div>

      {/* Active Bookings */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Bookings</h2>
        <div className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <CalendarRange className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Bookings</h3>
              <p className="text-gray-500">You don't have any active bookings at the moment.</p>
              <Button
                className="mt-4"
                onClick={() => navigate('/cars')}
              >
                Book a Car
              </Button>
            </div>
          ) : (
            activeBookings.map(renderBookingCard)
          )}
        </div>
      </div>

      {/* Booking History */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Booking History</h2>
        <div className="space-y-4">
          {bookingHistory.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Booking History</h3>
              <p className="text-gray-500">Your completed and cancelled bookings will appear here.</p>
            </div>
          ) : (
            bookingHistory.map(renderBookingCard)
          )}
        </div>
      </div>
    </div>
  );
};
