import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/admin';
import { toast } from 'react-hot-toast';
import { DashboardStats } from './DashboardStats';
import { Clock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    activeBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getAdminStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const statsInterval = setInterval(fetchStats, 5 * 60 * 1000);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="mt-2 text-sm text-gray-600">
                Monitor your business performance and key metrics
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-gray-500" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{formatTime(currentTime)}</p>
                <p className="text-gray-500">{formatDate(currentTime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <DashboardStats stats={stats} isLoading={loading} />
        </div>

        {/* Additional dashboard sections can be added here */}
      </div>
    </div>
  );
};
