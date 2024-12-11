import React from 'react';
import { Car, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold">ErickMotors</span>
            </div>
            <p className="text-gray-400">
              Your trusted car rental service in Kenya. Quality vehicles at competitive prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/cars" className="text-gray-400 hover:text-white">Cars</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-400">+254 799 555 555</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-400">info@erickmotors.co.ke</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 8am - 6pm</li>
              <li>Saturday: 9am - 5pm</li>
              <li>Sunday: 10am - 4pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ErickMotors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};