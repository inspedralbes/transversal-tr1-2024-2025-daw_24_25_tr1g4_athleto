<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class prod_compras extends Model
{
    protected $table = 'prod_compras';
    
    protected $fillable = [
        'id_compras',
        'id_productes', 
        'preu', 
    ];

}
