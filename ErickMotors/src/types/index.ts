export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price_per_day: number;
  daily_rate?: number; // Fallback for compatibility
  image_url: string;
  category: 'suv' | 'mpv' | 'compact' | 'mid-size-suv';
  seats: number;
  transmission: 'automatic' | 'manual';
  is_available: boolean;
  features: string[];
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  user_id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  car?: Car;
  user?: User;
}