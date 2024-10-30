<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController; 

Route::get('/', function () {
    return view('welcome');
});

// Rutas para el CRUD de categorías con nombres asignados
Route::get('/categories', [CategoriesController::class, 'index'])->name('categories.index');
Route::get('/categories/create', [CategoriesController::class, 'create'])->name('categories.create'); 
Route::post('/categories', [CategoriesController::class, 'store'])->name('categories.store'); 
Route::get('/categories/{id}', [CategoriesController::class, 'show'])->name('categories.show');
Route::get('/categories/{id}/edit', [CategoriesController::class, 'edit'])->name('categories.edit'); 
Route::post('/categories/{id}', [CategoriesController::class, 'update'])->name('categories.update'); 
Route::get('/categories/{id}', [CategoriesController::class, 'destroy'])->name('categories.destroy');
