import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Api from "../../Restful/Api";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";

function Rondas() {
  const token = useSelector((state) => state.token);
  const [rondas, setRondas] = useState([]);

  useEffect(() => {
    if (token) {
      //Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
                    link:`/ronda/${ronda.id}`
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

  let usuario = {
    nombre: "M.C. Jorge Juvenal Campos",
    puesto: "Secretario de Agricultura del Estado de Nuevo León",
  };
  let padre = {
    descripcion: "Ronda de selección de indicadores",
    ruta: "/ronda",
  };
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
        <Link className="link_router" to="/">
          <button className="Button azul">Salir</button>
        </Link>
      </div>
    </Panel>
  );
}

export default Rondas;
