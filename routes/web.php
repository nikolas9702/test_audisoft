<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('catalog', function () {
    return Inertia::render('catalog');
})->name('catalog');
