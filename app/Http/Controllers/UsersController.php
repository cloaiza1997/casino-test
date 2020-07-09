<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = Usuarios::all();

        return response()->json([
            "users" => $users
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        for ($i=0; $i < 20; $i++) { 
            $obj_user = new Usuarios();
            $obj_user->nombre = "Usuario {$i}";
            $obj_user->dinero = 10000;
            $obj_user->save();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Usuarios::find($id);
        $success = $user ? $user->delete() : true;

        return response()->json([
            "success" => $success
        ], 200);
    }
}
