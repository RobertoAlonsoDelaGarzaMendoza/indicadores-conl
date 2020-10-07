import { Typography } from "@material-ui/core";
import React from "react";
import "./Dialog.css";

function Ronda_1() {
  return (
    <div className="informacion_dialogo">
      <Typography variant="h6">Bienvenido</Typography>
      <Typography variant="body1" paragraph>
        A continuación se presentará una lista de indicadores cuyo propósito es
        medir el avance en el logro de las aspiraciones, los objetivos y las
        líneas estratégicas en temas específicos del Plan Estratégico de Nuevo
        León.
      </Typography>
      <Typography variant="body1" paragraph>
        Con base en su conocimiento y experiencia le pedimos que:
      </Typography>

      <Typography variant="body1" paragraph>
        <ol>
          <li>
            Señale si considera <strong>-o no*-</strong> que el indicador
            propuesto reflejaría el avance en el logro de cada aspiración,
            objetivo o línea estratégica según corresponda.
          </li>
          <li>
            Proponga indicadores <strong>adicionales*</strong> que no estén
            incluidos actualmente, pero que por por su relevancia deberían ser
            añadidos.​
          </li>
        </ol>
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>*Nota importante</strong> en dichos casos recuerde escribir los
        argumentos o razones de su elección.​
      </Typography>
    </div>
  );
}

export default Ronda_1;
