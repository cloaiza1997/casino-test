import React from "react";
import axios from "axios";
import { useGlobal, useState, useEffect } from "reactn";

export default function Roulette(){

  const [ globalState ] = useGlobal();
  const [ players, setPlayers ] = useState([]);
  const [ wheel, setWheel ] = useState();
  const [ bet, setBet ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);
  const [ title_winner, setTitleWinner ] = useState("");

  useEffect(() => {
    // createRoulette();
  }, []);
  /**
   * Genera una ruleta aleatoria
   */
  const createRoulette = (players) => {
    axios.get(globalState.url + "getRoulette").
    then(res => {
        // Se extrae la ruleta
        let roulette = res.data.roulette;
        let segments = [];
        // Se recorren los números de la ruleta para extraer el número y el color para agregar al arreglo de objetos del segmento
        roulette.map(color => {
            segments.push({
                'fillStyle': color[1],
                'text': color[0] + "",
                'textFillStyle': "white"
            });
        });
        console.log("wheel", players);
        let wheel = new Winwheel({
            'canvasId': 'canvas_roulette',
            'outerRadius': 170,
            'innerRadius': 120,
            'numSegments': segments.length, // Cantidad de elementos de la ruleta
            'segments': segments, // Elementos de la ruleta
            'lineWidth': 1,
            'textFontFamily': 'Verdana',
            'textFontSize': 16,
            'textOrientation': 'curved', // Ordenar el texto que esté en dirección del suelo
            'textAligment': 'outer',
            'animation': {
                'type': 'spinToStop',
                'duration': 1,
                'callbackFinished': () => message(wheel, players), // Después de terminar de girar
                'callbackAfter': () => drawIndicator(wheel), // Cada giro que hace
                'spins': 20
            }
        });
        drawIndicator(wheel);
        setWheel(wheel);
    });
  }
  const setWinners = async (players, selected) => {

    let number = selected.text; // Número ganador
    let color = (selected.fillStyle == "red") ? "Rojo" : (selected.fillStyle == "black") ? "Negro" : "Verde"; // Se obtiene el color
    let count = 0;
    let winners = [];
    // Se recorren todos los jugadores
    players.map(player => {
      let winner = false; 
      // Se valida si el jugador acertó en el número
      if(player.numero == number) {

        let ganancia = 0;

        if(color == "Verde") {
          ganancia = player.apuesta * 15;
        } else {
          ganancia = player.apuesta * 2;
        }

        player.ganancia = ganancia;

        winners.push(player);
        winner = true;
        count++;
      }
      
      player.ganador = winner;
    });

    await axios.post(globalState.url + "setWinners", winners);

    // Se limpia la tabla y actualiza
    setPlayers([]);
    setPlayers(players);
    // Mensaje de confirmación
    let message = "• Ha ganado el " + number + " " + color + "\n• Número de Ganadores: " + count;

    setTitleWinner(message);
    alert(message);
  }
  /**
   * Muestra el aviso del número ganador
   * @param {*} wheel Objeto de la ruleta
   */
  const message = (wheel, players) => {
    // Obtiene el número seleccionado
    let selected = wheel.getIndicatedSegment();

    setWinners(players, selected);
    // Reinicia la ruleta
    wheel.stopAnimation(false);
    // wheel.rotationAngle = 0;
    wheel.draw();
    drawIndicator(wheel);
    setBet(false);
    setDisabled(false);
  }
  /**
   * Dibuja el indicador sobre la ruleta
   * @param {*} wheel Objeto de la ruleta
   */
  const drawIndicator = (wheel) => {
    let ctx = wheel.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = 'yellow';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(170, 0);
    ctx.lineTo(230, 0);
    ctx.lineTo(200, 40);
    ctx.lineTo(171, 0);
    ctx.stroke();
    ctx.fill();
  }
  /**
   * Obtiene las apuestas de los jugadores
   */
  const getPlayers = () => {
    setDisabled(true);
    setPlayers([]);
    setTitleWinner("Genenando Apuesta ...");
    axios.get(globalState.url + "bet").
    then(res => {
      let players = res.data.players;
      setPlayers(players);
      
      if(players.length == 0) {
          setDisabled(false);
          setTitleWinner("No hay jugadores");
        } else {
          setBet(true);
          setTitleWinner("");
        }
        
        createRoulette(players);
    });
  }

  const startRoulette = () => {
    if(bet) {
      wheel.startAnimation();
    } else {
      alert("Realicen sus apuestas");
    }
  }


  return(
    <div>
      <button onClick={ () => globalState.func.changeView("users") }>Usuarios</button>
      <div>
        <h1 style={{ margin: 0 }}>{ title_winner }</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <h4>Jugadores <button onClick={ getPlayers } style={ { display: (disabled ? "none" : "initial") } }>Realizar apuesta</button></h4>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Jugador</th>
                <th>Porcentaje</th>
                <th>Valor</th>
                <th>Ganador</th>
                <th>Valor Ganado</th>
              </tr>
            </thead>
            <tbody>
              {
                players.map( (player, index) => (
                  <tr key={ index } style={ { background: (player.ganador) ? "yellow" : "none" } }>
                    <td style={{ background: player.color, padding: 5, color: "white" }}>
                      { player.numero }
                    </td>
                    <td>{ player.nombre }</td>
                    <td>{ player.porcentaje == 100 ? "All In" : player.porcentaje + "%"}</td>
                    <td>${ player.apuesta }</td>
                    <td>{ (player.ganador) ? "X" : "" }</td>
                    <td>{ player.ganancia }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div style={{ width: "50%" }}>
          <h4>Ruleta <button onClick={ startRoulette }>Girar</button></h4>
          <div>
            <canvas id="canvas_roulette" height="400" width="400"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
} 