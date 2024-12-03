import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();
  
  // Check if user is logged in and is an admin (role_id === 1)
  if (!user || user.role_id !== 1) {
    // Redirect to login if not authenticated, or to home if not admin
    return <Navigate to={!user ? '/login' : '/'} replace />;
  }

  return <>{children}</>;
};
