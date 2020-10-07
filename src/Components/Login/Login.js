import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/nuevo_leon_logo.svg";
import Api from "../../Restful/Api";
import { Snackbar, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginIn, setToken, setUser } from "../../Redux/Actions";
import LoadingButton from "../Panel/LoadingButton";
import { Controller, useForm } from "react-hook-form";

function Login() {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, errors } = useForm();
  const [message_snackbar, setMessageSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  let history = useHistory();

  const showSnackbar = (message) => {
    setMessage(message);
    setMessageSnackbar(true);
  };

  const onSubmit = (data) => {
    setLoading(true);
    Api.post("/login", data)
      .then((response) => {
        setLoading(false);
        //console.log("correct >>>", response);
        switch (response.status) {
          case 200:
            Api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.usuario));
            dispatch(loginIn());
            history.push("/Rondas");
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
          showSnackbar(error.response.data.mesage);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error>>>", error.message);
          showSnackbar(error.message);
        }
      })
      .then(() => {});
  };
  return (
    <div className="Login">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo}></img>
      </div>
      <div className="Login_Headlines">
        <Typography variant="h3">
          Plataforma participativa para la identificación de indicadores y metas
          del Plan Estratégico de Nuevo León
        </Typography>
        <Typography variant="h4">
          Ingrese a la plataforma con su correo electrónico registrado
        </Typography>
        <form
          className={loading ? "Login_form" : "Login_form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue=""
            type="text"
            label="Email"
            variant="filled"
            color="primary"
            required
            error={errors?.email}
            helperText={errors?.email?.message}
            rules={{ required: "Email es requerido" }}
            autoFocus
          />
          <LoadingButton
            className="Login_button"
            loading={loading}
            text="Ingresar"
            loading_text="Cargando"
            type="submit"
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
          />
        </form>
        <div className="Login_links">
          {/*           <span>
            ¿Desea participar en el ejercicio? solicite acceso a la plataforma
          </span>
          <a>aquí</a> */}
          <a className="Login_aviso_privacidad">Ver aviso de privacidad</a>
        </div>
      </div>
      {/* Snackbar section */}
      <Snackbar
        message={message}
        open={message_snackbar}
        autoHideDuration={5000}
        onClose={() => {
          setMessageSnackbar(false);
        }}
      />
    </div>
  );
}

export default Login;
