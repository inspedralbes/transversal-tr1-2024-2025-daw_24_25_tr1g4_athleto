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
        Schema::create('cat_prod', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_categoria'); 
            $table->foreign('id_categoria')->references('id')->on('categories')->onDelete('cascade');
            $table->unsignedBigInteger('id_producte'); 
            $table->foreign('id_producte')->references('id')->on('productes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_prod');
    }
};
