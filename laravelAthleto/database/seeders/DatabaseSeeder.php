<?php

namespace Database\Seeders;

use App\Models\User;
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
        $jsonFilePath = database_path('data.json'); // Asegúrate de la ruta correcta
        $jsonData = File::get($jsonFilePath); // Usar File para obtener el contenido del archivo
        $data = json_decode($jsonData, true); // Decodificar el JSON a un array

        //hacer foreach
        foreach ($data as $key => $value) {
            //el ->create([]);
        }
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
