<?php

namespace Database\Seeders;

use App\Models\Cat_prod;
use App\Models\User;
use App\Models\Categoria;
use App\Models\Producte;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $jsonFilePath = public_path('data.json'); // Asegúrate de la ruta correcta
        $jsonData = File::get($jsonFilePath); // Usar File para obtener el contenido del archivo
        $data = json_decode($jsonData, true); // Decodificar el JSON a un array

        //hacer foreach
        foreach ($data['categories'] as $key => $categoria) {
            Categoria::create([
                'nom' => $categoria['nom'],
            ]);
        }
        foreach ($data['productes'] as $key => $producte) {
            Producte::create([
                'nom' => $producte['nom'],
                'descripcio' => $producte['descripcio'],
                'preu' => $producte['preu'],
                'imatge' => $producte['imatge'],
                'actiu' => $producte['actiu'],
            ]);
        }

        foreach ($data['cat_prod'] as $key => $producte) {
            Cat_prod::create([
                'id' => $producte['id'],
                'id_producte' => $producte['id_producte'],
                'id_categoria' => $producte['id_categoria'],

            ]);
        }

        User::create([
            'nom' => "Example",
            'cognom' => "siuu",
            'nom_usuari' => "soyEjemplo",
            'email' => "example@example.com",
            'password' => Hash::make("1234"),
        ]);

        User::create([
            'nom' => "Benjamin",
            'cognom' => "Romero",
            'nom_usuari' => "soyAdmin",
            'email' => "admin@admin.com",
            'password' => Hash::make("4321"),
            'rol' => "1",
        ]);

        User::create([
            'nom' => "Agustin",
            'cognom' => "Noviello",
            'nom_usuari' => "soyEsclavo",
            'email' => "agus@agus.com",
            'password' => Hash::make("mussolini"),
            'rol' => "2",
        ]);
    }
}
