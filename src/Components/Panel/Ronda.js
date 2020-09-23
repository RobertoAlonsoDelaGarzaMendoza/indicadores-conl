import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setRonda } from "../../Redux/Actions";
import Api from "../../Restful/Api";
import Lista from "./Lista";
import Panel from "./Panel";
import UserHeader from "./UserHeader";

function Ronda() {
  const ronda = useSelector((state) => state.ronda);
  const rondas = useSelector((state) => state.rondas);
  const dispatch = useDispatch();
  let { id } = useParams();
  const [aspiraciones, setAspiraciones] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [lineas, setLineas] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTipoRonda = (tipo_ronda) => {
    switch (tipo_ronda) {
      case 0:
        return "indicador";
      case 1:
        return "meta";
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
        console.log(response);
        switch (response.status) {
          case 200:
            let aspiraciones = response.data.aspiraciones;
            setAspiraciones(
              aspiraciones.map((aspiracion) => {
                return {
                  id: aspiracion.id,
                  nombre: aspiracion.descripcion,
                  estatus: 0, //aspiracion.estatus,
                  link: `/${getTipoRonda(t_ronda.tipo_ronda)}/aspiracion/${
                    aspiracion.id
                  }`,
                };
              })
            );

            let objectivos = response.data.objetivos;
            setObjetivos(
              objectivos.map((objetivo) => {
                return {
                  id: objetivo.id,
                  nombre: objetivo.descripcion,
                  estatus: 0, //objetivo.estatus,
                  link: `/${getTipoRonda(t_ronda.tipo_ronda)}/objetivo/${
                    objetivo.id
                  }`,
                };
              })
            );

            setLineas(
              aspiraciones.map((linea) => {
                return {
                  id: linea.id,
                  nombre: linea.descripcion,
                  estatus: 0, //linea.estatus,
                  link: `/${getTipoRonda(t_ronda.tipo_ronda)}/linea/${linea.id}`,
                };
              })
            );
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [ronda]);

  return (
    <Panel>
      <UserHeader />
      <Lista
        nombre={ronda.descripcion}
        loading={loading}
        titulo="Aspiración"
        titulo_accion="Estado"
        filas={aspiraciones}
      />
      <Lista
        loading={loading}
        titulo="Objectivo"
        titulo_accion="Estado"
        filas={objetivos}
      />
      <Lista
        loading={loading}
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
