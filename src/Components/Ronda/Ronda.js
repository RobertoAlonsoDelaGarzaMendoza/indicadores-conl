import React, { useEffect, useState } from "react";
import "./Ronda.css";
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
  Fab, Divider, ListSubheader
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

function Ronda() {
  const [respuesta, setRespuesta] = useState("1");
  const [mostrar_cuadro_razon, setMostraRazon] = useState(false);
  const [razon, setRazon] = useState("");
  const [step, setStep] = useState(0);
  const [dialog_open, setDialogOpen] = useState(false);
  const [finalizar, setFinalizar] = useState(false);
  const [estado_panel_finalizar, setEstadoPanelFinalizar] = useState(false);
  const [propuestas,setPropuestas] = useState([]);
  const [dialog_propuesta,setDialogPropuesta] = useState(true);

  useEffect(() => {
    if (step === indicadores.length - 1) {
      setFinalizar(true);
    } else {
      setFinalizar(false);
      setEstadoPanelFinalizar(false);
    }
  }, [step]);

  let indicadores = [
    {
      id: 1,
      objectivo: "Objectivo 1",
      linea_estrategica: "Linea estrategica 1",
      nombre_indicador: "nombre indicador 1",
    },
    {
      id: 1,
      objectivo: "Objectivo 2",
      linea_estrategica: "Linea estrategica 2",
      nombre_indicador: "nombre indicador 2",
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
    switch (e.target.type) {
      case "radio":
        setRespuesta(e.target.value);
        if (e.target.value === "2") {
          setMostraRazon(true);
        } else {
          setMostraRazon(false);
          setRazon("");
        }
        break;
      case "textarea":
        setRazon(e.target.value);
        break;
    }
  };

  const handleSalir = () => {
    /* TODO agregar funcionalidad de enviado de datos */
    history.push("/panel");
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
          <Carusel />
          <div className="informacion">
            <div className="informacion_dialogo">
              <p>Fuente</p>
              <p>Texto explicativo</p>
              <p>Unidad de medida</p>
            </div>
            <RadioGroup
              className="opciones_ronda"
              aria-label="gender"
              name="inclusion"
              value={respuesta}
              onChange={handleInput}
            >
              <FormControlLabel value="1" control={<Radio />} label="SI" />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="NO"
              />
              <FormControlLabel value="3" control={<Radio />} label="Prefiere no responder" />
            </RadioGroup>
            <textarea
              autoFocus={true}
              type="textarea"
              value={razon}
              onChange={handleInput}
              className={
                mostrar_cuadro_razon ? "panel_razon" : "panel_razon oculto"
              }
              placeholder="Escriba las razones por las cuales no debería incluirse este indicador: ​"
            ></textarea>
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
              {indicadores.map((indicador) => (
                <ListItem key={indicador.id}>
                  <ListItemText primary={indicador.nombre_indicador} />
                </ListItem>
              ))}
              <Divider/>
              <ListSubheader>Propuestas</ListSubheader>
              {propuestas.map((propuesta) => (
                <ListItem key={propuesta.id}>
                  <ListItemText primary={propuesta.nombre} />
                </ListItem>
              ))}
            </List>
            <div className="bottom_button">
              <button className="Button" onClick={()=> setDialogPropuesta(true)}>
                Proponer
              </button>
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
        handleClose={()=>setDialogPropuesta(false)}
        propuestas={propuestas}
        setPropuestas={setPropuestas}
      />
    </div>
  );
}

export default Ronda;
