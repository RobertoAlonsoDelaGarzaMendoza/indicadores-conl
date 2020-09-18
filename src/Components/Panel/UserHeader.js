import React from 'react'

function UserHeader({usuario}) {
    return (
        <div className="panel_usuario_informacion">
          <div className="informacion">
            <h2 className="usuario_informacion">Bienvenido Usuario:</h2>
            <h2 className="usuario_informacion nombre">{usuario.nombre}</h2>
            <h2 className="usuario_informacion puesto"> {usuario.puesto}</h2>
          </div>
        </div>
    )
}

export default UserHeader
