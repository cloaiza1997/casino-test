import React from 'react';
import { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import Home from "./Home";
import GlobalState from "./config/GlobalState";
import Router from "./router/Router";

import Roulette from "./Roulette";
import Users from "./Users";

setGlobal(GlobalState);

ReactDOM.render(
  <React.StrictMode>
    <Roulette />
  </React.StrictMode>,
  document.getElementById('app')
);
