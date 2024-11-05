<?php

namespace App\Http\Controllers;
use App\Models\compra;
use App\Models\prod_compras;
use Illuminate\Http\Request;

class Compras extends Controller
{
    function guardarCompra(Request $request){

    


      $compra = compra::create([
            'id_usuaris' => $request->input('id_user'),
            'preu_total' => $request->input('preu'),
            
        ]);

       foreach ($request->input('productes') as $producto){

        prod_compras::create([
            'id_compras' => $compra->id,
            'id_productes' => $producto['id'], 
            'preu'=> $producto['preu'], 
        ]);

       }

    }
}
