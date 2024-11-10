<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Ejecuta la migración para crear la tabla 'categories'.
     */
    public function up(): void
    {
        // Crea la tabla 'categories' con columnas
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->timestamps();
        });
    }



    public function down(): void
    {
        // Elimina la tabla 'categories' si existe
        Schema::dropIfExists('categories');
    }
};
