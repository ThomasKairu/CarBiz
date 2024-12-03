import React from 'react';
import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury car background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience Luxury Car Rental in Kenya
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Premium vehicles for any occasion. Discover our fleet of luxury cars, SUVs, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/cars">
                <Button size="lg" className="flex items-center gap-2">
                  View Our Fleet <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ErickMotors?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our premium car rental service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Safe & Reliable</h3>
              <p className="text-gray-600">
                All our vehicles undergo regular maintenance and safety checks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-full">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer service for peace of mind
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-full">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Fleet</h3>
              <p className="text-gray-600">
                Latest models from top manufacturers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your premium car rental today and enjoy the journey
          </p>
          <Link to="/cars">
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Browse Our Fleet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};