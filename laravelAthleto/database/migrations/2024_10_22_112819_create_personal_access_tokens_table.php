<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta la migración para crear la tabla 'personal_access_tokens'.
     */
    public function up(): void
    {
        // Crea la tabla 'personal_access_tokens' para almacenar tokens de acceso personal
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id(); 
            $table->morphs('tokenable'); 
            $table->string('name'); 
            $table->string('token', 64)->unique(); // Token único de acceso (máximo 64 caracteres)
            $table->text('abilities')->nullable(); // Habilidades o permisos del token
            $table->timestamp('last_used_at')->nullable(); // Marca de tiempo de la última vez que se utilizó el token
            $table->timestamp('expires_at')->nullable(); // Marca de tiempo de la fecha de expiración del token
            $table->timestamps(); 
        });
    }

    public function down(): void
    {
        // Elimina la tabla 'personal_access_tokens' si existe
        Schema::dropIfExists('personal_access_tokens');
    }
};
