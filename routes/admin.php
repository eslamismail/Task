<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'Admin\LoginController@login');
Route::post('refresh', 'Admin\LoginController@refresh');
Route::group(['middleware' => ['auth:admin']], function () {
    Route::get('user', 'Admin\LoginController@user');
    Route::post('logout', 'Admin\LoginController@logout');
    Route::get('/users/{id}/cart', 'Admin\UserController@cart');
    Route::resource('users', 'Admin\UserController');
    Route::resource('products', 'Admin\ProductController');
});
