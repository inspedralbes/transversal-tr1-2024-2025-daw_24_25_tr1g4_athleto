<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->id(); // Crea una columna de ID auto-incremental
            // Columna para almacenar el ID de la categoría
            $table->unsignedBigInteger('id_usuaris'); 
            $table->foreign('id_usuaris')
                  ->references('id')
                  ->on('usuaris')
                  ->onDelete('cascade'); 
            $table->decimal('preu_total'); 
            $table->string('estat'); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compras');
    }
};
