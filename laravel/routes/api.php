<?php

use App\Http\Controllers\PlaceThumbnailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//
///*
//|--------------------------------------------------------------------------
//| API Routes
//|--------------------------------------------------------------------------
//|
//| Here is where you can register API routes for your application. These
//| routes are loaded by the RouteServiceProvider and all of them will
//| be assigned to the "api" middleware group. Make something great!
//|
//*/

use App\Http\Controllers\PlaceController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::resource('places', PlaceController::class);
Route::get('places',[PlaceController::class, 'index'])->name('place.index');
Route::post('places',[PlaceController::class, 'store'])->name('place.store');
Route::put('places/{id}',[PlaceController::class, 'update'])->name('place.update');
Route::delete('places/{id}',[PlaceController::class, 'destroy'])->name('place.destroy');

Route::get('places/thumbnail/{name}', [PlaceThumbnailController::class, 'get'])
    ->name('places.thumbnail');
