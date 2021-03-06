<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use \SplFixedArray;

class RouletteController extends Controller
{
    /**
     * Crea una ruleta nueva de 37 números, números entre 1 y 36 rojos y negros y el 0 verde
     */
    public function getRoulette() {
        // Primer elemento de la ruleta el 0 verde
        $roulette[] = [0, "green"];

        $red = [];
        $black = [];
        // Se organizan los arreglo enumerándolos, el rojo son los números impares y el negro los pares
        for ($i = 1; $i < 36; $i++) {
            $red[] = $i++;
            $black[] = $i;
        }
        // Reorganiza aleatoriamente el arreglo
        shuffle($red);
        shuffle($black);
        // Agrega los elementos a la ruleta, primero rojo impar y luego negro par
        for ($i = 0; $i < 18; $i++) {
            $roulette[] = [$red[$i], "red"];
            $roulette[] = [$black[$i], "black"];
        }

        return response()->json([
            "roulette" => $roulette
        ]);
    }
    /**
     * Obtiene las apuestas de los usuarios
     */
    public function getBet() {
        // Obtiene los usuarios que tienen dinero para apostar
        $users = Usuarios::where("dinero", ">", 0)->get();

        foreach ($users as $user) {
            // Obtiene el dinero para apostar
            $bet = $user->dinero;
            // + Más de 1000 apuesta entre el 8% y 15% | - Menor o igual que 1000 lo apuesta todo
            if($bet > 1000) {
                // Función anónima que obtiene números al azar entre 8 y 15
                $func = function() {
                    return random_int(8, 15);
                };
                // Genera el porcentaje de apuesta
                $percent = $this->cicle(10, $func);
                // Calcula el porcentaje de la apuesta
                $bet = $bet * ($percent / 100);
            } else {
                $percent = 100;
            }
            // Actualiza el dinero ya que el usuario ha apostado
            $user->dinero -= $bet; 
            $user->save();
            // Obtiene un número aleatorio de la ruleta
            $func = function () {
                return random_int(0, 37);
            };
            // Genera el número de la apuesta
            $user->numero = $this->cicle(10, $func);
            // Obtiene el color relacionado al número seleccionado
            $user->color = ($user->numero % 2 != 0) ? "red" : (($user->numero == 0) ? "green" : "black");

            $user->porcentaje = $percent; // porcentaje a apostar
            $user->apuesta = round($bet, 2); // Dinero a apostar
        }
        
        return response()->json([
            "players" => $users,
        ], 200);
    }

    /**
     * Ejecuta n veces una función anónima
     */
    private function cicle($times, $function) {

        $result = null;

        for ($i = 0; $i < $times; $i++) {
            $result = $function();
        }

        return $result;
    }

    /**
     * Almacena en la base de datos a los ganadores
     */
    public function setWinners(Request $request) {
        $winners = $request->all();
        // Recorre el arreglo de ganadores para actualizar su dinero en la base de datos
        foreach($winners as $winner) {
            $obj_winner = Usuarios::find($winner["id"]);
            
            if($obj_winner) {
                $obj_winner->dinero += $winner["ganancia"];
                $obj_winner->save();
            }     
        }
    }
}
