import React from "react";
import ReactDOM from 'react-dom';

import Users from "../Users";
import Roulette from "../Roulette";

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
    }
    ReactDOM.render(component, document.getElementById("app"));
  }
}