import React from "react";
import logo from "../../Assets/nuevo_leon_logo.svg";
import "./Dialog.css";

import { Dialog, DialogTitle, DialogContent, Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Introduccion({ flag_open, handleClose }) {
  return (
    <Dialog
      fullScreen
      open={flag_open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <div className="Login_logo_section">
          <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
        </div>
      </DialogTitle>
      <DialogContent className="informacion">
        <div className="informacion_dialogo">
          <h2>
            Agradecemos su participación en este ejercicio colaborativo ...
          </h2>
          <p>El ejercicio consta de tres etapas​</p>
          <ul>
            <li>Ronda 1: fechas​</li>
            <li>Ronda 2: fechas​</li>
            <li>Ronda 3: fechas​</li>
          </ul>
          <h3>Anonimato...</h3>

          <h3>Conficencialidad y manejo de la informacion...</h3>
        </div>
        <div className="bottom_button">
          <button className="Button" onClick={handleClose}>
            ¡Empecemos!
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Introduccion;
