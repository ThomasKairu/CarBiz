# Erick Motors - Car Rental System

A modern car rental system built with React, TypeScript, and Laravel.

## Features

- User Authentication & Authorization
- Car Listing and Details
- Booking Management
- User Profile Management
- Admin Dashboard
- Responsive Design

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- React Query
- Axios

### Backend
- Laravel
- MySQL
- Sanctum Authentication
- PHP 8.1+

## Prerequisites

- Node.js 16+
- PHP 8.1+
- Composer
- MySQL

## Installation

### Frontend Setup
1. Clone the repository
```bash
git clone [repository-url]
cd erickmotors
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
cp .env.example .env
```

4. Start development server
```bash
npm run dev
```

### Backend Setup
1. Navigate to the API directory
```bash
cd car-rental-api
```

2. Install dependencies
```bash
composer install
```

3. Create .env file
```bash
cp .env.example .env
```

4. Generate application key
```bash
php artisan key:generate
```

5. Run migrations and seeders
```bash
php artisan migrate --seed
```

6. Create storage link
```bash
php artisan storage:link
```

7. Start the server
```bash
php artisan serve
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=erickmotors
DB_USERNAME=[your-username]
DB_PASSWORD=[your-password]
```

## Default Admin Account
- Email: admin@erickmotors.com
- Password: admin123

## License
MIT License
