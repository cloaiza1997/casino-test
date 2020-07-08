import React from 'react';
import { useGlobal } from "reactn";
import ReactDOM from 'react-dom';


export default function Home() {

    const [ globalState ] = useGlobal();

    return(
        <div>
            <div>
                <button onClick={ () => globalState.func.changeView("users") }>Usuarios</button>
            </div>
            <div>
                <button onClick={ () => globalState.func.changeView("roulette") }>Ruleta</button>
            </div>
        </div>
    );
}