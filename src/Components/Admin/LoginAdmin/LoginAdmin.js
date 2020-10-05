import React, { useState } from "react";
import "./LoginAdmin.css";
import logo from "../../../Assets/nuevo_leon_logo.svg";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@material-ui/core";
import LoadingButton from "../../Panel/LoadingButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
function LoginAdmin() {
  const history = useHistory();
  const {path} = useRouteMatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (email && password) {
      //form validado
      history.push(`${path}/usuario`);
    }
  };

  const validate = () => {
    let errors = {};
    if (!email.trim()) {
      errors.email = "Es requerido";
    }
    if (!password.trim()) {
      errors.password = "Es requerido";
    }
    setErrors(errors);
  };

  return (
    <div className="LoginAdmin">
      <img alt="logo_nuevo_leon" className="Login_logo" src={logo}></img>
      <h1>
        Plataforma participativa para la identificación de indicadores y metas
        del Plan Estratégico de Nuevo León
      </h1>
      <h2>Administración</h2>
      <form className="form_login_admin" noValidate handleSubmit={handleSubmit}>
        <TextField
          id="email"
          type="text"
          label="email"
          variant="filled"
          autoFocus
          fullWidth
          color="primary"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.hasOwnProperty("email")}
          helperText={errors?.email}
        />
        <FormControl
          variant="filled"
          fullWidth
          required
          error={errors?.hasOwnProperty("password")}
        >
          <InputLabel htmlFor="password">contraseña</InputLabel>
          <FilledInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Mostrar contraseña"
                  onClick={() =>
                    setShowPassword((prev) => {
                      return !prev;
                    })
                  }
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="helper-text-password">
            {errors?.password}
          </FormHelperText>
        </FormControl>
        <LoadingButton
          className="Button"
          loading={false}
          text="Ingresar"
          loading_text="Cargando"
          variant="contained"
          color="primary"
          type="submmit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default LoginAdmin;
