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
import { Controller, useForm } from "react-hook-form";

function LoginAdmin() {
  const history = useHistory();
  const { path } = useRouteMatch();

  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    history.push(`${path}/usuario`);
  };

  return (
    <div className="LoginAdmin">
      <img alt="logo_nuevo_leon" className="Login_logo" src={logo}></img>
      <h1>
        Plataforma participativa para la identificación de indicadores y metas
        del Plan Estratégico de Nuevo León
      </h1>
      <h2>Administración</h2>
      <form
        className="form_login_admin"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={TextField}
          name="email"
          control={control}
          defaultValue=""
          type="text"
          label="email"
          variant="filled"
          autoFocus
          fullWidth
          color="primary"
          required
          error={errors?.email}
          helperText={errors?.email?.message}
          rules={{ required: "Email es requerido" }}
        />
        <FormControl
          variant="filled"
          fullWidth
          required
          name="password"
          error={errors?.password}
        >
          <InputLabel htmlFor="password">contraseña</InputLabel>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Contraseña es requerido" }}
            defaultValue=""
            render={({ onBlur, onChange, value, name }) => (
              <FilledInput
                id="password"
                name={name}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
            )}
          />
          <FormHelperText id="helper-text-password">
            {errors?.password?.message}
          </FormHelperText>
        </FormControl>
        <LoadingButton
          loading={false}
          text="Ingresar"
          loading_text="Cargando"
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        />
      </form>
    </div>
  );
}

export default LoginAdmin;
