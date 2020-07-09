import React from "react";
import axios from "axios";
import { useGlobal, useState, useEffect } from "reactn";

export default function Roulette(){

  const [ globalState ] = useGlobal();
  const [ roulette, setRoulette ] = useState([]);
  const [ wheel, setWheel ] = useState();

  const getBet = () =>{
    axios.get(globalState.url + "bet").
    then(res => {
      setRoulette(res.data.roulette);
    });
  }

  useEffect(() => {
    // Genera una ruleta aleatoria
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
              'callbackFinished': () => message(wheel), // Después de terminar de girar
              'callbackAfter': () => drawIndicator(wheel), // Cada giro que hace
              'spins': 20
            }
        });
        drawIndicator(wheel);
        setWheel(wheel);
    });

  }, []);
  /**
   * Muestra el aviso del número ganador
   * @param {*} wheel Objeto de la ruleta
   */
  const message = (wheel) => {
    // Obtiene el número seleccionado
    let selected = wheel.getIndicatedSegment();
    // Valida el color
    let color = (selected.fillStyle == "red") ? "Rojo" : (selected.fillStyle == "black") ? "Negro" : "Verde";
    // Avisa
    alert("Ha ganado el " + selected.text + " " + color);
    // Reinicia la ruleta
    wheel.stopAnimation(false);
    wheel.rotationAngle = 0;
    wheel.draw();
    drawIndicator(wheel);
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

  return(
    <div>
      <button onClick={ () => globalState.func.changeView("home") }>Regresar</button>
      <div>
        <h4>Ruleta</h4>
        <div>
          <button onClick={ () => wheel.startAnimation() }>Girar</button>
          <canvas id="canvas_roulette" height="400" width="400"></canvas>
        </div>
      </div>
      <div>
        <h4>Jugadores</h4>
        <button onClick={ getBet }>Realizar apuesta</button>
      </div>
    </div>
  );
}