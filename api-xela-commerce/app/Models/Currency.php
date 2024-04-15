<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{

    use HasFactory;

    protected $fillable = [
        'quetzals',
        'ceibas',
        'penalization',
        'user_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

}
