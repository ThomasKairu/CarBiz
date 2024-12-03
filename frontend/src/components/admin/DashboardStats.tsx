import React from 'react';
import { Car, Users, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface Stats {
  totalCars: number;
  activeBookings: number;
  totalRevenue: number;
  totalUsers: number;
  details?: {
    cars: {
      available: number;
      unavailable: number;
    };
    bookings: {
      confirmed: number;
      completed: number;
      cancelled: number;
    };
    revenue: {
      today: number;
      thisMonth: number;
    };
    users: {
      active: number;
      inactive: number;
    };
  };
}

interface DashboardStatsProps {
  stats: Stats;
  isLoading: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, isLoading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const statCards = [
    {
      title: 'Total Cars',
      value: stats.totalCars,
      icon: Car,
      color: 'from-blue-600 to-blue-400',
      lightColor: 'from-blue-100 to-blue-50',
      textColor: 'text-blue-600',
      details: stats.details ? [
        { label: 'Available', value: stats.details.cars.available },
        { label: 'Unavailable', value: stats.details.cars.unavailable }
      ] : [],
      growth: stats.details ? calculateGrowth(stats.details.cars.available, stats.details.cars.unavailable) : 0
    },
    {
      title: 'Active Bookings',
      value: stats.activeBookings,
      icon: Calendar,
      color: 'from-green-600 to-green-400',
      lightColor: 'from-green-100 to-green-50',
      textColor: 'text-green-600',
      details: stats.details ? [
        { label: 'Confirmed', value: stats.details.bookings.confirmed },
        { label: 'Completed', value: stats.details.bookings.completed }
      ] : [],
      growth: stats.details ? calculateGrowth(
        stats.details.bookings.confirmed + stats.details.bookings.completed,
        stats.details.bookings.cancelled
      ) : 0
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-purple-600 to-purple-400',
      lightColor: 'from-purple-100 to-purple-50',
      textColor: 'text-purple-600',
      details: stats.details ? [
        { label: 'Today', value: formatCurrency(stats.details.revenue.today) },
        { label: 'This Month', value: formatCurrency(stats.details.revenue.thisMonth) }
      ] : [],
      growth: stats.details ? calculateGrowth(stats.details.revenue.today, stats.details.revenue.thisMonth / 30) : 0
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-orange-600 to-orange-400',
      lightColor: 'from-orange-100 to-orange-50',
      textColor: 'text-orange-600',
      details: stats.details ? [
        { label: 'Active', value: stats.details.users.active },
        { label: 'Inactive', value: stats.details.users.inactive }
      ] : [],
      growth: stats.details ? calculateGrowth(stats.details.users.active, stats.details.users.inactive) : 0
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositiveGrowth = stat.growth >= 0;
        
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Background gradient decoration */}
            <div className="absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${stat.color}" />
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-xl bg-gradient-to-r ${stat.lightColor} p-3`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center space-x-1 ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveGrowth ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(stat.growth).toFixed(1)}%</span>
                </div>
              </div>

              {/* Main Value */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>

              {/* Details */}
              <div className="space-y-2">
                {stat.details.map((detail, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{detail.label}</span>
                    <span className="text-sm font-medium text-gray-900">{detail.value}</span>
                  </div>
                ))}
              </div>

              {/* Hover effect decoration */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
