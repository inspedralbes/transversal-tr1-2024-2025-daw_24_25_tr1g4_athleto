<?php

namespace App\Models;

// Importamos las clases necesarias
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;             

// Definimos la clase Categoria, defiende de Model
class Categoria extends Model
{

    use HasFactory;
    protected $table = 'categories';
    
    protected $fillable = [
        'nom',
    ];
}
