import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Panel from "./Components/Panel/Panel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Indicador from "./Components/Ronda/Indicador";
import Rondas from "./Components/Panel/Rondas";
import Ronda from "./Components/Panel/Ronda";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/ronda">
            <Ronda />
          </Route>
          <Route path="/rondas">
            <Rondas />
          </Route>
          <Route path="/indicador">
            <Indicador type={"indicador"} />
          </Route>
          <Route path="/meta">
            <Indicador type={"meta"} />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
