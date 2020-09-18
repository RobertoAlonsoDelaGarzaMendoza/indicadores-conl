import React from "react";
import "./Lista.css";
import Fila from "./Fila";

function Lista({padre,filas,nombre,titulo,titulo_accion}) {
  return (
    <div className="RondaPanel">
      <h2 className="usuario_informacion">{nombre}</h2>
      <div className="indicadores_tabla">
        <h3>{titulo}</h3>
        <h3>{titulo_accion}</h3>
      </div>
      {filas.map((fila) => {
        return <Fila padre={padre} key={fila.id} nombre={fila.nombre} estatus={fila.estatus}/>;
      })}
    </div>
  );
}

export default Lista;
