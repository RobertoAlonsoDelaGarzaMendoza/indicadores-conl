import React from "react";
import "./Lista.css";
import Fila from "./Fila";
import Skeleton from "../Helpers/Skeleton";

function Lista({ loading, filas, nombre, titulo, titulo_accion }) {
  return (
    <div className="RondaPanel">
      <h2 className="usuario_informacion">{nombre}</h2>
      <div className="indicadores_tabla">
        <h3>{loading ? <Skeleton /> : titulo}</h3>
        <h3>{loading ? <Skeleton /> : titulo_accion}</h3>
      </div>
      {loading ? <Skeleton/> :filas.map((fila) => {
        return (
          <Fila
            key={fila.id}
            nombre={fila.nombre}
            estatus={fila.estatus}
            link={fila.link}
          />
        );
      })}
    </div>
  );
}

export default Lista;
