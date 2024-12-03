# Erick Motors - Full Stack Car Rental System

A modern car rental system built with React (Frontend) and Laravel (Backend).

## Project Structure

```
erickmotors/
├── frontend/           # React TypeScript frontend
└── backend/           # Laravel PHP backend
```

## Quick Start

### Frontend Setup (React + TypeScript)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

## Deployment

This project is configured for deployment on Render.com

### Frontend Deployment
- Build Command: `npm install && npm run build`
- Start Command: `npm run preview`
- Environment Variables:
  ```
  VITE_API_URL=https://erickmotors-api.onrender.com/api
  ```

### Backend Deployment
- Build Command: `composer install`
- Start Command: `php artisan serve --port=$PORT`
- Environment Variables:
  ```
  APP_KEY=base64:your-key
  APP_ENV=production
  APP_DEBUG=false
  DB_CONNECTION=mysql
  DB_HOST=your-db-host
  DB_PORT=3306
  DB_DATABASE=erickmotors
  DB_USERNAME=your-username
  DB_PASSWORD=your-password
  ```

## Features

### User Features
- Browse available cars
- View car details and specifications
- Make car reservations
- Manage bookings
- Update profile and password
- Upload profile picture

### Admin Features
- Dashboard with statistics
- Manage car listings
- Handle bookings
- User management
- View revenue reports

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Query
- React Hook Form

### Backend
- Laravel 10
- MySQL
- Laravel Sanctum
- PHP 8.1+

## API Documentation

### Authentication Endpoints
- POST /api/register
- POST /api/login
- POST /api/logout

### User Endpoints
- GET /api/user
- PUT /api/user/profile
- PUT /api/user/password
- POST /api/user/profile-picture

### Car Endpoints
- GET /api/cars
- GET /api/cars/{id}
- POST /api/cars (Admin)
- PUT /api/cars/{id} (Admin)
- DELETE /api/cars/{id} (Admin)

### Booking Endpoints
- GET /api/bookings
- POST /api/bookings
- GET /api/bookings/{id}
- PUT /api/bookings/{id}/status (Admin)

## License
MIT License

## Authors
- Your Name
