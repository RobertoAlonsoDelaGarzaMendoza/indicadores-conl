import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import "./PropuestaForm.css";

function PropuestaForm({
  idIndicador,
  tipo,
  flag_open,
  handleClose,
  propuestas,
  setPropuestas,
}) {
  const defaultValues = {
    nombre: "",
    justificacion: "",
    fuente: "",
    url: "",
  };
  const { handleSubmit, control, reset, errors } = useForm();

  /*   const [nombre, setNombre] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [fuente, setFuente] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setNombre("");
    setJustificacion("");
    setFuente("");
    setUrl("");
  }; */

  const onSubmit = (data) => {
    // console.log("tipo >>>", tipo);
    setPropuestas([
      ...propuestas,
      {
        ...data,
        id: null,
        aspiracionId: tipo === "aspiracion" ? idIndicador : null,
        objectivoId: tipo === "objetivo" ? idIndicador : null,
        lineaEstrategicaId: tipo === "linea" ? idIndicador : null,
      },
    ]);
    reset(defaultValues);
    handleClose();
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
        <form
          className="propuesta_dialog_form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={TextField}
            control={control}
            variant="filled"
            fullWidth
            id="nombre"
            name="nombre"
            defaultValue=""
            required
            label="Nombre del indicador"
            error={errors?.nombre}
            helperText={errors?.nombre?.message}
            rules={{ required: "Campo requerido" }}
          />
          <Controller
            as={TextField}
            control={control}
            variant="filled"
            fullWidth
            multiline
            id="justificacion"
            name="justificacion"
            defaultValue=""
            rows={4}
            required
            label="¿Por qué incluir este nuevo indicador?"
            error={errors?.justificacion}
            helperText={errors?.justificacion?.message}
            rules={{ required: "Campo requerido" }}
          />
          <Controller
            as={TextField}
            control={control}
            variant="filled"
            fullWidth
            id="fuente"
            name="fuente"
            defaultValue=""
            label="Fuente del indicador"
          />
          <Controller
            as={TextField}
            control={control}
            variant="filled"
            defaultValue=""
            fullWidth
            id="url"
            name="url"
            label="Url o dirección donde podríamos encontrar información"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" color="secondary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PropuestaForm;
