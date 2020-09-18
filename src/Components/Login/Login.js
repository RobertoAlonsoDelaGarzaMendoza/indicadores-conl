import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/nuevo_leon_logo.svg";
import API from "../../Restful/Api";
import { CircularProgress, Snackbar, SnackbarContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message_snackbar, setMessageSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  let history = useHistory();

  const showSnackbar = (message) => {
    setMessage(message);
    setMessageSnackbar(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO logica para login y falso
    API.get("/login", {
      email: email,
    })
      .then((response) => {
        console.log("correct >>>", response);
        switch (response.status) {
          case 200:
            //history.push("/panel");
            break;
          case 404:
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log("error >>>", error.response.status);
        showSnackbar(error.message);
      })
      .then(() => {
        setLoading(false);
      });
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
          className={loading ? "Login_form cargando" : "Login_form"}
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
          <button className="Button Login_button" disabled={loading}>
            {loading ? "Cargando" : "Ingresar"}
            <CircularProgress
              className="button_loading_icon"
              size=".9rem"
              color="inherit"
            />
          </button>
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
