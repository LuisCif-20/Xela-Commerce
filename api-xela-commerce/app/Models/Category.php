<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    protected $hidden = [
        'description',
        'created_at',
        'updated_at',
    ];

    public function publications() {
        return $this->hasMany(Publication::class); // Relación "tiene muchas"
    }

}
