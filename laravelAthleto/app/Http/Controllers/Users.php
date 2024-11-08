<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class Users extends Controller
{
    public function getUsersAdmin()
    {
        // Obtiene todos los productos de la base de datos
        //$productes = Producte::all();
        $usuaris = User::all();
        //dd($productes);
      //  return response()->json($productes); // Devuelve los productos en formato JSON
         return view('users.index', compact('usuaris'));
    }

    public function findMail(Request $request)
    {
        $request->validate([
            'correu' => 'required|email',
        ]);

        $user = User::where('email', $request->input('correu'))->first();

        if ($user) {
            return response()->json([
                'missatge' => 'Usuario encontrado.',
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'missatge' => 'Usuario no encontrado.',
            ], 404);
        }
    }

    public function findName(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'email' => 'required|email'
        ]);
    
        $user = User::where('nom_usuari', $request->input('username'))
                    ->where('email', '!=', $request->input('email'))
                    ->first();

        if ($user) {
            return response()->json([
                'existeix' => true,
            ], 200);
        } else{
            return response()->json([
                'existeix' => false,
            ], 200);
        }
    }





    public function register(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'nom' => 'required|string',
            'cognom' => 'required|string',
            'nom_usuari' => 'required|string|unique:usuaris,nom_usuari',
            'email' => 'required|email|unique:usuaris,email',
            'password' => 'required|string',
        ]);

        User::create([
            'nom' => $request->input('nom'),
            'cognom' => $request->input('cognom'),
            'nom_usuari' => $request->input('nom_usuari'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'registrat' => true,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            //$accessToken = $user->createToken('Access Token')->plainTextToken;
            $accessToken = $user->createToken('Access Token', [], Carbon::now()->addMinutes(15))->plainTextToken;
            //$cookie = cookie('access_token', $accessToken, 60, '/', null, false, true, false, 'Lax');

            return response()->json([
                'missatge' => 'Inici de sessio exitos',
                'usuari' => $user,
                'access_token'=> $accessToken,    
            ]);
            //])->cookie($cookie);
        }
        return response()->json(['error' => 'Dades incorrectes'], 401);
    }

    public function verifyPassUser(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);
        
        // if (!Auth::check()) {
        //     return response()->json(['error' => 'No autenticado'], 401);
        // }
        $usuari = Auth::user();
        
        if (Hash::check($request->password, $usuari->password)) {
            return response()->json(['correcte' => true]);
        } else {
            return response()->json(['correcte' => false]);
        }
    }
    
    public function retornarDadesUsuari()
    {   
        // if (!Auth::check()) {
        //     return response()->json(['error' => 'No autenticado'], 401);
        // }

        $usuari = Auth::user();
        return response()->json(['usuari' => $usuari], 200);
    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        //dd($id);
        $request->validate([
            'nom' => 'required|string',
            'cognom' => 'required|string',
            'nom_usuari' => 'required|string|unique:usuaris,nom_usuari,' . $id,
            'email' => 'required|email|unique:usuaris,email,' . $id,
            'adreca' => 'required|string',
        ]);
        
        //dd($request->all());
        if (!Auth::check()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }
        
        $usuari = Auth::user();
        //dd($usuari);
        $usuari -> nom = $request->input('nom');
        $usuari -> cognom = $request->input('cognom');
        $usuari -> nom_usuari = $request->input('nom_usuari');
        $usuari -> adreca = $request->input('adreca');

        $usuari -> save();

        return response()->json([
            'actualitzat' => true,
            'missatge' => 'Usuari actualitzat correctament',
            'usuari' => $usuari,
        ]);
    }

    public function updatePass(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $usuari = Auth::user();

        if (Hash::check($request->password, $usuari->password)) {
            $usuari -> password = $request->input('newPassword');
            $usuari -> save();

            return response()->json(['updated' => true]);
        } else {
            return response()->json(['updated' => false]);
        }
    }

    public function edit($id)
    {
      $prod = User::find($id);
      return view('users.edit', compact('prod'));
    }


    public function editProducte(Request $request, $id)
    {
        $producte = User::findOrFail($id);
        $producte->update($request->all());
        return redirect()->route('users.index')->with('success', 'Producto editado con éxito.');
 
    }

    

    public function crearProductes(){
        
        return view(view: 'users.create');

    }

    public function addProductes(Request $request)
    {
        User::create([      'nom' => $request->input('nom'),
        'cognom' => $request->input('cognom'),
        'nom_usuari' => $request->input('nom_usuari'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
    ]);

        return redirect()->route('users.index')->with('success', 'Producto creado con éxito.');
    }

    public function remProducte($id)
    {
        User::destroy($id);
        return redirect()->route('users.index')->with('success', 'Producto eliminado con éxito.');

        
    }   





}
