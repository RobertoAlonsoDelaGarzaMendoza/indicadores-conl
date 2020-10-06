import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
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
          <TextField
            variant="filled"
            fullWidth
            id="nombre"
            name="nombre"
            value={nombre}
            required
            label="Nombre del indicador"
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            variant="filled"
            fullWidth
            multiline
            id="razon"
            nombre="razon"
            rows={4}
            value={justificacion}
            required
            label="¿Por qué incluir este nuevo indicador?"
            onChange={(e) => setJustificacion(e.target.value)}
          ></TextField>
          <TextField
            variant="filled"
            fullWidth
            id="fuente"
            name="fuente"
            value={fuente}
            required={false}
            label="Fuente del indicador"
            onChange={(e) => setFuente(e.target.value)}
          />
          <TextField
            variant="filled"
            fullWidth
            id="direccion"
            name="direccion"
            value={url}
            required={false}
            label="Url o dirección donde podriamos encontrar informacion"
            onChange={(e) => setUrl(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PropuestaForm;
