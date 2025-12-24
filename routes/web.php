<?php

use App\Http\Controllers\SitesController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SitesController::class, 'index'])->name('home');
Route::prefix('category')->group(function () {
    Route::post('/', [CategoriesController::class, 'store'])->name('store');
    Route::put('/{categories}', [CategoriesController::class, 'update'])->name('update');
    Route::delete('/{categories}', [CategoriesController::class, 'destroy'])->name('destroy');
});

Route::prefix('site')->group(function () {
    Route::post('/', [SitesController::class, 'store'])->name('site-store');
    Route::put('/{sites}', [SitesController::class, 'update'])->name('site-update');
    Route::delete('/{sites}', [SitesController::class, 'destroy'])->name('site-destroy');
});
