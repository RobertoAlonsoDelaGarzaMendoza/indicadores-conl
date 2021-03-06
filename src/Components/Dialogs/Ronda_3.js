import { Typography } from "@material-ui/core";
import React from "react";
import "./Dialog.css";

function Ronda_3() {
  return (
    <div className="informacion_dialogo">
      <Typography variant="h6">Bienvenido</Typography>
      <Typography variant="body1" paragraph>
        A continuación se mostrará{" "}
        <strong>una serie de indicadores seleccionados</strong> por
        investigadores, expertos y tomadores de decisiones para la{" "}
        <strong>
          medición y la evaluación de las políticas impulsadas por el Consejo
          Nuevo León.
        </strong>
      </Typography>
      <Typography variant="body1" paragraph>
        Basado en su experiencia, le solicitamos que{" "}
        <strong>
          evalúe el desempeño futuro del estado en dichos indicadores
        </strong>
        , con el objetivo de trazar metas y rutas de acción para el cumplimiento
        de dichos escenarios.
      </Typography>
    </div>
  );
}

export default Ronda_3;
