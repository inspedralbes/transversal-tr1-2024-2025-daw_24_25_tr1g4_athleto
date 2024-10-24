<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta la migración para crear la tabla 'stock'.
     */
    public function up(): void
    {
        // Crea la tabla 'stock' para gestionar el inventario de productos
        Schema::create('stock', function (Blueprint $table) {
            $table->id(); 
            
            // Columna para almacenar el ID del producto
            $table->unsignedBigInteger('id_producte');
            $table->foreign('id_producte')
                  ->references('id')
                  ->on('productes')
                  ->onDelete('cascade'); 

            // Columna para el tamaño del producto 
            $table->string('mida');
            
            // Columna para el número de unidades disponibles
            $table->integer('stock')->default(0); 

            $table->timestamps(); 
        });
    }

    public function down(): void
    {
        // Elimina la tabla 'stock' si existe
        Schema::dropIfExists('stock');
    }
};
