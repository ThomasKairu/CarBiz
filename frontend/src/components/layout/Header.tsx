import React, { useState } from 'react';
import { Car, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-700';
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ErickMotors</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/')} hover:text-blue-600 transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`${isActive('/cars')} hover:text-blue-600 transition-colors duration-200`}
            >
              Cars
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact')} hover:text-blue-600 transition-colors duration-200`}
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' ? (
                  <Link 
                    to="/admin" 
                    className={`${isActive('/admin')} hover:text-blue-600 transition-colors duration-200`}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/dashboard" 
                    className={`${isActive('/dashboard')} hover:text-blue-600 transition-colors duration-200`}
                  >
                    Dashboard
                  </Link>
                )}
                <span className="text-gray-700">Welcome, {user.name}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`${isActive('/')} hover:text-blue-600 transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className={`${isActive('/cars')} hover:text-blue-600 transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              <Link 
                to="/contact" 
                className={`${isActive('/contact')} hover:text-blue-600 transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <div className="space-y-2">
                  {user.role === 'admin' ? (
                    <Link 
                      to="/admin" 
                      className={`${isActive('/admin')} hover:text-blue-600 transition-colors duration-200`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link 
                      to="/dashboard" 
                      className={`${isActive('/dashboard')} hover:text-blue-600 transition-colors duration-200`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="text-gray-700">Welcome, {user.name}</div>
                  <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};