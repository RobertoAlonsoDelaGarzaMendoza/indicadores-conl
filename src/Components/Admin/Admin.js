import React from "react";
import Header from "../Header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Menu from "./Menu/Menu";
import LoginAdmin from "./LoginAdmin/LoginAdmin";
import AdminContainer from "../Helpers/AdminContainer";

function Admin() {
  let { path, url } = useRouteMatch();
  return (
    <div>
      {/* TODO validacion para mostrar drawer si ya esta logeado y es admin */}
      {false ? <Menu /> : null}
      <Switch>
        <Route exact path={path}>
          <LoginAdmin />
        </Route>
        <Route path={`${path}/usuario`}>
          <AdminContainer>Usuarios</AdminContainer>
        </Route>
        <Route path={`${path}/ejercicio`}>
          <AdminContainer>Ejercicios</AdminContainer>
        </Route>
        <Route path={`${path}/objetivo`}>
          <AdminContainer>Objectivos</AdminContainer>
        </Route>
        <Route path={`${path}/aspiracion`}>
          <AdminContainer>Aspiraciones</AdminContainer>
        </Route>
        <Route path={`${path}/ronda`}>
          <AdminContainer>Rondas</AdminContainer>
        </Route>
        <Route path={`${path}/indicadores`}>
          <AdminContainer>Indicadores</AdminContainer>
        </Route>
      </Switch>
    </div>
  );
}

export default Admin;
