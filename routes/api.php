<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Any authenticated user (admin or user) - read-only
    Route::get('/students', [StudentController::class, 'index']);
    Route::get('/students/{student}', [StudentController::class, 'show']);

    // Admin only - write operations
    Route::middleware('admin')->group(function () {
        Route::post('/students', [StudentController::class, 'store']);
        Route::put('/students/{student}', [StudentController::class, 'update']);
        Route::patch('/students/{student}', [StudentController::class, 'update']);
        Route::delete('/students/{student}', [StudentController::class, 'destroy']);

        Route::put('/users/{user}', [AdminController::class, 'update']);
        Route::delete('/users/{user}', [AdminController::class, 'delete']);
    });
});
