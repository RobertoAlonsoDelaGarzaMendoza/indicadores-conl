import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/nuevo_leon_logo.svg";
import axios from "axios";
import API from "../../Restful/Api";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    API.get("/1", {
      email: email,
    })
      .then((response) => {
        console.log(response);
        // TODO logica para login y falso
        history.push("/panel");
      })
      .catch((error) => {
        console.log(error);
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
    </div>
  );
}

export default Login;
