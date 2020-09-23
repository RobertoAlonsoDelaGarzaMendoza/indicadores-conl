import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteRonda,
  deleteToken,
  deleteUser,
  loginOut,
} from "../../Redux/Actions";
import Api from "../../Restful/Api";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";

function Rondas() {
  const token = useSelector((state) => state.token);
  const [rondas, setRondas] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSalir = () => {
    dispatch(deleteToken());
    dispatch(deleteUser());
    dispatch(loginOut());
    dispatch(deleteRonda());
  };

  useEffect(() => {
    if (token) {
      Api.get("/ronda")
        .then((response) => {
          console.log(response);
          switch (response.status) {
            case 200:
              let rondas = response.data.rondas;
              setRondas(
                rondas.map((ronda) => {
                  return {
                    id: ronda.id,
                    nombre: ronda.descripcion,
                    estatus: ronda.estatus ? 0 : 2,
                    link: `/ronda/${ronda.id}`,
                  };
                })
              );
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <Panel>
      <UserHeader />
      <Lista
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
    </Panel>
  );
}

export default Rondas;
