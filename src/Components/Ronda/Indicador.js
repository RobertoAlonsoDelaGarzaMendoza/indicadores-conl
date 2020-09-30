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
  Slider,
  ListItemSecondaryAction,
  IconButton,
  Hidden,
  Grid,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import DeleteIcon from "@material-ui/icons/Delete";

import Instruccion from "../Dialogs/Instruccion";
import Carusel from "./Carusel";
import { useHistory, useParams } from "react-router-dom";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import PropuestaForm from "./PropuestaForm";
import Api from "../../Restful/Api";
import { useSelector } from "react-redux";
import LoadingButton from "../Panel/LoadingButton";
import Skeleton from "../Helpers/Skeleton";

function Indicador({ tipo_ronda }) {
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
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message_snackbar, setMessageSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  let tooltip_propuesta =
    "Agregar un nuevo indicador diferente a los mostrados";

  const showSnackbar = (message) => {
    setMessage(message);
    setMessageSnackbar(true);
  };

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
    setLoading(true);
    Api.get(
      `/${tipo}/${tipo_ronda === "meta" ? "metas" : "votos"}/${idIndicador}/${
        ronda.id
      }`
    )
      .then((response) => {
        console.log(response);
        switch (response.status) {
          case 200:
            let data = response.data;
            setIndicador(data.descripcion);
            setIndicadores(buildIndicadores(data.indicadors, tipo_ronda));
            console.log(indicadores);
            setLoading(false);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error >>>", error);
      });
  }, []);

  const buildIndicadores = (indicadores, tipo_ronda) => {
    switch (tipo_ronda) {
      case "indicador":
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
            voto: {
              ...voto,
              tipo_voto: `${voto.tipo_voto}`,
            },
          };
        });
      case "meta":
        return indicadores.map((indicador) => {
          let voto = indicador.meta.length
            ? indicador.meta[0]
            : {
                id: null,
                tipo_voto: 0,
                razon_no: "",
                valor_meta: "",
              };
          return {
            ...indicador,
            voto: {
              ...voto,
              tipo_voto: `${voto.tipo_voto}`,
              tipo_voto: voto.certeza,
            },
          };
        });
    }
  };

  useEffect(() => {
    if (step === indicadores.length - 1) {
      setFinalizar(true);
    } else {
      setFinalizar(false);
      setEstadoPanelFinalizar(false);
    }
    if (indicadores[step]?.voto.tipo_voto == "1") {
      setMostraRazon(true);
    } else {
      setMostraRazon(false);
    }
  }, [step, indicadores]);

  let opciones =
    tipo_ronda == "meta"
      ? [
          {
            value: 0,
            label: "POCO",
          },
          {
            value: 1,
            label: "REGULAR",
          },
          {
            value: 2,
            label: "ALTA",
          },
        ]
      : [
          {
            value: "0",
            label: "SÍ",
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

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSlide = (event, newValue) => {
    handleInput({
      target: {
        type: "slider",
        value: newValue,
      },
    });
  };

  const handleInput = (e) => {
    console.log(e);
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

      case "slider":
        indicador.voto.tipo_voto = e.target.value;
        break;

      case "text":
        indicador.voto.valor_meta = e.target.value;
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
    if (indicadores.length == 0) {
      history.push(`/ronda/${ronda.id}`);
    } else {
      setSending(true);
      let sends = [];
      switch (tipo_ronda) {
        case "indicador":
          sends.push(enviarVotos());
          sends.push(enviarPropuestas());
          break;
        case "meta":
          sends.push(enviarMetas());
          break;
        default:
          break;
      }
      Promise.all(sends)
        .then((results) => {
          setSending(false);
          console.log(results);
          history.push(`/ronda/${ronda.id}`);
        })
        .catch((error) => {
          setSending(false);
          if (error.response) {
            console.log(error.response.data);
            showSnackbar(error.response.data.mesage);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error>>>", error.message);
            showSnackbar(error.message);
          }
        });
    }
  };

  const enviarVotos = () => {
    return Api.put(`/voto/${ronda.id}`, indicadores);
  };

  const enviarMetas = () => {
    return Api.post(
      `/meta/${ronda.id}`,
      indicadores.map((indicador) => {
        return {
          ...indicador,
          meta: {
            ...indicador.voto,
            certeza: indicador.voto.tipo_voto,
            comentario: indicador.voto.razon_no,
          },
        };
      })
    );
  };

  const enviarPropuestas = () => {
    return Api.post(`/indicadorPropuesto/${ronda.id}`, {
      indicadoresPropuestos: propuestas,
    });
  };

  const handleDeletePropuesta = (index) => {
    let p = propuestas;
    p.splice(index, 1);
    setPropuestas(
      p.map((propuesta) => {
        return propuesta;
      })
    );
  };

  return (
    <div className="RondaPanel">
      <div className="Login_logo_section">
        <img alt="logo_nuevo_leon" className="Login_logo" src={logo} />
      </div>
      <Paper variant="elevation" elevation={4} className="panel_card">
        <div
          className={`indicador informacion y-scroll ${
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
          <h2 className="font-morado">{loading ? <Skeleton /> : indicador}</h2>
          <h3 className="font-morado">
            {loading ? <Skeleton /> : indicadores[step]?.nombre}
          </h3>
          <Grid container alignItems="center">
            <Grid
              item
              sm={12}
              md="auto"
              alignItems="center"
              alignContent="center"
            >
              <Carusel loading={loading} imagenes={indicadores[step]?.images} />
            </Grid>
            <Grid item sm={12} md="auto">
              <div className="informacion">
                <div className="informacion_dialogo">
                  {loading ? (
                    <>
                      <Skeleton marginTop="1rem" />
                      <Skeleton marginTop="1rem" />
                    </>
                  ) : (
                    <>
                      <p className="bold">{indicadores[step]?.definicion}</p>
                      <p>Fuente: {indicadores[step]?.fuente}</p>
                    </>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="form">
            {tipo_ronda === "meta" && (
              <div>
                {loading ? (
                  <Skeleton marginTop="1rem" />
                ) : (
                  <p>¿Qué tan probable es alcanzar la meta planteada?​</p>
                )}
                {loading ? (
                  <Skeleton />
                ) : (
                  <input
                    value={indicadores[step]?.voto.valor_meta}
                    onChange={handleInput}
                    placeholder={indicadores[step]?.unidad_medida}
                  />
                )}
              </div>
            )}
            {tipo_ronda === "meta" ? (
              <div>
                {loading ? (
                  <Skeleton marginTop="1rem" />
                ) : (
                  <p>¿Qué tan probable es alcanzar la meta planteada?​</p>
                )}
                {loading ? (
                  <Skeleton />
                ) : (
                  <Slider
                    value={indicadores[step]?.voto.tipo_voto}
                    step={null}
                    valueLabelDisplay="off"
                    marks={opciones}
                    max={opciones.length - 1}
                    onChange={handleSlide}
                  />
                )}
              </div>
            ) : (
              <div>
                {loading ? (
                  <Skeleton marginTop="1rem" />
                ) : (
                  <p>
                    ¿Considera usted que este indicador contribuye a monitorear
                    el avance?
                  </p>
                )}
                {loading ? (
                  <Skeleton marginTop="1rem" />
                ) : (
                  <RadioGroup
                    className="opciones_ronda"
                    aria-label="gender"
                    name="inclusion"
                    value={indicadores[step]?.voto.tipo_voto}
                    onChange={handleInput}
                  >
                    {opciones.map((opcion, index) => (
                      <FormControlLabel
                        key={index}
                        value={opcion.value}
                        control={<Radio />}
                        label={opcion.label}
                      />
                    ))}
                  </RadioGroup>
                )}
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
            )}
          </div>
          <div className="sticky-bottom">
            {loading ? (
              <Skeleton />
            ) : (
              <MobileStepper
                variant="progress"
                steps={indicadores.length}
                position="static"
                activeStep={step}
                nextButton={
                  <button
                    onClick={handleNext}
                    className="Button azul button-stepper"
                    disabled={step === indicadores.length - 1}
                  >
                    siguiente
                    <KeyboardArrowRight />
                  </button>
                }
                backButton={
                  <button
                    onClick={handleBack}
                    className="Button azul button-stepper"
                    disabled={step === 0}
                  >
                    <KeyboardArrowLeft />
                    anterior
                  </button>
                }
              ></MobileStepper>
            )}
          </div>
        </div>
        <Hidden smDown>
          <div
            className={`total-indicadores ${
              estado_panel_finalizar && "active"
            }`}
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
            <div className="informacion y-scroll">
              {loading ? (
                Array(6)
                  .fill()
                  .map((elem, index) => (
                    <div key={index}>
                      <Skeleton marginTop="1.5rem" />
                      <Skeleton marginTop="1rem" height=".5rem" />
                    </div>
                  ))
              ) : (
                <List className="lista-indicadores">
                  {indicadores.map((indicador) => {
                    let voto = indicador.voto.tipo_voto;
                    //console.log("valor voto>>>", voto);
                    let opcion =
                      voto === null
                        ? { label: "Sin seleccionar" }
                        : opciones.find((opcion) => opcion.value == voto);
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

                  {propuestas.map((propuesta, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={propuesta.nombre}
                        secondary={propuesta.razon_no}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="eliminar"
                          onClick={() => {
                            handleDeletePropuesta(index);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
              <div
                className={`bottom_button sticky-bottom ${
                  estado_panel_finalizar ? "active" : ""
                }`}
              >
                {tipo_ronda === "indicador" ? (
                  <Tooltip arrow placement="bottom" title={tooltip_propuesta}>
                    <button
                      disabled={propuestas.length == 2}
                      className="Button"
                      onClick={() => setDialogPropuesta(true)}
                    >
                      Proponer
                    </button>
                  </Tooltip>
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
        </Hidden>
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
        idIndicador={idIndicador}
        tipo={tipo}
        flag_open={dialog_propuesta}
        handleClose={() => setDialogPropuesta(false)}
        propuestas={propuestas}
        setPropuestas={setPropuestas}
      />
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

export default Indicador;
