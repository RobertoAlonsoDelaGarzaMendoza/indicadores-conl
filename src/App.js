import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Panel from "./Components/Panel/Panel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Ronda from "./Components/Ronda/Ronda";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/panel">
            <Panel />
          </Route>
          <Route path="/ronda">
            <Ronda type={""} />
          </Route>
          <Route path="/meta">
            <Ronda type={"meta"} />
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
