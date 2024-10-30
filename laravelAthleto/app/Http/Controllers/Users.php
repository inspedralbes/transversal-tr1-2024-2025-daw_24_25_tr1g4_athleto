<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


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
            //dd(auth()->user());
            $user = Auth::user();
            //dd(Auth::check());
            $accessToken = $user->createToken('Access Token')->plainTextToken;
            $cookie = cookie('access_token', $accessToken, 60, '/', null, false, true, false, 'Lax');
            //Auth::login($user);
            //$cookie = cookie('access_token', $accessToken, 60, '/', null, true, true, false, 'Lax');//menos estricto con lo del samesite

            //$user->makeHidden(['password']); //no hace falta ya que ya lo tengo en el modelo $hidden
            //dd(Auth::user());
            return response()->json([
                'missatge' => 'Inici de sessio exitos',
                'usuari' => $user,
                //'access_token'=> $accessToken,    
            ])->cookie($cookie);
        }
        return response()->json(['error' => 'Dades incorrectes'], 401);
    }

    public function login2(Request $request)
    {
        $credentials = [
            "email" => $request->email,
            "password" => $request->password,
        ];

        $remember = ($request->has('remember') ? true : false);

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
        }
    }

    protected function verificarUsuari()
    {
        return Auth::check();
    }

    public function retornarDadesUsuari()
    {   
        // dd(Auth::user());
        if (!Auth::check()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $usuari = Auth::user();
        return response()->json(['usuari' => $usuari], 200);
    }
}
