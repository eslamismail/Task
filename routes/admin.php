<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'Admin\LoginController@login');
Route::post('refresh', 'Admin\LoginController@refresh');
Route::group(['middleware' => ['auth:admin']], function () {
    Route::get('user', 'Admin\LoginController@user');
    Route::post('logout', 'Admin\LoginController@logout');
    Route::resource('users', 'Admin\UserController');
    Route::resource('customers', 'Admin\CustomerController');
    Route::resource('products', 'Admin\ProductController');
    Route::resource('jobs', 'Admin\JobController');
    Route::resource('services', 'Admin\ServiceController');
    Route::get('/ballance', 'Admin\BallanceController@index');
    Route::get('/ballance/{user}', 'Admin\BallanceController@user');
    Route::post('/ballance/{user}', 'Admin\BallanceController@chargeUser');
    Route::resource('orders', 'Admin\OrderController');
});
