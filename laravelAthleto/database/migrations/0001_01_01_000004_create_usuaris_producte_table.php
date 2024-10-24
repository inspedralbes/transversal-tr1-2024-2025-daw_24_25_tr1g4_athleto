<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta la migración para crear la tabla 'usu_prod'.
     */
    public function up(): void
    {
        //Tabla 'usu_prod' para almacenar la relación entre usuarios y productos
        Schema::create('usu_prod', function (Blueprint $table) {
            $table->id(); 
            
            // Columna para almacenar el ID del usuario
            $table->unsignedBigInteger('id_usuari');
            $table->foreign('id_usuari')
                  ->references('id')
                  ->on('usuaris')
                  ->onDelete('cascade'); 

            // Columna para almacenar el ID del producto
            $table->unsignedBigInteger('id_producte');
            $table->foreign('id_producte')
                  ->references('id')
                  ->on('productes')
                  ->onDelete('cascade');

            $table->timestamps(); // Crea columnas 'created_at' y 'updated_at'
        });
    }

  
    public function down(): void
    {
        // Elimina la tabla 'usu_prod' si existe
        Schema::dropIfExists('usu_prod');
    }
};
