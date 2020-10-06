import React from "react";
import Header from "../Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

function Admin() {
  let { path, url } = useRouteMatch();
  return (
    <div>
        <Switch>
          <Route exact path={path}>
            Login
          </Route>
          <Route path={`${path}/usuario`}>Usuarios</Route>
          <Route path={`${path}/ejercicio`}>Ejercicios</Route>
          <Route path={`${path}/objetivo`}>Objetivos</Route>
          <Route path={`${path}/aspiracion`}>Aspiraciones</Route>
          <Route path={`${path}/ronda`}>Rondas</Route>
        </Switch>
    </div>
  );
}

export default Admin;
