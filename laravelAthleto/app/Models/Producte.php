<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producte extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'descripcio',
        'preu',
        'imatge',
        'actiu',
    ];
    
    protected $casts = [
        'actiu' => 'boolean',
    ];
}