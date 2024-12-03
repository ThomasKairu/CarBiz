<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    protected $fillable = [
        'make',
        'model',
        'year',
        'price_per_day',
        'image_url',
        'category',
        'seats',
        'transmission',
        'is_available',
        'features',
        'description',
    ];

    protected $casts = [
        'features' => 'array',
        'is_available' => 'boolean',
        'price_per_day' => 'decimal:2',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}