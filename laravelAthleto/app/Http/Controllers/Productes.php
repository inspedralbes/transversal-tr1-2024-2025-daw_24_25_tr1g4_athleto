<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;

class Productes extends Controller
{
    public function getProductes1()
    {
        // Obtiene todos los productos de la base de datos
        $productes = Producte::all();
      //  return response()->json($productes); // Devuelve los productos en formato JSON
         return view('prod.index', compact('productes'));
    }
    public function getProductes()
    {
        // Obtiene todos los productos de la base de datos
        $productes = Producte::all();
      //  return response()->json($productes); // Devuelve los productos en formato JSON
        return response()->json($productes);
    }

    public function addProductes(Request $request)
    {
        $producte = Producte::create($request->all());

        return redirect()->route('prod.index')->with('success', 'Producto eliminado con éxito.');
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


    public function crearProductes(){
        
        return view('prod.create');

    }
    public function edit($id)
    {
      $prod = Producte::find($id);
      return view('prod.edit', compact('prod'));
    }

    public function remProducte($id)
    {
        Producte::destroy($id);
        return redirect()->route('prod.index')->with('success', 'Producto eliminado con éxito.');

        
    }

}
