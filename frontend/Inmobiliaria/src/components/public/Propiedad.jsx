import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

export const Propiedad = () => {
  const { id } = useParams(); // 🔥 Obtiene el ID de la URL
  const navigate = useNavigate(); // Para regresar a la página anterior
  const [propiedad, setPropiedad] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPropiedad = async () => {
      try {
        const url = `http://localhost:3900/api/propiedades/obtener-propiedad/${id}`;
        const peticion = await fetch(url);

        if (!peticion.ok) {
          throw new Error(`Error en la petición: ${peticion.status}`);
        }

        const datos = await peticion.json();
        if (datos.status === "success") {
          setPropiedad(datos.propiedad);
        }
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      } finally {
        setCargando(false); // 🔥 Desactiva el estado de carga
      }
    };

    obtenerPropiedad();
  }, [id]);

  if (cargando) {
    return <p className="cargando">Cargando propiedad...</p>;
  }

  return (
    <div className="propiedad-container">
      <h2>{propiedad?.titulo}</h2>
      <p className="propiedad-precio">Precio: $ {propiedad?.precio}</p>
      <p className="propiedad-descripcion">Descripción: {propiedad?.descripcion}</p>
      
      {/* 🔥 Verifica si hay vendedor antes de mostrarlo */}
      {propiedad?.vendedor ? (
        <p className="propiedad-vendedor">
          Vendedor: {propiedad.vendedor.nombre} {propiedad.vendedor.apellido}
        </p>
      ) : (
        <p className="propiedad-vendedor">Vendedor: No disponible</p>
      )}

      <img 
        src={`http://localhost:3900/api/propiedades/obtener-imagen/${propiedad?.imagen}`} 
        alt={propiedad?.titulo} 
        className="propiedad-imagen" 
      />
    </div>
  );
};
