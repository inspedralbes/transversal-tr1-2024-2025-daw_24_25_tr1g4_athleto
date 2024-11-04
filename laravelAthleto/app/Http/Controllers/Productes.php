<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producte;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;
class Productes extends Controller
{
    public function getProductesAdmin()
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
        return redirect()->route('prod.index')->with('success', 'Producto eliminado con éxito.');
 
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



    public function getProductesByCategories(Request $request)
    {
       // Obtener los IDs de las categorías desde la consulta
       $ids_categoria = $request->query('ids');
  

       // Obtener los productos que pertenecen a ambas categorías
       $productes = DB::table('productes')
           ->join('cat_prod', 'productes.id', '=', 'cat_prod.id_producte')
           ->whereIn('cat_prod.id_categoria', $ids_categoria)
           ->groupBy('productes.id')
           ->havingRaw('COUNT(DISTINCT cat_prod.id_categoria) = 2') // Asegura que tenga ambas categorías
           ->select('productes.*')
           ->get();

       return response()->json($productes);
    }
    

    public function getProductesByCategory($id_categoria)
    {
        // Validar que la categoría existe
        $categoria = Categoria::find($id_categoria);
       

        // Obtener los productos que pertenecen a la categoría especificada
        $productes = Producte::join('cat_prod', 'productes.id', '=', 'cat_prod.id_producte')
            ->where('cat_prod.id_categoria', $id_categoria)
            ->select('productes.*')
            ->get();

        return response()->json($productes);
    }

}
