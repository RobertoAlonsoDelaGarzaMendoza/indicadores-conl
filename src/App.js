import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Panel from "./Components/Panel/Panel";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Indicador from "./Components/Ronda/Indicador";
import Rondas from "./Components/Panel/Rondas";
import Ronda from "./Components/Panel/Ronda";
import PrivateRoute from "./Components/Helpers/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute exact path="/ronda/:id">
            <Ronda />
          </PrivateRoute>
          <PrivateRoute path="/rondas">
            <Rondas />
          </PrivateRoute>
          <Route exact path="/indicador/:tipo/:idIndicador">
            <Indicador type={"indicador"} />
          </Route>
          <PrivateRoute path="/meta/:tipo/:idIndicador">
            <Indicador type={"meta"} />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
