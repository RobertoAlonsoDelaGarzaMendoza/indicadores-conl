import {
  Dialog,
    DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";

import "./PropuestaForm.css";

function PropuestaForm({ flag_open, handleClose, propuestas, setPropuestas }) {
  const [nombre, setNombre] = useState("");
  const [razon, setRazon] = useState("");
  const [fuente, setFuente] = useState("");
  const [direccion, setDireccion] = useState("");

  const clearForm = () =>{
      setNombre('');
      setRazon('');
      setFuente('');
      setDireccion('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nombre && razon){
        setPropuestas([...propuestas,{
            id:propuestas.length+1,
            nombre:nombre,
            razon:razon,
            fuente:fuente,
            direccion
        }]);
        clearForm()
        handleClose()
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={flag_open}
      onClose={handleClose}
      className="propuesta_dialog"
    >
      <DialogTitle>Propuesta de nuevo indicador</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Qué otro indicador considera que deben incluirse?
        </DialogContentText>
        <form className="propuesta_dialog_form" onSubmit={handleSubmit}>
          <input
            id="nombre"
            name="nombre"
            value={nombre}
            required={true}
            placeholder="Nombre del indicador *"
            onChange={(e) => setNombre(e.target.value)}
          />
          <textarea
            id="razon"
            nombre="razon"
            value={razon}
            required={true}
            placeholder="¿Por qué incluir este nuevo indicador? *"
            onChange={(e) => setRazon(e.target.value)}
          ></textarea>
          <input
            id="fuente"
            name="fuente"
            value={fuente}
            required={false}
            placeholder="Fuente del indicador"
            onChange={(e) => setFuente(e.target.value)}
          />
          <input
            id="direccion"
            name="direccion"
            value={direccion}
            required={false}
            placeholder="Url o dirección donde podriamos encontrar informacion"
            onChange={(e) => setDireccion(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
          <button onClick={handleClose} className="Button">Cancelar</button>
          <button onClick={handleSubmit} className="Button azul">Guardar</button>
      </DialogActions>
    </Dialog>
  );
}

export default PropuestaForm;
