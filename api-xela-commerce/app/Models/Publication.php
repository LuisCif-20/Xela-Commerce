<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'state',
        'price',
        'user_id',
        'description',
        'category_id'
    ] ;

    protected $hidden = [
        'created_at',
        'user_id'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function user() {
        return $this->belongsTo(User::class)->select('id', 'user_name', 'profile_picture')->withDefault();
    }

    protected $with = ['category', 'user'];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($publication) {
            do {
                $newCode = rand(10000000, 99999999);
            } while (Publication::where('code', $newCode)->exists());
            $publication->code = $newCode;

        });
    }

}
