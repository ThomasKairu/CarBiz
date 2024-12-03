<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UpdateUserRole extends Command
{
    protected $signature = 'user:update-role {user_id} {role_id}';
    protected $description = 'Update a user\'s role';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $roleId = $this->argument('role_id');

        $user = User::find($userId);
        
        if (!$user) {
            $this->error('User not found!');
            return 1;
        }

        $user->update(['role_id' => $roleId]);
        $this->info("User {$user->email}'s role has been updated to role_id: {$roleId}");
        
        return 0;
    }
}
