import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Indicador from "./Components/Ronda/Indicador";
import Rondas from "./Components/Panel/Rondas";
import Ronda from "./Components/Panel/Ronda";
import PrivateRoute from "./Components/Helpers/PrivateRoute";
import { useSelector } from "react-redux";
import Admin from "./Components/Admin/Admin";
import CustomThemeProvider from "./MuiTheme/CustomThemeProvider";

function App() {
  const auth = useSelector((state) => state.isLogged);
  return (
    <CustomThemeProvider>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <PrivateRoute auth={auth} path="/ronda/:id">
              <Ronda />
            </PrivateRoute>
            <PrivateRoute auth={auth} path="/rondas">
              <Rondas />
            </PrivateRoute>
            <PrivateRoute auth={auth} path="/indicador/:tipo/:idIndicador">
              <Indicador tipo_ronda={"indicador"} />
            </PrivateRoute>
            <PrivateRoute auth={auth} path="/meta/:tipo/:idIndicador">
              <Indicador tipo_ronda={"meta"} />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </CustomThemeProvider>
  );
}

export default App;
