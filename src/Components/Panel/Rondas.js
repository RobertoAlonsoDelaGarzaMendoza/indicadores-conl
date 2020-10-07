import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteRonda,
  deleteRondas,
  deleteToken,
  deleteUser,
  loginOut,
  setRondas,
} from "../../Redux/Actions";
import Api from "../../Restful/Api";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";
import Introduccion from '../Dialogs/Introduccion'

function Rondas() {
  const [rondas, setFilaRondas] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message_snackbar, setMessageSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(true);


  const showSnackbar = (message) => {
    setMessage(message);
    setMessageSnackbar(true);
  };

  const handleSalir = () => {
    dispatch(deleteToken());
    dispatch(deleteUser());
    dispatch(loginOut());
    dispatch(deleteRonda());
    dispatch(deleteRondas());
  };

  useEffect(() => {
    setLoading(true);
    Api.get("/ronda")
      .then((response) => {
        setLoading(false);
        //console.log(response);
        switch (response.status) {
          case 200:
            let rondas = response.data.rondas;
            //console.log("rondas>>>", rondas);
            setFilaRondas(
              rondas.map((ronda) => {
                return {
                  id: ronda.id,
                  nombre: ronda.descripcion,
                  estatus: ronda.estatus ? 0 : 2,
                  link: `/ronda/${ronda.id}`,
                  tipo_ronda: ronda.tipo_ronda,
                };
              })
            );
            dispatch(setRondas(rondas));
            break;
          default:
            break;
        }
      })
      .catch((error) => {
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

  return (
    <Panel>
      <UserHeader />
      <Lista
        loading={loading}
        nombre="Rondas"
        titulo="Lista de rondas"
        titulo_accion="Estado"
        filas={rondas}
      />
      <div className="bottom_button">
        <button className="Button morado">Documentación</button>
        <button className="Button azul" onClick={handleSalir}>
          Salir
        </button>
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
      <Introduccion
        flag_open={showDialog}
        handleClickOpen={()=>setShowDialog(true)}
        handleClose={()=>setShowDialog(false)}
      />
    </Panel>
  );
}

export default Rondas;
