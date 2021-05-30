<?php

use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', 'UserController@user');
Route::post('refresh', 'UserController@refresh');
Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logout');
Route::post('register', 'UserController@register');

Route::get('products', 'ProductController@index');

Route::middleware('auth:api')->group(function () {
    Route::get('/cart', 'CartController@index');
    Route::post('/cart', 'CartController@addCart');
    Route::put('/cart', 'CartController@editCart');
    Route::delete('/cart/{id}', 'CartController@deleteCart');
});

route::get('users', function () {
    return User::get();
});
