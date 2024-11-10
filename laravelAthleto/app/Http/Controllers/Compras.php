<?php

namespace App\Http\Controllers;
use App\Models\compra;
use App\Models\Producte;
use App\Models\prod_compras;
use Illuminate\Http\Request;

class Compras extends Controller
{

    public function getComandes()
    {
        // Obtiene todos los productos de la base de datos
        $compras = compra::all();
        $compra_prod= prod_compras::whereIn('id_compras', $compras->pluck('id'))->get();
       
        $productes = Producte::all();
        
        $detallesCompras=[];      
        
    
        foreach ($compras as $compra) {
            $prod_compra = [];

            foreach ($compra_prod as $compra_pro) {
                if ($compra_pro['id_compras'] == $compra['id']) {
                    foreach ($productes as $produc) {
                        if ($compra_pro['id_productes'] == $produc['id']) {
                            $prod_compra[] = $produc;

                        }

                    }


                }

            }
            $detallesCompras[] = [
                'compra' => $compra,
                'producto' => $prod_compra,
                'mostrar' => false

            ];

        }
        $comanda = [
            'compras' => $detallesCompras
        ];


        //  return response()->json($productes); // Devuelve los productos en formato JSON
        return view('comd.index', compact('comanda'));
    }


    public function actualizarEstat($id, $estat)
    {
        $producte = compra::findOrFail($id);
        $producte->update(['estat' => $estat]);

        return redirect()->route('comd.index')->with('success', 'Producto eliminado con éxito.');

    }




    function guardarCompra(Request $request)
    {






        $compra = compra::create([
            'id_usuaris' => $request->input('id_user'),
            'preu_total' => $request->input('preu'),

        ]);

        foreach ($request->input('productes') as $producto) {

            prod_compras::create([
                'id_compras' => $compra->id,
                'id_productes' => $producto['id'],
                'preu' => $producto['preu'],
            ]);

        }

    }
}
