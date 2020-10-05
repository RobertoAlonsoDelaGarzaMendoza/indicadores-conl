import { Divider, Drawer, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import React from "react";
import "./Menu.css";
import logo from "../../../Assets/nuevo_leon_logo.svg";


function Menu() {
  return (
    <Drawer variant="permanent" className="Drawer">
      <Toolbar />
      <img alt="logo_nuevo_leon" className="Login_logo" src={logo}></img>
      <Divider/>
      <List>
        <ListItem>
          <ListItemText primary="Usuarios"/>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary="Ejercicios"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Aspiraciones"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Objectivos"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Línea estrategica"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Ronda"/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Indicadores"/>
        </ListItem>

      </List>
    </Drawer>
  );
}

export default Menu;
