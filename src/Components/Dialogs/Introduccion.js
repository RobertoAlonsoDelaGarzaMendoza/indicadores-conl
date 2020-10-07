import React from "react";
import logo from "../../Assets/nuevo_leon_logo.svg";
import "./Dialog.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Button,
  DialogActions,
  Typography,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Introduccion({ flag_open, handleClose }) {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={flag_open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <div className="Login_logo_section">
          <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="informacion_dialogo">
          <Typography variant="h4" gutterBottom align="left">
            Agradecemos su participación en este ejercicio colaborativo ...
          </Typography>

          <Typography variant="body1" paragraph>
            El ejercicio consta de tres etapas​
            <ul>
              <li>Ronda 1: fechas​</li>
              <li>Ronda 2: fechas​</li>
              <li>Ronda 3: fechas​</li>
            </ul>
          </Typography>

          <Typography variant="subtitle1">Anonimato...</Typography>

          <Typography variant="subtitle1">
            Conficencialidad y manejo de la informacion...
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="primary" onClick={handleClose}>
          ¡Empecemos!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Introduccion;
