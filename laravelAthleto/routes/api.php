<?php

// Importa controlador Productes y clases Request y Route.
use App\Http\Controllers\Productes;
use App\Http\Controllers\Users;
use Illuminate\Http\Request;        
use Illuminate\Support\Facades\Route; 

// Ruta para obtener la información del usuario 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); 

// Ruta para obtener los productos.
Route::get("/productes", [Productes::class, "getProductes"]);
Route::get("/user", [Users::class, "retornarDadesUsuari"]);
Route::post("/buscarMail", [Users::class, "findMail"]);
Route::post("/login", [Users::class, "login"]);