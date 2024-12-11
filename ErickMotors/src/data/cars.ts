import { Car } from '../types';

// Import car images
import rangeRover from '../assets/range-rover.jpg';
import landcruiserV8 from '../assets/landcruiser-v8.jpg';
import prado from '../assets/toyota-prado.jpg';
import alphard from '../assets/alphard.jpg';
import harrier from '../assets/toyota-harrier.jpg';
import mazdaCx5 from '../assets/mazda-cx5.jpg';
import xtrail from '../assets/nissan-xtrail.jpg';
import teana from '../assets/nissan-teana.jpg';
import markX from '../assets/toyota-mark-x.jpg';
import rav4 from '../assets/toyota-rav4.jpg';

export const cars: Car[] = [
  {
    id: '1',
    make: 'Range Rover',
    model: 'Sport',
    year: 2023,
    price: 53000,
    image: rangeRover,
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    available: true,
    features: ['Premium Sound', 'Leather Seats', 'Navigation', 'Panoramic Roof']
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Landcruiser V8',
    year: 2023,
    price: 25000,
    image: landcruiserV8,
    category: 'suv',
    seats: 7,
    transmission: 'automatic',
    available: true,
    features: ['4x4', 'Cruise Control', 'Climate Control', 'Bluetooth']
  },
  {
    id: '3',
    make: 'Toyota',
    model: 'Prado',
    year: 2023,
    price: 14000,
    image: prado,
    category: 'suv',
    seats: 7,
    transmission: 'automatic',
    available: true,
    features: ['4x4', 'Cruise Control', 'Climate Control', 'Bluetooth']
  },
  {
    id: '4',
    make: 'Toyota',
    model: 'Alphard',
    year: 2023,
    price: 10000,
    image: alphard,
    category: 'mpv',
    seats: 8,
    transmission: 'automatic',
    available: true,
    features: ['Power Doors', 'Leather Seats', 'Climate Control', 'Premium Sound']
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Harrier',
    year: 2023,
    price: 15000,
    image: harrier,
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    available: true,
    features: ['Sunroof', 'Leather Seats', 'Navigation', 'Bluetooth']
  },
  {
    id: '6',
    make: 'Mazda',
    model: 'CX-5',
    year: 2023,
    price: 12000,
    image: mazdaCx5,
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    available: true,
    features: ['Bose Sound', 'Leather Seats', 'Navigation', 'Sunroof']
  },
  {
    id: '7',
    make: 'Nissan',
    model: 'X-Trail',
    year: 2023,
    price: 13000,
    image: xtrail,
    category: 'suv',
    seats: 7,
    transmission: 'automatic',
    available: true,
    features: ['360 Camera', 'Push Start', 'Climate Control', 'Bluetooth']
  },
  {
    id: '8',
    make: 'Nissan',
    model: 'Teana',
    year: 2023,
    price: 11000,
    image: teana,
    category: 'sedan',
    seats: 5,
    transmission: 'automatic',
    available: true,
    features: ['Keyless Entry', 'Leather Seats', 'Climate Control', 'Cruise Control']
  },
  {
    id: '9',
    make: 'Toyota',
    model: 'Mark X',
    year: 2023,
    price: 9000,
    image: markX,
    category: 'sedan',
    seats: 5,
    transmission: 'automatic',
    available: true,
    features: ['Sport Mode', 'Push Start', 'Climate Control', 'Premium Sound']
  },
  {
    id: '10',
    make: 'Toyota',
    model: 'RAV4',
    year: 2023,
    price: 13500,
    image: rav4,
    category: 'suv',
    seats: 5,
    transmission: 'automatic',
    available: true,
    features: ['AWD', 'Apple CarPlay', 'Safety Sense', 'Sunroof']
  }
];