<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "amount",
        "category_id",
        "publication_id",
        "issuing_user_id",
        "receiving_user_id",
    ];

    protected $hidden = [
        "updated_at",
        "publication_id",
        "issuing_user_id",
        "receiving_user_id",
        "category_id"
    ];

    protected $with = ['publication:id,code,title,image', 'receivingUser:id,full_name', 'issuingUser:id,full_name', 'category:id,name'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function publication() {
        return $this->belongsTo(Publication::class);
    }

    public function receivingUser() {
        return $this->belongsTo(User::class);
    }

    public function issuingUser() {
        return $this->belongsTo(User::class);
    }

}
