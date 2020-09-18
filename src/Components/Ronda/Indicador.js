import React, { useEffect, useState } from "react";
import "./Indicador.css";
import logo from "../../Assets/nuevo_leon_logo.svg";
import {
  Paper,
  MobileStepper,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItemText,
  ListItem,
  Fab,
  Divider,
  ListSubheader,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Instruccion from "../Dialogs/Instruccion";
import Carusel from "./Carusel";
import { useHistory } from "react-router-dom";

import axios from "axios";
import API from "../../Restful/Api";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import PropuestaForm from "./PropuestaForm";

function Indicador({ type }) {
  const [respuesta, setRespuesta] = useState("");
  const [mostrar_cuadro_razon, setMostraRazon] = useState(false);
  const [razon, setRazon] = useState("");
  const [step, setStep] = useState(0);
  const [dialog_open, setDialogOpen] = useState(false);
  const [finalizar, setFinalizar] = useState(false);
  const [estado_panel_finalizar, setEstadoPanelFinalizar] = useState(false);
  const [indicadores, setIndicadores] = useState([
    {
      id: 1,
      objectivo: "Objectivo 1",
      linea_estrategica: "Linea estrategica 1",
      nombre_indicador: "nombre indicador 1",
      voto: "",
      razon: "",
    },
    {
      id: 2,
      objectivo: "Objectivo 2",
      linea_estrategica: "Linea estrategica 2",
      nombre_indicador: "nombre indicador 2",
      voto: "",
      razon: "",
    },
    {
      id: 3,
      objectivo: "Objectivo 3",
      linea_estrategica: "Linea estrategica 2",
      nombre_indicador: "nombre indicador 3",
      voto: "",
      razon: "",
    },
  ]);
  const [propuestas, setPropuestas] = useState([]);
  const [dialog_propuesta, setDialogPropuesta] = useState(false);

  useEffect(() => {
    if (step === indicadores.length - 1) {
      setFinalizar(true);
    } else {
      setFinalizar(false);
      setEstadoPanelFinalizar(false);
    }
    if(indicadores[step].voto === "1"){
      setMostraRazon(true);
    }else{
      setMostraRazon(false);
    }
  }, [step]);

  /*   let indicadores = [
    {
      id: 1,
      objectivo: "Objectivo 1",
      linea_estrategica: "Linea estrategica 1",
      nombre_indicador: "nombre indicador 1",
      voto: "0",
      razon:""
    },
    {
      id: 2,
      objectivo: "Objectivo 2",
      linea_estrategica: "Linea estrategica 2",
      nombre_indicador: "nombre indicador 2",
      voto: "0",
      razon:""
    },
  ]; */

  let opciones = [
    {
      value: "0",
      label: "SI",
    },
    {
      value: "1",
      label: "NO",
    },
    {
      value: "2",
      label: "Prefiere no responder",
    },
  ];

  let history = useHistory();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleInput = (e) => {
    let indicador = indicadores[step];
    switch (e.target.type) {
      case "radio":
        //setRespuesta(e.target.value);
        if (e.target.value === "1") {
          setMostraRazon(true);
        } else {
          setMostraRazon(false);
          indicador.razon = "";
        }
        indicador.voto = e.target.value;
        break;
      case "textarea":
        //setRazon(e.target.value);
        indicador.razon = e.target.value;
        break;
    }
    let new_indicadores = indicadores.map((old_indicador)=>{
      if(old_indicador.id === indicador.id){
        return indicador
      }else{
        return old_indicador
      }
    });
    setIndicadores(new_indicadores);
  };

  const handleSalir = () => {
    /* TODO agregar funcionalidad de enviado de datos */
    history.push("/ronda");
  };
  return (
    <div className="RondaPanel">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
      </div>
      <Paper variant="outlined" className="panel_card">
        <div
          className={`indicador informacion ${
            !estado_panel_finalizar ? "active" : ""
          }`}
        >
          <button className="Button" onClick={handleSalir}>
            <ArrowBackIcon />
            salir
          </button>
          <h2 className="font-morado">{indicadores[step].objectivo}</h2>
          <h3 className="font-morado">{indicadores[step].objectivo}</h3>
          <h3 className="font-morado">{indicadores[step].linea_estrategica}</h3>
          <h3 className="font-morado">{indicadores[step].nombre_indicador}</h3>
          <div className={`infografia ${type === "meta" ? "meta" : ""}`}>
            <Carusel />
            <div className="informacion">
              <div className="informacion_dialogo">
                <p>
                  Definicion: Es el resultado del promedio de los subíndices de
                  gobierno abierto esde la perspectiva gubernamental (GAg) y de
                  gobierno abierto desde la perspectiva ciudadana (GAc).
                </p>
                <p>Fuente: Censos Económicos INEGI​</p>
              </div>
            </div>
          </div>
          <div className="form">
            <div>
              <p>
                ¿Considera usted que este indicador contribuye a monitorear el
                avance?
              </p>
              <RadioGroup
                className="opciones_ronda"
                aria-label="gender"
                name="inclusion"
                value={indicadores[step].voto}
                onChange={handleInput}
              >
                {opciones.map((opcion) => (
                  <FormControlLabel
                    value={opcion.value}
                    control={<Radio />}
                    label={opcion.label}
                  />
                ))}
              </RadioGroup>
              <textarea
                autoFocus={true}
                type="textarea"
                value={indicadores[step].razon}
                onChange={handleInput}
                className={
                  mostrar_cuadro_razon ? "panel_razon" : "panel_razon oculto"
                }
                placeholder="Escriba las razones por las cuales no debería incluirse este indicador: ​"
              ></textarea>
            </div>
          </div>
          <div>
            <MobileStepper
              variant="progress"
              steps={indicadores.length}
              position="static"
              activeStep={step}
              nextButton={
                <button
                  onClick={handleNext}
                  className="Button azul"
                  disabled={step === indicadores.length - 1}
                >
                  siguiente
                  <KeyboardArrowRight />
                </button>
              }
              backButton={
                <button
                  onClick={handleBack}
                  className="Button azul"
                  disabled={step === 0}
                >
                  <KeyboardArrowLeft />
                  anterior
                </button>
              }
            ></MobileStepper>
          </div>
        </div>
        <div
          className={`total-indicadores ${estado_panel_finalizar && "active"}`}
        >
          <Fab
            className={`fab azul ${finalizar && "hidden"}`}
            onClick={() => setEstadoPanelFinalizar(!estado_panel_finalizar)}
          >
            {!estado_panel_finalizar ? (
              <ArrowBackIos></ArrowBackIos>
            ) : (
              <ArrowForwardIos></ArrowForwardIos>
            )}
          </Fab>
          <div className="informacion">
            <List className="lista-indicadores">
              {indicadores.map((indicador, index) => {
                let voto = indicador.voto;
                let opcion =
                  voto === ""
                    ? { label: "Sin seleccionar" }
                    : opciones.find((opcion) => opcion.value === voto);
                return (
                  <ListItem key={indicador.id}>
                    <ListItemText
                      primary={indicador.nombre_indicador}
                      secondary={opcion.label}
                    />
                  </ListItem>
                );
              })}
              {propuestas.length ? (
                <>
                  <Divider />
                  <ListSubheader>Propuestas</ListSubheader>
                </>
              ) : null}

              {propuestas.map((propuesta) => (
                <ListItem key={propuesta.id}>
                  <ListItemText
                    primary={propuesta.nombre}
                    secondary={propuesta.razon}
                  />
                </ListItem>
              ))}
            </List>
            <div
              className={`bottom_button ${
                estado_panel_finalizar ? "active" : ""
              }`}
            >
              {type === "" ? (
                <button
                  className="Button"
                  onClick={() => setDialogPropuesta(true)}
                >
                  Proponer
                </button>
              ) : null}

              <button className="Button azul" onClick={handleSalir}>
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </Paper>
      {/* TODO: descomentar */}
      {
        <Instruccion
          /* //TODO enviar el numero de ronda */
          ronda={"1"}
          flag_open={dialog_open}
          handleClose={handleClose}
        />
      }
      {/* Propuesta Dialog */}
      <PropuestaForm
        flag_open={dialog_propuesta}
        handleClose={() => setDialogPropuesta(false)}
        propuestas={propuestas}
        setPropuestas={setPropuestas}
      />
    </div>
  );
}

export default Indicador;
