<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria; // Importa el modelo Categoria

class Categories extends Controller
{
    // Mostrar todas las categorías
    public function index()
    {
        $categories = Categoria::all();
        return response()->json($categories);
    }

    // Mostrar una categoría por ID
    public function show($id)
    {
        $category = Categoria::find($id);
        if ($category) {
            return response()->json($category);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }

    // Crear una nueva categoría
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',  
        ]);

        $category = Categoria::create($validatedData);
        return response()->json($category, 201);
    }

    // Editar una categoría existente
    public function update(Request $request, $id)
    {
        $category = Categoria::find($id);
        if ($category) {
            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',  
            ]);

            $category->update($validatedData);
            return response()->json($category);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }

    // Eliminar una categoría
    public function destroy($id)
    {
        $category = Categoria::find($id);
        if ($category) {
            $category->delete();
            return response()->json(['message' => 'Category deleted successfully']);
        } else {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }
}
