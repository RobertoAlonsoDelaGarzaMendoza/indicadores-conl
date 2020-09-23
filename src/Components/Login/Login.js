import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/nuevo_leon_logo.svg";
import Api from "../../Restful/Api";
import { Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginIn, setToken, setUser } from "../../Redux/Actions";
import LoadingButton from "../Panel/LoadingButton";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message_snackbar, setMessageSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();

  const showSnackbar = (message) => {
    setMessage(message);
    setMessageSnackbar(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO logica para login y falso
    Api.post("/login", {
      email: email,
    })
      .then((response) => {
        setLoading(false);
        console.log("correct >>>", response);
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
        console.log("error>>>", error);
        showSnackbar(error.message);
      })
      .then(() => {});
  };
  return (
    <div className="Login">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo}></img>
      </div>
      <div className="Login_Headlines">
        <h1>
          Plataforma participativa para la identificación de indicadores y metas
          del Plan Estratégico de Nuevo León
        </h1>
        <h2>Ingrese a la plataforma con su correo electrónico registrado</h2>
        <form
          className={loading ? "Login_form" : "Login_form"}
          onSubmit={handleSubmit}
        >
          <div className="input_group">
            <input
              placeholder="correo electrónico"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <LoadingButton
            className="Button Login_button"
            loading={loading}
            text="Ingresar"
            loading_text="Cargando"
            onClick={handleSubmit}
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
