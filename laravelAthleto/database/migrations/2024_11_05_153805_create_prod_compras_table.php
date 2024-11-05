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
        Schema::create('prod_compras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_compras'); 
            $table->foreign('id_compras')
                  ->references('id')
                  ->on('compras')
                  ->onDelete('cascade'); 
            $table->unsignedBigInteger('id_productes'); 
            $table->foreign('id_productes')
                  ->references('id')
                  ->on('productes')
                  ->onDelete('cascade'); 
            $table->decimal('preu');       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prod_compras');
    }
};
