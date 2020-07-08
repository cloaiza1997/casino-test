import React from "react";
import {
    BrowserRouter, // Toda la funcionalidad del router
    Route, // Todas las rutas definidas
    Switch, // Cambiar entre rutas
    useLocation,
    useHistory
} from "react-router-dom";

import Home from "../Home";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/users" component={Home} /> */}
      {/* <Route path="/otra_ruto" component={Componente} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;