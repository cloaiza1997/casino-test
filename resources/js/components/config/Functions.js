import React from "react";
import ReactDOM from 'react-dom';

import Home from "../Home";
import Roulette from "../Roulette";
import Users from "../Users";

export default class Functions extends React.Component {
  changeView (view) {
    let component = "";
    switch (view) {
      case "roulette":
        component = <Roulette/>;
      break;
      case "users":
        component = <Users/>;
        break;
      case "home":
        component = <Home/>;
      break;
    }
    ReactDOM.render(component, document.getElementById("app"));
  }
}