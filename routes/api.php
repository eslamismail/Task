<?php

use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', 'UserController@user');
Route::post('refresh', 'UserController@refresh');
Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logout');
Route::post('register', 'UserController@register');

Route::get('products', 'ProductController@index');

Route::middleware('auth:api')->group(function () {
    Route::get('/cart', 'CartController@index');
    Route::post('/cart', 'CartController@addCart');
});
