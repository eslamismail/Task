<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Storage;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
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

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
        'avatar_name',
    ];

    protected $appends = [
        'avatar',
        'name',
    ];

    public function getAvatarAttribute()
    {
        if (Storage::disk('uploads')->exists($this->avatar_name)) {
            return url(Storage::disk('uploads')->url($this->avatar_name));
        }
        return url('avatar.png');
    }

    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

}
