import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Location</h3>
            <p className="text-gray-600 mt-1">
              Nairobi, Kenya<br />
              Business District
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600 mt-1">+254 799 555 555</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600 mt-1">info@erickmotors.co.ke</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">Business Hours</h3>
            <ul className="text-gray-600 mt-1 space-y-1">
              <li>Monday - Friday: 8am - 6pm</li>
              <li>Saturday: 9am - 5pm</li>
              <li>Sunday: 10am - 4pm</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Emergency Support</h3>
        <p className="text-blue-700">
          24/7 roadside assistance available for all our customers.
        </p>
      </div>
    </div>
  );
};