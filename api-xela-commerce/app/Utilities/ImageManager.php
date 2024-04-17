<?php

namespace App\Utilities;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageManager
{
    public static function saveImage(UploadedFile $image, string $disk) {
        $extension = $image->extension();
        $name = time().'.'.$extension;
        $image->storeAs($disk, $name);
        return $name;
    }

    public static function updateImage(UploadedFile $image, string $disk, string $current_image) {    
        self::deleteImage($disk, $current_image);
        return self::saveImage($image, $disk);
    }

    public static function deleteImage(string $disk, string $image) {
        if (Storage::disk($disk)->exists($image) && $image !== 'default.png') {
            Storage::disk($disk)->delete($image);
        }
    }
}