<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Storage;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'image',
        'gallary',
    ];

    protected $hidden = [
        'image_name',
        'gallary_arr',
    ];

    public function getImageAttribute()
    {
        if (strpos($this->image_name, 'http') !== false) {
            return $this->image_name;
        }
        if (Storage::disk('uploads')->exists($this->image_name)) {
            return url(Storage::disk('uploads')->url($this->image_name));
        }
    }

    public function getGallaryAttribute()
    {
        $gallary = [];

        if (is_array(json_decode($this->gallary_arr))) {
            foreach (json_decode($this->gallary_arr) as $image) {
                if (Storage::disk('uploads')->exists($image)) {
                    $gallary[] = url(Storage::disk('uploads')->url($image));
                }
            }
        }
        return $gallary;

    }
}
