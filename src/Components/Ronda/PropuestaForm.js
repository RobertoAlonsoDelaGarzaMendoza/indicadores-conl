import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";

import "./PropuestaForm.css";

function PropuestaForm({
  idIndicador,
  tipo,
  flag_open,
  handleClose,
  propuestas,
  setPropuestas,
}) {
  const [nombre, setNombre] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [fuente, setFuente] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setNombre("");
    setJustificacion("");
    setFuente("");
    setUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && justificacion) {
      // console.log("tipo >>>", tipo);
      setPropuestas([
        ...propuestas,
        {
          id: null,
          nombre,
          justificacion,
          fuente,
          url,
          aspiracionId: tipo === "aspiracion" ? idIndicador : null,
          objectivoId: tipo === "objetivo" ? idIndicador : null,
          lineaEstrategicaId: tipo === "linea" ? idIndicador : null,
        },
      ]);
      clearForm();
      handleClose();
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
          ¿Qué otro indicador considera que debe incluirse?
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
            value={justificacion}
            required={true}
            placeholder="¿Por qué incluir este nuevo indicador? *"
            onChange={(e) => setJustificacion(e.target.value)}
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
            value={url}
            required={false}
            placeholder="Url o dirección donde podriamos encontrar informacion"
            onChange={(e) => setUrl(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose} className="Button">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="Button azul">
          Guardar
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default PropuestaForm;
