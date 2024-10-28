<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
}
