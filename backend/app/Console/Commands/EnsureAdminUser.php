<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class EnsureAdminUser extends Command
{
    protected $signature = 'ensure:admin';
    protected $description = 'Ensure admin user exists';

    public function handle()
    {
        // Get admin role
        $adminRole = Role::where('slug', 'admin')->first();
        
        if (!$adminRole) {
            $this->error('Admin role not found. Please run migrations first.');
            return 1;
        }

        // Check if admin user exists
        $adminUser = User::where('email', 'admin@erickmotors.com')->first();

        if (!$adminUser) {
            // Create admin user
            User::create([
                'name' => 'Admin',
                'email' => 'admin@erickmotors.com',
                'password' => Hash::make('admin123'), // Change this in production
                'role_id' => $adminRole->id,
                'is_active' => true,
            ]);
            $this->info('Admin user created successfully.');
        } else {
            // Update existing admin user role if needed
            if ($adminUser->role_id !== $adminRole->id) {
                $adminUser->update(['role_id' => $adminRole->id]);
                $this->info('Admin user role updated successfully.');
            } else {
                $this->info('Admin user already exists with correct role.');
            }
        }

        return 0;
    }
}
