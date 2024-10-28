<?php

// Importa controlador Productes y clases Request y Route.
use App\Http\Controllers\Productes; 
use Illuminate\Http\Request;        
use Illuminate\Support\Facades\Route; 

// Ruta para obtener la información del usuario 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); 

// Ruta para obtener los productos.
Route::get("/productes", [Productes::class, "getProductes"]);

Route::post("/productes/add" ,[Productes::class, "addProductes"] );

Route::post("/productes/edit/{id}" ,[Productes::class, "editProducte"] );

Route::get("/productes/rem/{id}" ,[Productes::class, "remProducte"] );

Route::get("/productes/mostrar/{id}" ,[Productes::class, "mostrarProducte"] ); 
