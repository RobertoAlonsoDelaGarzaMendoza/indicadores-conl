import React from 'react'
import { useSelector } from 'react-redux';

function UserHeader() {
  const user = useSelector((state) => state.user);

    return (
        <div className="panel_usuario_informacion">
          <div className="informacion">
            <h2 className="usuario_informacion">Bienvenido Usuario:</h2>
            <h2 className="usuario_informacion nombre">{user.nombre}</h2>
            <h2 className="usuario_informacion puesto"> {user.puesto}</h2>
          </div>
        </div>
    )
}

export default UserHeader
