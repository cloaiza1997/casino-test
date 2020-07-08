import React from "react";
import axios from "axios";
import { useGlobal } from "reactn";

export default function Roulette(){

  const [ globalState ] = useGlobal();

  const getBet = () =>{
    axios.get(globalState.url + "bet");
  }

  return(
    <div>
      <button onClick={ () => globalState.func.changeView("home") }>Regresar</button>
      <h2>Ruleta</h2>
      <button>Realizar apuesta</button>
      <div>
        <h4>Jugadores</h4>
        <button onClick={ getBet }>Realizar apuesta</button>
      </div>
    </div>
  );
}