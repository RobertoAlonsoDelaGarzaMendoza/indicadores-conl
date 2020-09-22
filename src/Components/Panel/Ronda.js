import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setRonda, setUser } from "../../Redux/Actions";
import Api from "../../Restful/Api";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";

function Ronda() {
  const token = useSelector((state) => state.token);
  const ronda = useSelector((state) => state.ronda);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [aspiraciones, setAspiraciones] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [lineas, setLineas] = useState([]);

  useEffect(() => {
    if(ronda.id !== id){
      dispatch(setRonda({id:id}));
    }
    if (token) {
      //Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Api.post("/panel", {
        rondaId: id,
      })
        .then((response) => {
          console.log(response);
          switch (response.status) {
            case 200:
              let aspiraciones = response.data.aspiraciones;
              setAspiraciones(
                aspiraciones.map((aspiracion) => {
                  return {
                    id: aspiracion.id,
                    nombre: aspiracion.descripcion,
                    estatus: 0,//aspiracion.estatus,
                    link: `/indicador/aspiracion/${aspiracion.id}`,
                  };
                })
              );

              let objectivos = response.data.objetivos;
              setObjetivos(
                objectivos.map((objetivo) => {
                  return {
                    id: objetivo.id,
                    nombre: objetivo.descripcion,
                    estatus: 0,//objetivo.estatus,
                    link: `/indicador/objetivo/${objetivo.id}`,
                  };
                })
              );

              let lineas = response.data.lineas_estrategicas;
              setLineas(
                aspiraciones.map((linea) => {
                  return {
                    id: linea.id,
                    nombre: linea.descripcion,
                    estatus: 0,//linea.estatus,
                    link: `/indicador/linea/${linea.id}`,
                  };
                })
              );
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Panel>
      <UserHeader />
      <Lista titulo="Aspiración" titulo_accion="Estado" filas={aspiraciones} />
      <Lista titulo="Objectivo" titulo_accion="Estado" filas={objetivos} />
      <Lista
        titulo="Líneas estratégicas"
        titulo_accion="Estado"
        filas={lineas}
      />
      <div className="bottom_button">
        <button className="Button morado">Documentación</button>
        <Link className="link_router" to="/rondas">
          <button className="Button azul">Salir</button>
        </Link>
      </div>
    </Panel>
  );
}

export default Ronda;
