<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usu_prod', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_usuari'); 
            $table->foreign('id_usuari')->references('id')->on('usuaris')->onDelete('cascade');
            $table->unsignedBigInteger('id_producte'); 
            $table->foreign('id_producte')->references('id')->on('productes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usu_prod');
    }
};
