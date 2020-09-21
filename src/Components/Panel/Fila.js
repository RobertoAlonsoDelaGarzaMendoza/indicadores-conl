import React from "react";
import "./Fila.css";
import { Link } from "react-router-dom";



function Fila({ nombre,estatus,link }) {

  return (
    <div className="Indicador">
      <div className="nombre">
        <a className="PanelUsuario_link">{nombre}</a>
      </div>

      <div className="estatus">
        {estatus === 2 ? (
          <button className="Button Completed" disabled>
            Completado
          </button>
        ) : (
          <Link className="link_router" to={link}>
            <button className={estatus ? "Button Proceso" : "Button"}>
              {estatus ? "En proceso" : "Completar"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Fila;
