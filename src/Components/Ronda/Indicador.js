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
  CircularProgress,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Instruccion from "../Dialogs/Instruccion";
import Carusel from "./Carusel";
import { useHistory, useParams } from "react-router-dom";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import PropuestaForm from "./PropuestaForm";
import Api from "../../Restful/Api";
import { useSelector } from "react-redux";
import LoadingButton from "../Panel/LoadingButton";

function Indicador({ type }) {
  let { tipo, idIndicador } = useParams();
  const ronda = useSelector((state) => state.ronda);
  const [indicador, setIndicador] = useState("");
  const [mostrar_cuadro_razon, setMostraRazon] = useState(false);
  const [step, setStep] = useState(0);
  const [dialog_open, setDialogOpen] = useState(false);
  const [finalizar, setFinalizar] = useState(false);
  const [estado_panel_finalizar, setEstadoPanelFinalizar] = useState(false);
  const [indicadores, setIndicadores] = useState([]);
  const [propuestas, setPropuestas] = useState([]);
  const [dialog_propuesta, setDialogPropuesta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    //console.log("ronda>>>", ronda);
    switch (tipo) {
      case "aspiracion":
        tipo = "aspiracion";
        break;
      case "objetivo":
        tipo = "objetivo";
        break;
      case "linea":
        tipo = "lineaestrategica";
        break;
      default:
        tipo = "error";
        break;
    }
    Api.get(`/${tipo}/votos/${idIndicador}/${ronda.id}`)
      .then((response) => {
        console.log(response);
        switch (response.status) {
          case 200:
            let data = response.data;
            setIndicador(data.descripcion);
            setIndicadores(buildIndicadores(data.indicadors));
            console.log(indicadores);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log("error >>>", error);
      });
  }, []);

  const buildIndicadores = (indicadores) => {
    return indicadores.map((indicador) => {
      let voto = indicador.votos.length
        ? indicador.votos[0]
        : {
            id: null,
            tipo_voto: "",
            razon_no: "",
          };
      return {
        ...indicador,
        voto: { ...voto, tipo_voto: `${voto.tipo_voto}` },
      };
    });
  };

  useEffect(() => {
    if (step === indicadores.length - 1) {
      setFinalizar(true);
    } else {
      setFinalizar(false);
      setEstadoPanelFinalizar(false);
    }
    if (indicadores[step]?.voto.tipo_voto === "1") {
      setMostraRazon(true);
    } else {
      setMostraRazon(false);
    }
  }, [step, indicadores]);

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
          indicador.voto.razon_no = "";
        }
        indicador.voto.tipo_voto = e.target.value;
        break;
      case "textarea":
        //setRazon(e.target.value);
        indicador.voto.razon_no = e.target.value;
        break;
    }
    let new_indicadores = indicadores.map((old_indicador) => {
      if (old_indicador.id === indicador.id) {
        return indicador;
      } else {
        return old_indicador;
      }
    });
    setIndicadores(new_indicadores);
  };

  const handleSalir = () => {
    setSending(true);
    Promise.all([enviarVotos(), enviarPropuestas()])
      .then((results) => {
        setSending(false);
        console.log(results);
        history.push(`/ronda/${ronda.id}`);
      })
      .catch((error) => {
        setSending(false);
        console.log(error.message);
      });
  };

  const enviarVotos = () => {
    return Api.put(`/voto/${ronda.id}`, indicadores);
  };

  //TODO cosumir de manera correcta endpoint de propuestas
  const enviarPropuestas = () => {
    return Api.put(`${tipo}/indicadorPropuesto/${idIndicador}/${ronda.id}`, []);
  };

  return (
    <div className="RondaPanel">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
      </div>
      <Paper variant="elevation" elevation="4" className="panel_card">
        <div
          className={`indicador informacion ${
            !estado_panel_finalizar ? "active" : ""
          }`}
        >
          <LoadingButton
            className="Button azul"
            loading={sending}
            text="Salir"
            loading_text="Enviando"
            onClick={handleSalir}
          />
          {/*  <button className="Button" onClick={handleSalir}>
            <ArrowBackIcon />
            salir
          </button> */}
          <h2 className="font-morado">{indicador}</h2>
          <h3 className="font-morado">{indicadores[step]?.nombre}</h3>
          <div className={`infografia ${type === "meta" ? "meta" : ""}`}>
            <Carusel imagenes={indicadores[step]?.images} />
            <div className="informacion">
              <div className="informacion_dialogo">
                <p>{indicadores[step]?.definicion}</p>
                <p>{indicadores[step]?.fuente}</p>
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
                value={indicadores[step]?.voto.tipo_voto}
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
                value={indicadores[step]?.voto.razon_no}
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
                let voto = indicador.voto.tipo_voto;
                //console.log("valor voto>>>", voto);
                let opcion =
                  voto === null
                    ? { label: "Sin seleccionar" }
                    : opciones.find((opcion) => opcion.value === voto);
                //console.log("valor opcion>>>", opcion);
                return (
                  <ListItem key={indicador.id}>
                    <ListItemText
                      primary={indicador.nombre}
                      secondary={opcion?.label}
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
                    secondary={propuesta.razon_no}
                  />
                </ListItem>
              ))}
            </List>
            <div
              className={`bottom_button ${
                estado_panel_finalizar ? "active" : ""
              }`}
            >
              {type === "indicador" ? (
                <button
                  className="Button"
                  onClick={() => setDialogPropuesta(true)}
                >
                  Proponer
                </button>
              ) : null}
              <LoadingButton
                className="Button azul"
                loading={sending}
                text="Finalizar"
                loading_text="Enviando"
                onClick={handleSalir}
              />
            </div>
          </div>
        </div>
      </Paper>
      {
        <Instruccion
          ronda={ronda.id}
          flag_open={dialog_open}
          handleClose={handleClose}
        />
      }
      {/* Propuesta Dialog */}
      <PropuestaForm
        tipo={tipo}
        flag_open={dialog_propuesta}
        handleClose={() => setDialogPropuesta(false)}
        propuestas={propuestas}
        setPropuestas={setPropuestas}
      />
    </div>
  );
}

export default Indicador;
