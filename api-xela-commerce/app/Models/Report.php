<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        "reason",
        "user_id",
        "publication_id"
    ];

    protected $hidden = [
        "created_at",
        "user_id"
    ];

    public function user() {
        return $this->belongsTo(User::class)->select('id', 'user_name', 'profile_picture')->without('role');
    }

    public function publication() {
        return $this->belongsTo(Publication::class);
    }

}
