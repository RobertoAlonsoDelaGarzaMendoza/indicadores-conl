import React from "react";
import "./Dialog.css";

function Ronda_2() {
  return (
    <div className="informacion_dialogo">
      <h3>Bienvenido</h3>
      <p>
        A continuación se presentará una lista de indicadores cuyo propósito es
        medir el avance en el logro de las aspiraciones, los objetivos y las
        líneas estratégicas en temas específicos del Plan Estratégico de Nuevo
        León.
      </p>
      <p>Con base en su conocimiento y experiencia le pedimos que:</p>

      <ol>
        <li>
          Señale si considera <strong>-o no*-</strong> que el indicador
          propuesto reflejaría el avance en el logro de cada aspiración,
          objetivo o línea estratégica según corresponda.
        </li>
      </ol>
      <p>
        <strong>*Nota importante</strong> en dichos casos recuerde escribir los
        argumentos o razones de su elección.​
      </p>
    </div>
  );
}

export default Ronda_2;
