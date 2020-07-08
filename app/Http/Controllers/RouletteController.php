<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use \SplFixedArray;

class RouletteController extends Controller
{
    private function cicle($times, $function) {
        $result = null;
        
        for ($i=0; $i < $times; $i++) { 
            $result = $function();
        }

        return $result;
    }

    public function getBet() {

        $users = Usuarios::where("dinero", ">", 0)->get();

        $roulette[] = [0, "green"];
        
        $red = []; 
        $black = [];

        for($i = 1; $i < 98; $i++){
            $red[] = $i++;
            $black[] = $i;
        }

        shuffle($red);
        shuffle($black);

        for ($i=0; $i < 49; $i++) { 
            $roulette[] = [$red[$i], "red"];
            $roulette[] = [$black[$i], "black"];
        }
        
        $roulette[] = ["00", "green"];

        dd($roulette);

        foreach ($users as $user) {

            $bet = $user->dinero;

            if($bet > 1000) {

                $func = function() {
                    return random_int(8, 15);
                };

                $percent = $this->cicle(10, $func);

                $bet = $bet * ($percent / 100);
            } else {
                $percent = 100;
            }

            $user->percent = $percent;
            $user->apuesta = $bet;
        }


        dd($users);
    }
}
