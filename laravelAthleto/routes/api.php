<?php

// Importa controlador Productes y clases Request y Route.
use App\Http\Controllers\Productes;
use App\Http\Controllers\Users;
use Illuminate\Support\Facades\Route; 

// Ruta para obtener la información del usuario 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); 

// Ruta para obtener los productos.
Route::get("/productes", action: [Productes::class, "getProductes"]);
Route::post("/buscarMail", action: [Users::class, "findMail"]);
Route::post("/register", action: [Users::class, "register"]);
Route::post("/login", action: [Users::class, "login"]);
Route::post("/username", action: [Users::class, "findName"]);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get("/user", [Users::class, "retornarDadesUsuari"]);
});


Route::get('/categorias', [Productes::class, 'getProductesByCategories']);


Route::get('/categoria/{id_categoria}', [Productes::class, 'getProductesByCategory']);
