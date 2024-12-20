<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $table = 'categories';

    protected $fillable = [
        'nom',
    ];


    public function productes()
    {
        return $this->belongsToMany(Producte::class, 'cat_prod', 'id_categoria', 'id_producte');
    }
}
