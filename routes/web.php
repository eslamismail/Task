<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('{path}', function (Request $request) {
    if (!$request->ajax()) {
        return file_get_contents(public_path('_nuxt/index.html'));
    } else {
        abort(404);
    }
})->where('path', '(.*)');
