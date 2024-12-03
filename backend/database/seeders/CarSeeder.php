<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            [
                'make' => 'Range Rover',
                'model' => 'Sport',
                'year' => 2023,
                'price_per_day' => 53000,
                'image_url' => 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800',
                'category' => 'suv',
                'seats' => 5,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Premium Sound', 'Leather Seats', 'Navigation', 'Panoramic Roof'],
                'description' => 'Luxury SUV with premium features and exceptional comfort.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'Landcruiser V8',
                'year' => 2023,
                'price_per_day' => 25000,
                'image_url' => 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800',
                'category' => 'suv',
                'seats' => 7,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['4x4', 'Cruise Control', 'Climate Control', 'Bluetooth'],
                'description' => 'Powerful and reliable SUV perfect for any terrain.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'Prado',
                'year' => 2023,
                'price_per_day' => 14000,
                'image_url' => 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800',
                'category' => 'suv',
                'seats' => 7,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['4x4', 'Cruise Control', 'Climate Control', 'Bluetooth'],
                'description' => 'Versatile SUV perfect for both city and off-road driving.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'Alphard',
                'year' => 2023,
                'price_per_day' => 10000,
                'image_url' => 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800',
                'category' => 'mpv',
                'seats' => 8,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Premium Audio', 'Power Doors', 'Leather Seats'],
                'description' => 'Luxurious MPV with exceptional comfort and space.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'Harrier',
                'year' => 2023,
                'price_per_day' => 15000,
                'image_url' => 'https://images.unsplash.com/photo-1581362716668-e747c45c3843?auto=format&fit=crop&w=800',
                'category' => 'mid-size-suv',
                'seats' => 5,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Backup Camera', 'Apple CarPlay', 'Android Auto', 'Lane Departure Warning'],
                'description' => 'Elegant mid-size SUV with premium features.',
            ],
            [
                'make' => 'Mazda',
                'model' => 'CX-5',
                'year' => 2023,
                'price_per_day' => 12000,
                'image_url' => 'https://images.unsplash.com/photo-1581362716668-e747c45c3843?auto=format&fit=crop&w=800',
                'category' => 'mid-size-suv',
                'seats' => 5,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Backup Camera', 'Apple CarPlay', 'Android Auto', 'Lane Departure Warning'],
                'description' => 'Sporty mid-size SUV with excellent handling.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'RAV4',
                'year' => 2023,
                'price_per_day' => 13500,
                'image_url' => 'https://images.unsplash.com/photo-1581362716668-e747c45c3843?auto=format&fit=crop&w=800',
                'category' => 'mid-size-suv',
                'seats' => 5,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Backup Camera', 'Apple CarPlay', 'Android Auto', 'Lane Departure Warning'],
                'description' => 'Perfect mid-size SUV for both city driving and weekend adventures.',
            ],
            [
                'make' => 'Nissan',
                'model' => 'X-Trail',
                'year' => 2023,
                'price_per_day' => 13000,
                'image_url' => 'https://images.unsplash.com/photo-1581362716668-e747c45c3843?auto=format&fit=crop&w=800',
                'category' => 'mid-size-suv',
                'seats' => 7,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Backup Camera', 'Apple CarPlay', 'Android Auto', 'Lane Departure Warning'],
                'description' => 'Versatile mid-size SUV with great cargo space.',
            ],
            [
                'make' => 'Nissan',
                'model' => 'Teana',
                'year' => 2023,
                'price_per_day' => 11000,
                'image_url' => 'https://images.unsplash.com/photo-1623869675781-80aa31012c98?auto=format&fit=crop&w=800',
                'category' => 'compact',
                'seats' => 5,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Bluetooth', 'USB Port', 'Cruise Control', 'Fuel Efficient'],
                'description' => 'Comfortable compact car with premium features.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'Mark X',
                'year' => 2023,
                'price_per_day' => 9000,
                'image_url' => 'https://images.unsplash.com/photo-1623869675781-80aa31012c98?auto=format&fit=crop&w=800',
                'category' => 'compact',
                'seats' => 5,
                'transmission' => 'automatic',
                'is_available' => true,
                'features' => ['Bluetooth', 'USB Port', 'Cruise Control', 'Fuel Efficient'],
                'description' => 'Sporty compact car with excellent performance.',
            ],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}