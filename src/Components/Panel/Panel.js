import React from "react";
//import css and assets
import logo from "../../Assets/nuevo_leon_logo.svg";
import "./Panel.css";
//import components
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import Lista from "./Lista";
import Introduccion from "../Dialogs/Introduccion";

import axios from 'axios';
import API from '../../Restful/Api'

function Panel() {
  /* TODO descomentar cuando se tenga la informacion */
  //const [usuario,setUsuario] = useState();
  const [dialog_presentacion, setDialog_presentacion] = useState(true);

  const handleClickOpen = () => {
    setDialog_presentacion(true);
  };

  const handleClose = () => {
    setDialog_presentacion(false);
  };

  let usuario = {
    nombre: "M.C. Jorge Juvenal Campos",
    puesto: "Secretario de Agricultura del Estado de Nuevo León",
  };

  let ronda = {
    numero: 1,
    descripcion: "Ronda de selección de indicadores",
    ruta:"/ronda"
  };
  let indicadores = [
    {
      id: 1,
      nombre: "Asegurar la rendición de cuentas en el servicio público",
      estatus: 2,
    },
    {
      id: 2,
      nombre:
        "Garantizar el esclarecimiento de hechos, reparación del daño y las soluciones satisfactorias para la ciudadanía por parte de las instituciones responsables de la procuración de justicia​",
      estatus: 0,
    },
    {
      id: 3,
      nombre: "Asegurar la rendición de cuentas en el servicio público",
      estatus: 1,
    },
  ];
  return (
    <div className="PanelUsuario">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
      </div>
      <Paper variant="outlined" className="panel_card">
        <div className="panel_usuario_informacion">
          <div className="informacion">
            <h2 className="usuario_informacion">Bienvenido Usuario:</h2>
            <h2 className="usuario_informacion nombre">{usuario.nombre}</h2>
            <h2 className="usuario_informacion puesto"> {usuario.puesto}</h2>
          </div>
        </div>
        <Lista padre={ronda} filas={indicadores} />
        <div className="bottom_button">
          <button className="Button morado" onClick={handleClickOpen}>
            Documentación
          </button>
          <Link className="link_router" to="/">
            <button className="Button azul">Salir</button>
          </Link>
        </div>
      </Paper>
      <Introduccion
        flag_open={dialog_presentacion}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Panel;
