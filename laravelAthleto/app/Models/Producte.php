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

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'cat_prod', 'id_producte', 'id_categoria');
    }
}