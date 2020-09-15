import React from "react";
import "./RondaPanel.css";
import Indicador from "./Objetivo";

function RondaPanel({ronda,indicadores}) {
  return (
    <div className="RondaPanel">
      <h2 className="usuario_informacion">Ronda {ronda.numero}</h2>
      <h3>{ronda.descripcion}</h3>
      <div className="indicadores_tabla">
        <h3>Objetivos del plan Nuevo León</h3>
        <h3>Estatus</h3>
      </div>
      {indicadores.map((indicador) => {
        return <Indicador key={indicador.id} objectivo={indicador} />;
      })}
    </div>
  );
}

export default RondaPanel;
