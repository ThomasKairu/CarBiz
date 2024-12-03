<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\API\CarController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AdminController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);
Route::get('/cars/{car}/availability', [CarController::class, 'checkAvailability']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // User profile routes
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::post('/user/profile-picture', [UserController::class, 'uploadProfilePicture']);
    
    // User routes
    Route::get('/user/bookings', [BookingController::class, 'index']);
    
    // Booking routes
    Route::apiResource('bookings', BookingController::class);
    
    // Admin routes
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::apiResource('cars', CarController::class)->except(['index', 'show']);
        Route::get('/admin/bookings', [BookingController::class, 'adminIndex']);
        Route::patch('/users/{user}/role', [UserController::class, 'updateRole']);
        Route::get('/admin/stats', [AdminController::class, 'getStats']);
        Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus']);
    });
});