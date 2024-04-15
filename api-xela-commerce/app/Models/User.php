<?php

namespace App\Models;

use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Tymon\JWTAuth\Contracts\JWTSubject as JWT;

class User extends Authenticatable implements JWT
{

    use HasFactory;

    protected $fillable = [
        'user_name',
        'password',
        'full_name',
        'birthdate',
        'profile_picture',
        'role_id'
    ];

    protected $hidden = [
        'password',
        'role_id'
    ];

    public function role() {
        return $this->belongsTo(Role::class);
    }

    public function currency() {
        return $this->hasOne(Currency::class);
    }

    protected $with = ['role'];

    protected static function boot () {
        parent::boot();
        static::saving(function ($user) {
            if ($user->isDirty('password')) {
                $user->password = Hash::make($user->password);
            }
        });
    }

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

}
