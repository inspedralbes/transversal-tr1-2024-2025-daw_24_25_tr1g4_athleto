<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Categoria;
use App\Models\Producte;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

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
                'nom'=> $categoria['nom'],
            ]);
        }
        foreach ($data['productes'] as $key => $producte) {
            Producte::create([
                'nom'=> $producte['nom'],
                'descripcio'=> $producte['descripcio'],
                'preu'=> $producte['preu'],
                'imatge'=> $producte['imatge'],
                'actiu'=> $producte['actiu'],
            ]);
        }

        User::create([
            'nom'=> "example",
            'cognom'=> "siuu",
            'nom_usuari'=> "soyEjemplo",
            'email'=> "example@example.com",
            'contrasenya'=> "1234",
        ]);
    }
}
