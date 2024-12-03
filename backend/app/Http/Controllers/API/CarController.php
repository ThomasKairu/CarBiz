<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Car::query();

        // Handle search
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('make', 'like', "%{$searchTerm}%")
                  ->orWhere('model', 'like', "%{$searchTerm}%")
                  ->orWhere('category', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Handle category filter
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Order by latest first
        $query->latest();

        // Get paginated results
        $cars = $query->paginate(10);

        return response()->json($cars);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price_per_day' => 'required|numeric|min:0',
            'category' => 'required|string|in:suv,mpv,compact,mid-size-suv',
            'seats' => 'required|integer|min:2|max:10',
            'transmission' => 'required|string|in:automatic,manual',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Set default values
        $data = $request->all();
        $data['is_available'] = true;
        $data['features'] = $request->features ?? [];

        $car = Car::create($data);

        return response()->json([
            'message' => 'Car created successfully',
            'data' => $car
        ], 201);
    }

    public function show(Car $car): JsonResponse
    {
        return response()->json($car);
    }

    public function update(Request $request, Car $car): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'make' => 'sometimes|string|max:255',
            'model' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer|min:1900|max:' . (date('Y') + 1),
            'price_per_day' => 'sometimes|numeric|min:0',
            'category' => 'sometimes|string|in:suv,mpv,compact,mid-size-suv',
            'seats' => 'sometimes|integer|min:2|max:10',
            'transmission' => 'sometimes|string|in:automatic,manual',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $car->update($request->all());

        return response()->json($car);
    }

    public function destroy(Car $car): JsonResponse
    {
        $car->delete();
        return response()->json(null, 204);
    }

    public function checkAvailability(Request $request, Car $car): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $isAvailable = !$car->bookings()
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date]);
            })
            ->exists();

        return response()->json([
            'available' => $isAvailable && $car->is_available,
        ]);
    }
}