import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export const Propiedades = () => {

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
          setPropiedades(datos.propiedades.docs); 
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
      <section className="propiedades-lista">
        <h2>Propiedades disponibles</h2>
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
                  <p>$ {propiedad.precio}</p>
                </NavLink>
              ))}
            </div>
          </div> 
        ) : (
        <p>No hay propiedades disponibles.</p> 
        )}
      </section>
    </>
  );
}
