import React from "react";
import logo from "../../Assets/nuevo_leon_logo.svg";

import { Dialog, DialogTitle, DialogContent, Slide } from "@material-ui/core";
import Ronda1 from "./Ronda_1";
import Ronda2 from "./Ronda_2";
import Ronda3 from "./Ronda_3";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getInstruccion = (ronda) => {
  console.log(ronda);
  switch (ronda) {
    case "1":
      return <Ronda1 />;
    case "2":
      return <Ronda2 />;
    case "3":
      return <Ronda3 />;
    default:
      break;
  }
};

function Instruccion({ ronda, flag_open, handleClose }) {
  return (
    <Dialog
      fullScreen
      open={flag_open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle className="informacion">
        <h2 className="font-morado">Ronda {ronda}</h2>
        <h2 className="font-morado">Instrucciones</h2>
      </DialogTitle>
      <DialogContent className="informacion">
        {getInstruccion(ronda)}
        <div className="bottom_button">
          <button className="Button" onClick={handleClose}>
            entendido
          </button>
        </div>
        <div className="Login_logo_section">
          <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Instruccion;
