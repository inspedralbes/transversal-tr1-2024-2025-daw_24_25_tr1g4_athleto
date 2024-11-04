<?php

<<<<<<< HEAD
use App\Http\Controllers\Productes; 
use Illuminate\Http\Request;        
=======
// Importa controlador Productes y clases Request y Route.
use App\Http\Controllers\Productes;
use App\Http\Controllers\Users;
>>>>>>> dev
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\Categories;
use App\Http\Controllers\PostController;


// Ruta para obtener la información del usuario 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); 

// Ruta para obtener los productos.
<<<<<<< HEAD
Route::get("/productes", [Productes::class, "getProductes"]);

// Rutas para el CRUD de categorías
Route::get('/categories', [Categories::class, 'index']);//funciona
Route::get('/categories/mostrar/{id}', [Categories::class, 'show']);//funciona
Route::post('/categories/guardar', [Categories::class, 'store']); //funciona
Route::post('/categories/actualizar/{id}', [Categories::class, 'update']); //funciona
Route::get('/categories/eliminar/{id}', [Categories::class, 'destroy']); //funciona


=======
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
>>>>>>> dev
