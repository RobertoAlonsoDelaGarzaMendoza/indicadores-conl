import React from "react";
import { Link } from "react-router-dom";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";

function Ronda() {
  let usuario = {
    nombre: "M.C. Jorge Juvenal Campos",
    puesto: "Secretario de Agricultura del Estado de Nuevo León",
  };

  let padre = {
    ruta: "/indicador",
  };

  let aspiraciones = [
    {
      id: 1,
      nombre:
        "Nuevo León se distinguirá por garantizar un bienestar económico sostenible y equitativo​",
      estatus: 0,
    },
  ];
  let objectivos = [
    {
      id: 1,
      nombre:
        "Fortalecer la competitividad, rentabilidad, productividad y sostenibilidad de las Mipymes en Nuevo León​",
      estatus: 0,
    },
  ];
  let lineas_estrategicas = [
    {
      id: 1,
      nombre: "Facilitar la inclusión financiera para las mipymes​",
      estatus: 0,
    },
    {
      id: 2,
      nombre:
        "Promover la integración de las mipymes en las cadenas productivas",
      estatus: 0,
    },
    {
      id: 3,
      nombre: "Facilitar la apertura y operación de negocios​",
      estatus: 0,
    },
  ];

  return (
    <Panel>
      <UserHeader usuario={usuario} />
      <Lista
        titulo="Aspiración"
        titulo_accion="Estado"
        padre={padre}
        filas={aspiraciones}
      />
      <Lista
        titulo="Objectivo"
        titulo_accion="Estado"
        padre={padre}
        filas={objectivos}
      />
      <Lista
        titulo="Líneas estratégicas"
        titulo_accion="Estado"
        padre={padre}
        filas={lineas_estrategicas}
      />
      <div className="bottom_button">
        <button className="Button morado">Documentación</button>
        <Link className="link_router" to="/rondas">
          <button className="Button azul">Salir</button>
        </Link>
      </div>
    </Panel>
  );
}

export default Ronda;
