<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyTypeController;

use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderProductController;

use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('company', CompanyController::class);
Route::resource('company-type', CompanyTypeController::class);
Route::resource('order-status', OrderStatusController::class);
Route::resource('product', ProductController::class);

Route::get('order', [OrderController::class, 'index']);
Route::get('order/{id}', [OrderController::class, 'show']);
Route::post('order', [OrderController::class, 'store']);
Route::put('order/{id}', [OrderController::class, 'update']);
Route::delete('order/{id}', [OrderController::class, 'destroy']);

Route::post('order/{order_id}/product/{product_id}', [OrderController::class, 'addProduct']);
Route::delete('order/{order_id}/product/{product_id}', [OrderController::class, 'removeProduct']);

Route::post('register', [UserController::class, 'register']);
Route::put('user/{id}', [UserController::class, 'update']);
Route::post('login', [UserController::class, 'login']);

