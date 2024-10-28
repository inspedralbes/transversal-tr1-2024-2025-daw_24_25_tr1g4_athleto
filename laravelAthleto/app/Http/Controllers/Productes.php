<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;

class Productes extends Controller
{
    public function getProductes()
    {
        // Obtiene todos los productos de la base de datos
        $productes = Producte::all();
        return response()->json($productes); // Devuelve los productos en formato JSON
    }
    public function addProductes(Request $request)
    {
        $producte = Producte::create($request->all());

        return response()->json($producte, 201);
    }

    public function mostrarProducte($id)
    {
        $producte = Producte::findOrFail($id);
        return response()->json($producte);
    }

    public function editProducte(Request $request, $id)
    {
        $producte = Producte::findOrFail($id);
        $producte->update($request->all());
        return response()->json("EDITADO CORRECTAMENTE");
    }

    public function remProducte($id)
    {
        Producte::destroy($id);
        return response()->json(null, 204);
    }

}
