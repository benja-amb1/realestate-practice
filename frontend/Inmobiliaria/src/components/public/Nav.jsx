import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export const Nav = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // ✅ Actualiza el estado sin recargar la página
  };

  return (
    <div>
      <header className="header">
        <NavLink to="/">InmobiliariaPedro</NavLink>
      </header>

      <div className="nav">
        <nav>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/sobre-nosotros">Sobre Nosotros</NavLink>
          <NavLink to="/propiedades">Propiedades</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>

          {/* Si el usuario está autenticado, mostrar "Cerrar sesión" */}
          {isAuthenticated && (
            <>
            <NavLink to="/admin">Administrar</NavLink>
            <button className="btn-logout" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
