<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Car;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getStats(): JsonResponse
    {
        // Get total cars (both available and unavailable, excluding deleted)
        $totalCars = Car::count();

        // Get active bookings (confirmed bookings that haven't ended yet)
        $activeBookings = Booking::where('status', 'confirmed')
            ->where('end_date', '>=', Carbon::now())
            ->count();

        // Get total revenue from all confirmed and completed bookings
        // Using raw SQL for precise calculation
        $totalRevenue = DB::table('bookings')
            ->whereIn('status', ['confirmed', 'completed'])
            ->select(DB::raw('COALESCE(SUM(total_price), 0) as total'))
            ->value('total');

        // Get total registered users (excluding admins)
        $totalUsers = User::where('role_id', 2)->count();

        // Get additional stats for detailed breakdown
        $stats = [
            'totalCars' => $totalCars,
            'activeBookings' => $activeBookings,
            'totalRevenue' => round($totalRevenue, 2),
            'totalUsers' => $totalUsers,
            'details' => [
                'cars' => [
                    'available' => Car::where('is_available', true)->count(),
                    'unavailable' => Car::where('is_available', false)->count(),
                ],
                'bookings' => [
                    'confirmed' => Booking::where('status', 'confirmed')->count(),
                    'completed' => Booking::where('status', 'completed')->count(),
                    'cancelled' => Booking::where('status', 'cancelled')->count(),
                ],
                'revenue' => [
                    'today' => DB::table('bookings')
                        ->whereIn('status', ['confirmed', 'completed'])
                        ->whereDate('created_at', Carbon::today())
                        ->sum('total_price'),
                    'thisMonth' => DB::table('bookings')
                        ->whereIn('status', ['confirmed', 'completed'])
                        ->whereYear('created_at', Carbon::now()->year)
                        ->whereMonth('created_at', Carbon::now()->month)
                        ->sum('total_price'),
                ],
                'users' => [
                    'active' => User::where('role_id', 2)
                        ->where('is_active', true)
                        ->count(),
                    'inactive' => User::where('role_id', 2)
                        ->where('is_active', false)
                        ->count(),
                ]
            ]
        ];

        return response()->json($stats);
    }
}
