<?php
use App\Http\Controllers\Productes; 
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
   


Route::get("/productes", [Productes::class, "getProductes1"])->name('prod.index');

Route::get("/productes/crear", [Productes::class, "crearProductes"])->name('prod.create');



Route::post("/productes/add" ,[Productes::class, "addProductes"] )->name('prod.store');

Route::get("/productes/edit/{id}/edit" ,[Productes::class, "edit"] )->name('prod.edit');

Route::post("/productes/edit/{id}" ,[Productes::class, "editProducte"] )->name('prod.update');

Route::get("/productes/rem/{id}" ,[Productes::class, "remProducte"] )->name('prod.destroy');

Route::get("/productes/mostrar/{id}" ,[Productes::class, "mostrarProducte"] )->name('prod.show');

 