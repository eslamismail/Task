<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Storage;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, TranslatableContract
{
    use HasFactory, Notifiable;
    use Translatable;

    public $translatedAttributes = [
        'name',
    ];

    public $translationModel = 'App\Models\UsersTranslation';

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
        'age',
    ];

    public function getAgeAttribute()
    {
        $age = (new Carbon($this->birthdate))->diff()->y;
        $age .= ' years and ';
        $age .= (new Carbon($this->birthdate))->diff()->m;
        $age .= ' months and ';
        $age .= (new Carbon($this->birthdate))->diff()->d . ' days';
        return $age;
    }

    public function getAvatarAttribute()
    {
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
