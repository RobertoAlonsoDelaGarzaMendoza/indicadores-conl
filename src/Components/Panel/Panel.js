import React from "react";
//import css and assets
import logo from "../../Assets/nuevo_leon_logo.svg";
import "./Panel.css";
//import components
import { Paper } from "@material-ui/core";

function Panel({ children }) {
  return (
    <div className="PanelUsuario">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
      </div>
      <Paper variant="outlined" className="panel_card">
        {children}
      </Paper>
    </div>
  );
}

export default Panel;
