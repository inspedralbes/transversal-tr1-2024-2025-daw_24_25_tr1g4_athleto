<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Ejecuta la migración para crear la tabla 'productes'.
     */
    public function up(): void
    {
        // Tabla 'productes' con las siguientes columnas
        Schema::create('productes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('descripcio');
            $table->decimal('preu');
            $table->string('imatge');
            $table->boolean('actiu')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Elimina la tabla 'productes' si existe
        Schema::dropIfExists('productes');
    }
};
