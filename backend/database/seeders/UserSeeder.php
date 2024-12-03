<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@erickmotors.co.ke',
            'password' => Hash::make('admin123'),
            'role_id' => 1, // Admin role
            'phone' => '+254700000000',
            'address' => 'Nairobi, Kenya',
            'is_active' => true,
        ]);

        // Create demo user
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role_id' => 2, // Regular user role
            'phone' => '+254711111111',
            'address' => 'Mombasa, Kenya',
            'is_active' => true,
        ]);
    }
}