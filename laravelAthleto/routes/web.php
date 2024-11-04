<?php
use App\Http\Controllers\Productes; 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController; 

Route::get('/', function () {
    return view('welcome');
});
<<<<<<< HEAD

// Rutas para el CRUD de categorías con nombres asignados
Route::get('/categories', [CategoriesController::class, 'index'])->name('categories.index');
Route::get('/categories/create', [CategoriesController::class, 'create'])->name('categories.create'); 
Route::post('/categories', [CategoriesController::class, 'store'])->name('categories.store'); 
Route::get('/categories/{id}', [CategoriesController::class, 'show'])->name('categories.show');
Route::get('/categories/{id}/edit', [CategoriesController::class, 'edit'])->name('categories.edit'); 
Route::post('/categories/{id}', [CategoriesController::class, 'update'])->name('categories.update'); 
Route::get('/categories/{id}', [CategoriesController::class, 'destroy'])->name('categories.destroy');
=======
   


Route::get("/productes", [Productes::class, "getProductesAdmin"])->name('prod.index');
Route::get("/productes/crear", [Productes::class, "crearProductes"])->name('prod.create');
Route::post("/productes/add" ,[Productes::class, "addProductes"] )->name('prod.store');
Route::get("/productes/edit/{id}/edit" ,[Productes::class, "edit"] )->name('prod.edit');
Route::post("/productes/edit/{id}" ,[Productes::class, "editProducte"] )->name('prod.update');
Route::get("/productes/rem/{id}" ,[Productes::class, "remProducte"] )->name('prod.destroy');
Route::get("/productes/mostrar/{id}" ,[Productes::class, "mostrarProducte"] )->name('prod.show');

 
>>>>>>> dev
