import React from "react";
import logo from "../../Assets/nuevo_leon_logo.svg";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import Ronda1 from "./Ronda_1";
import Ronda2 from "./Ronda_2";
import Ronda3 from "./Ronda_3";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getInstruccion = (ronda) => {
  //console.log(ronda);
  switch (ronda) {
    case 1:
      return <Ronda1 />;
    case 2:
      return <Ronda2 />;
    case 3:
      return <Ronda3 />;
    default:
      break;
  }
};

function Instruccion({ ronda, flag_open, handleClose }) {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={flag_open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography variant="h4" color="primary" align="center">
          Ronda {ronda}
        </Typography>
        <Typography variant="h4" color="primary" align="center">
          Instrucciones
        </Typography>
      </DialogTitle>
      <DialogContent className="informacion">
        {getInstruccion(ronda)}
        <div className="Login_logo_section">
          <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
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

export default Instruccion;
