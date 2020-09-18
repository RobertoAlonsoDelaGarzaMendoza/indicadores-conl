import React from "react";
import { Link } from "react-router-dom";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";

function Rondas() {
  let usuario = {
    nombre: "M.C. Jorge Juvenal Campos",
    puesto: "Secretario de Agricultura del Estado de Nuevo León",
  };
  let padre = {
    descripcion: "Ronda de selección de indicadores",
    ruta: "/ronda",
  };
  let rondas = [
    {
      id: 1,
      nombre: "Ronda 1",
      estatus: 0,
    },
    {
      id: 2,
      nombre: "Ronda 2",
      estatus: 0,
    },
    {
      id: 3,
      nombre: "Ronda 3",
      estatus: 0,
    },
  ];
  return (
    <Panel>
      <UserHeader usuario={usuario} />
      <Lista
        nombre="Rondas"
        titulo="Lista de rondas"
        titulo_accion="Estado"
        padre={padre}
        filas={rondas}
      />
      <div className="bottom_button">
        <button className="Button morado">
          Documentación
        </button>
        <Link className="link_router" to="/">
          <button className="Button azul">Salir</button>
        </Link>
      </div>
    </Panel>
  );
}

export default Rondas;
