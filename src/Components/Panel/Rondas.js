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

function Rondas() {
  const [rondas, setFilaRondas] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
        console.log(response);
        switch (response.status) {
          case 200:
            let rondas = response.data.rondas;
            console.log("rondas>>>", rondas);
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
        setLoading(false);
        console.log(error.message);
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
    </Panel>
  );
}

export default Rondas;
