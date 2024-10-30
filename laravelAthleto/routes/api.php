<?php

use App\Http\Controllers\Productes; 
use Illuminate\Http\Request;        
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\Categories;
use App\Http\Controllers\PostController;


// Ruta para obtener la información del usuario 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); 

// Ruta para obtener los productos.
Route::get("/productes", [Productes::class, "getProductes"]);

// Rutas para el CRUD de categorías
Route::get('/categories', [Categories::class, 'index']);//funciona
Route::get('/categories/mostrar/{id}', [Categories::class, 'show']);//funciona
Route::post('/categories/guardar', [Categories::class, 'store']); //funciona
Route::post('/categories/actualizar/{id}', [Categories::class, 'update']); //funciona
Route::get('/categories/eliminar/{id}', [Categories::class, 'destroy']); //funciona


