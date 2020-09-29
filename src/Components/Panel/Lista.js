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
      {loading ? (
        <Skeleton />
      ) : (
        filas.map((fila) => {
          let subfilas =fila.subfilas !==undefined ? fila.subfilas.map((subfila) => (
            <Fila
              subfila={true}
              key={subfila.id}
              nombre={subfila.nombre}
              estatus={subfila.estatus}
              link={subfila.link}
            />)):null
          return (
            <>
              <Fila
                key={fila.id}
                nombre={fila.nombre}
                estatus={fila.estatus}
                link={fila.link}
              />
              {subfilas}
            </>
          );
        })
      )}
    </div>
  );
}

export default Lista;
