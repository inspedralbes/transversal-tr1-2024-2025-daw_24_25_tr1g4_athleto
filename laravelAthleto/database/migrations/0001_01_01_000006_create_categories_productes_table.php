<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta la migración para crear la tabla 'cat_prod'.
     */
    public function up(): void
    {
        // Crea la tabla 'cat_prod' para establecer la relación entre categorías y productos
        Schema::create('cat_prod', function (Blueprint $table) {
            $table->id(); 

            // Columna para almacenar el ID de la categoría
            $table->unsignedBigInteger('id_categoria'); 
            $table->foreign('id_categoria')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade'); 

            // Columna para almacenar el ID del producto
            $table->unsignedBigInteger('id_producte'); 
            $table->foreign('id_producte')
                  ->references('id')
                  ->on('productes')
                  ->onDelete('cascade');
        });
    }

  
    public function down(): void
    {
        // Elimina la tabla 'cat_prod' si existe
        Schema::dropIfExists('cat_prod');
    }
};
