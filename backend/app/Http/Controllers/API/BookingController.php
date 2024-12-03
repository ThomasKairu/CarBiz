<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = $request->user()->isAdmin() 
            ? Booking::with(['user', 'car'])
            : $request->user()->bookings()->with('car');

        // Filter by status if provided
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $bookings = $query->latest()->paginate(15);

        return response()->json($bookings);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $car = Car::findOrFail($request->car_id);
        
        // Check if car is available for the selected dates
        $isAvailable = !$car->bookings()
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date]);
            })
            ->exists();

        if (!$isAvailable) {
            return response()->json([
                'message' => 'Car is not available for the selected dates'
            ], 422);
        }

        // Calculate total price
        $startDate = new \DateTime($request->start_date);
        $endDate = new \DateTime($request->end_date);
        $days = $startDate->diff($endDate)->days + 1;
        $totalPrice = $car->price_per_day * $days;

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $totalPrice,
            'notes' => $request->notes,
        ]);

        return response()->json($booking->load('car'), 201);
    }

    public function show(Booking $booking): JsonResponse
    {
        $this->authorize('view', $booking);
        return response()->json($booking->load(['car', 'user']));
    }

    public function update(Request $request, Booking $booking): JsonResponse
    {
        $this->authorize('update', $booking);

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|string|in:pending,confirmed,completed,cancelled',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking->update($request->only(['status', 'notes']));

        return response()->json($booking->load(['car', 'user']));
    }

    public function updateStatus(Request $request, Booking $booking): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:confirmed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking->status = $request->status;
        $booking->save();

        return response()->json(['message' => 'Booking status updated successfully']);
    }

    public function destroy(Booking $booking): JsonResponse
    {
        $this->authorize('delete', $booking);
        
        $booking->delete();
        return response()->json(null, 204);
    }
}