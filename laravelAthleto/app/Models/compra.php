<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class compra extends Model
{    use HasFactory;
    protected $table = 'compras';
    
    protected $fillable = [
        'id',
        'id_usuaris',
        'preu_total', 
    ];
}
