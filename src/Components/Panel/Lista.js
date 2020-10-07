import React from "react";
import "./Lista.css";
import Fila from "./Fila";
import Skeleton from "../Helpers/Skeleton";
import { Typography } from "@material-ui/core";

function Lista({ loading, filas, nombre, titulo, titulo_accion }) {
  return (
    <div className="RondaPanel">
      <Typography variant="h5">{nombre}</Typography>
      <div className="indicadores_tabla">
        <Typography variant="h6">{loading ? <Skeleton /> : titulo}</Typography>
        <Typography variant="h6">{loading ? <Skeleton /> : titulo_accion}</Typography>
      </div>
      {loading ? (
        <Skeleton />
      ) : filas.length ? (
        filas.map((fila) => {
          let subfilas =
            fila.subfilas !== undefined
              ? fila.subfilas.map((subfila) => (
                  <Fila
                    subfila={true}
                    key={subfila.id}
                    nombre={subfila.nombre}
                    estatus={subfila.estatus}
                    link={subfila.link}
                  />
                ))
              : null;
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
      ) : (
        <Typography variant="h6">Sin elementos</Typography>
      )}
    </div>
  );
}

export default Lista;
