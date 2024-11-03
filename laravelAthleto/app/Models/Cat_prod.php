<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;         

class Cat_prod extends Model
{

    use HasFactory;
    protected $table = 'cat_prod';

    protected $fillable = [
        'id',
        'id_producte',
        'id_categoria',
    ];

}
