import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

function UserHeader() {
  const user = useSelector((state) => state.user);

  return (
    <div className="panel_usuario_informacion">
      <div className="informacion">
        <Typography variant="h4" className="usuario_informacion">{`Bienvenid${
          user.sexo ? "a" : "o"
        }`}</Typography>
        <Typography variant="h4" className="usuario_informacion nombre">
          {user.nombre}
        </Typography>
        {/* <h2 className="usuario_informacion puesto"> {user.puesto}</h2> */}
      </div>
    </div>
  );
}

export default UserHeader;
