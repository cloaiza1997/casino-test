<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsersController extends Controller
{

    public function index()
    {
        $users = Usuarios::all();

        return response()->json([
            "users" => $users
        ], 200);
    }

    public function create()
    {
        for ($i=0; $i < 20; $i++) { 
            $obj_user = new Usuarios();
            $obj_user->nombre = "Usuario {$i}";
            $obj_user->dinero = 10000;
            $obj_user->save();
        }
    }

    public function store(Request $request)
    {

        $user = new Usuarios();
        $user->nombre = $request["nombre"];
        $user->dinero = 10000;
        $success = $user->save();

        return response()->json([
            "success" => $success
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = Usuarios::find($id);
        $user->nombre = $request["nombre"];
        $user->dinero = $request["dinero"];
        $success = $user->save();

        return response()->json([
            "success" => $success
        ], 200);
    }

    public function destroy($id)
    {
        $user = Usuarios::find($id);
        $success = $user ? $user->delete() : true;

        return response()->json([
            "success" => $success
        ], 200);
    }
}
