<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Storage;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'avatar',
    ];

    public function getAvatarAttribute()
    {
        if (strpos($this->avatar_name, 'http') !== false) {
            return $this->avatar_name;
        }
        if (Storage::disk('uploads')->exists($this->avatar_name)) {
            return url(Storage::disk('uploads')->url($this->avatar_name));
        }
        return url('avatar.png');
    }

    public function carts()
    {
        return $this->hasManyThrough(CartProduct::class, Cart::class)->with('product');
    }
}
