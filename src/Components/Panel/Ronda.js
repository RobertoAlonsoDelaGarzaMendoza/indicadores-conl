import { Button, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setRonda } from "../../Redux/Actions";
import Api from "../../Restful/Api";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";
import Instruccion from "../Dialogs/Instruccion";
import Documentacion from "../Dialogs/Documentacion";

function Ronda() {
  const ronda = useSelector((state) => state.ronda);
  const rondas = useSelector((state) => state.rondas);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [aspiraciones, setAspiraciones] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  // const [lineas, setLineas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message_snackbar, setMessageSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(true);
  const [showDocumentacion, setShowDocumentacion] = useState(false);

  const showSnackbar = (message) => {
    setMessage(message);
    setMessageSnackbar(true);
  };

  const getTipoRonda = (tipo_ronda) => {
    switch (tipo_ronda) {
      case 0:
        return "indicador";
      case 1:
        return "meta";
      default:
        break;
    }
  };

  useEffect(() => {
    let t_ronda = null;
    if (ronda.id !== id) {
      t_ronda = rondas.find((ronda) => ronda.id == id);
      dispatch(setRonda(t_ronda));
    }
    setLoading(true);
    Api.post("/panel", {
      rondaId: id,
    })
      .then((response) => {
        setLoading(false);
        //console.log(response);
        switch (response.status) {
          case 200:
            let aspiraciones = response.data.aspiraciones;
            setAspiraciones(
              aspiraciones.map((aspiracion) => {
                return {
                  id: aspiracion.id,
                  nombre: aspiracion.descripcion,
                  estatus: aspiracion.estatus,
                  link: aspiracion.indicadoresMeta
                    ? `/${getTipoRonda(t_ronda.tipo_ronda)}/aspiracion/${
                        aspiracion.id
                      }`
                    : null,
                };
              })
            );

            let objectivos = response.data.objetivos;
            setObjetivos(
              objectivos.map((objetivo) => {
                return {
                  id: objetivo.id,
                  nombre: objetivo.descripcion,
                  estatus: objetivo.estatus,
                  link: objetivo.indicadoresMeta
                    ? `/${getTipoRonda(t_ronda.tipo_ronda)}/objetivo/${
                        objetivo.id
                      }`
                    : null,
                  subfilas: objetivo.lineasEstrategicas?.map((linea) => {
                    return {
                      id: linea.id,
                      nombre: linea.descripcion,
                      estatus: linea.estatus,
                      link: linea.indicadoresMeta
                        ? `/${getTipoRonda(t_ronda.tipo_ronda)}/linea/${
                            linea.id
                          }`
                        : null,
                    };
                  }),
                };
              })
            );

            // setLineas(
            //   aspiraciones.map((linea) => {
            //     return {
            //       id: linea.id,
            //       nombre: linea.descripcion,
            //       estatus: 0,//linea.estatus,
            //       link: `/${getTipoRonda(t_ronda.tipo_ronda)}/linea/${
            //         linea.id
            //       }`,
            //     };
            //   })
            // );
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
      });
  }, []);

  useEffect(() => {}, [ronda]);

  return (
    <Panel>
      <UserHeader />
      <Lista
        nombre={ronda.descripcion}
        loading={loading}
        titulo="Aspiraciones"
        titulo_accion="Estado"
        filas={aspiraciones}
      />
      <Lista
        loading={loading}
        titulo="Objectivos y líneas estratégicas"
        titulo_accion="Estado"
        filas={objetivos}
      />
      {/* <Lista
        loading={loading}
        titulo="Líneas estratégicas"
        titulo_accion="Estado"
        filas={lineas}
      /> */}
      <div className="bottom_button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowDocumentacion(true)}
        >
          Documentación
        </Button>
        <Link className="link_router" to="/rondas">
          <Button variant="contained" color="secondary">
            Salir
          </Button>
        </Link>
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
      {/* Dialogs */}
      <Instruccion
        ronda={ronda.no}
        flag_open={showDialog}
        handleClose={() => setShowDialog(false)}
      />
      <Documentacion
        flag_open={showDocumentacion}
        handleClose={() => setShowDocumentacion(false)}
      />
    </Panel>
  );
}

export default Ronda;
