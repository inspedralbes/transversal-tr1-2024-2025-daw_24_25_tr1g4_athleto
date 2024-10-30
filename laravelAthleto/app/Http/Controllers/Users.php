<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class Users extends Controller
{
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

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
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

    public function retornarDadesUsuari()
    {   
        if (!Auth::check()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $usuari = Auth::user();
        return response()->json(['usuari' => $usuari], 200);
    }
}
