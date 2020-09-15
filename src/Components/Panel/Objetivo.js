import React from "react";
import "./Objetivo.css";
import { Link } from "react-router-dom";

function Objetivo({ objectivo }) {
  let { nombre, estatus } = objectivo;

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
          <Link className="link_router" to="/ronda">
            <button className={estatus ? "Button Proceso" : "Button"}>
              {estatus ? "En proceso" : "Completar"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Objetivo;
