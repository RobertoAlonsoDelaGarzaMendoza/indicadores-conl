import React from "react";
import "./Fila.css";
import { Link } from "react-router-dom";

function Fila({ nombre, estatus, link, subfila = false }) {
  return (
    <div className={`Indicador ${subfila && "subfila"}`}>
      <div className="nombre">{nombre}</div>

      <div className="estatus">
        {link ? (
          estatus === 2 ? (
            <button className="Button Completed" disabled>
              Completado
            </button>
          ) : (
            <Link className="link_router" to={link}>
              <button className={estatus ? "Button Proceso" : "Button"}>
                {estatus ? "En proceso" : "Comenzar"}
              </button>
            </Link>
          )
        ) : null}
      </div>
    </div>
  );
}

export default Fila;
