import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { CarsPage } from './pages/CarsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminCarList } from './components/admin/AdminCarList';
import { AdminBookingList } from './components/admin/AdminBookingList';
import { UserLayout } from './components/user/UserLayout';
import { UserDashboard } from './components/user/UserDashboard';
import { UserBookings } from './components/user/UserBookings';
import { UserProfile } from './components/user/UserProfile';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminRoute } from './components/auth/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* User Routes */}
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <UserLayout>
                    <Routes>
                      <Route index element={<UserDashboard />} />
                      <Route path="bookings" element={<UserBookings />} />
                      <Route path="profile" element={<UserProfile />} />
                    </Routes>
                  </UserLayout>
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<AdminDashboard />} />
                      <Route path="cars" element={<AdminCarList />} />
                      <Route path="bookings" element={<AdminBookingList />} />
                    </Routes>
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* Catch all - 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;