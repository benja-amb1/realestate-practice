import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Inicio = () => {
  const [propiedades, setPropiedades] = useState([]);

  const conseguirPropiedades = async () => {
    try {
      const url = "http://localhost:3900/api/propiedades/listar-propiedades";
      const peticion = await fetch(url, { method: "GET" });

      if (!peticion.ok) {
        throw new Error(`Error en la petición: ${peticion.status}`);
      }

      const datos = await peticion.json();

      if (datos.status === "success") {
        setPropiedades(datos.propiedades.docs.slice(0, 3)); // 🔥 Límite de 3 propiedades
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    conseguirPropiedades();
  }, []);

  return (
    <>
      <section>
        <h2 className="inicio-title">Bienvenidos a InmobiliariaPedro. ¡Las mejores propiedades al mejor precio!</h2>

        <h2 className="inicio-sub">¿Por qué elegirnos?</h2>

        <div className="grid-container">
          <div className="grid-item">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={48} height={48}  strokeWidth={0.75}> <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path> <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path> <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path> </svg>
            <p>Ofrecemos máxima seguridad en cada trámite y transacción.</p>
          </div>
          <div className="grid-item">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={48} height={48}  strokeWidth={0.75}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M12 12h3.5"></path> <path d="M12 7v5"></path> </svg> 
            <p>La espera no es un problema: ¡en InmobiliariaPedro todo es rápido y eficiente!</p>
          </div>
          <div className="grid-item">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokelinecap="round" strokelinejoin="round" width={48} height={48}  strokeWidth={0.75}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1"></path> <path d="M12 7v10"></path> </svg> 
            <p>Nos destacamos por ofrecer los precios más competitivos del mercado y las mejores ubicaciones del país.</p>
          </div>
        </div>
      </section>

      <section className="imagen-inicio">
        <div className="contenido">
          <h2>Para más información, completa el formulario de contacto.</h2>
          <NavLink to="/contacto" className="boton-contacto">Contacto</NavLink>
        </div>
      </section>

      <section className="propiedades-lista">
        <h2>Algunas de nuestras propiedades</h2>
        {propiedades.length > 0 ? (
          <div>
            <div className="propiedades-grid">
              {propiedades.map((propiedad) => (
                <NavLink key={propiedad._id} className="propiedad-card" to={`/propiedades/${propiedad._id}`}>
                  <img
                    src={`http://localhost:3900/api/propiedades/obtener-imagen/${propiedad.imagen}`}
                    alt={propiedad.titulo}
                    onError={(e) => (e.target.src = "URL_DE_IMAGEN_POR_DEFECTO")} // 🔥 Fallback de imagen
                  />
                  <h3>{propiedad.titulo}</h3>
                  <p>{propiedad.precio} $</p>
                </NavLink>
              ))}
            </div>
            {/* 🔥 Ahora está envuelto en un div */}
            <div className="ver-mas">
              <h3>¡Haz click aquí para ver todas las propiedades disponibles!</h3>
              <div className="div-boton-propiedades">
                <NavLink to="/propiedades" className="boton-propiedades">Propiedades</NavLink>
              </div>

            </div>
          </div>
        ) : (
          <p>No hay propiedades para mostrar.</p>
        )}
      </section>
    </>
  );
};
