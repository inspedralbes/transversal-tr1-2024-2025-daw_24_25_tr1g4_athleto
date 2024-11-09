<?php

// Importa controlador Productes y clases Request y Route.
use App\Http\Controllers\Compras;
use App\Http\Controllers\Productes; 
use App\Models\compra;
use Illuminate\Http\Request;
use App\Http\Controllers\Users; 
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\CategoriesController;


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
    Route::post("/verificarPass", [Users::class, "verifyPassUser"]);
    Route::get("/user", [Users::class, "retornarDadesUsuari"]);
    Route::post("/actualitzar", action: [Users::class, "update"]);
    Route::post("/actualitzarPass", action: [Users::class, "updatePass"]);
});


Route::post('/compra', [Compras::class, 'guardarCompra']);

Route::get('/categorias', [Productes::class, 'getProductesByCategories']);


Route::get('/categoria/{id_categoria}', [Productes::class, 'getProductesByCategory']);


Route::get('/mevesComandes/{id}', [Productes::class,'getMevesComandes']);


// Rutas para el CRUD de categorías
Route::get('/categories', [CategoriesController::class, 'index']);//funciona
Route::get('/categories/mostrar/{id}', [CategoriesController::class, 'show']);//funciona
Route::post('/categories/guardar', [CategoriesController::class, 'store']); //funciona
Route::post('/categories/actualizar/{id}', [CategoriesController::class, 'update']); //funciona
Route::get('/categories/eliminar/{id}', [CategoriesController::class, 'destroy']); //funciona


