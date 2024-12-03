<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class EnsureAdminRoleExists extends Migration
{
    public function up()
    {
        // Check if roles table exists
        if (!Schema::hasTable('roles')) {
            Schema::create('roles', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->timestamps();
            });
        }

        // Insert admin role if it doesn't exist
        DB::table('roles')->insertOrIgnore([
            'name' => 'Administrator',
            'slug' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert user role if it doesn't exist
        DB::table('roles')->insertOrIgnore([
            'name' => 'User',
            'slug' => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down()
    {
        // Don't remove roles in rollback as they might be referenced
    }
}
