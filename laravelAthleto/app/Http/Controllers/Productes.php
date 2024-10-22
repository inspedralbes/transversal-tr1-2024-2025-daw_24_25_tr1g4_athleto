<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Productes extends Controller
{
    public function getProductes()
    {
        // Obtiene todos los productos de la base de datos
        /*$productes = Producte::all();

        return response()->json($productes); // Devuelve los productos en formato JSON*/
    }
}
