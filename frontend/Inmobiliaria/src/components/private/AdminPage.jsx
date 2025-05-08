import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CrearVendedor } from "./CrearVendedor";

export default function AdminPage() {
  const [propiedades, setPropiedades] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(null); // Estado para confirmar eliminación de propiedades
  const [confirmarEliminacionVendedor, setConfirmarEliminacionVendedor] = useState(null); // Estado para confirmar eliminación de vendedores

  const conseguirPropiedades = async () => {
    try {
      let url = "http://localhost:3900/api/propiedades/listar-propiedades";
      let peticion = await fetch(url, { method: "GET" });

      if (!peticion.ok) {
        throw new Error("No se ha podido conseguir las propiedades.");
      }

      let data = await peticion.json();
      if (data.status === "success" && Array.isArray(data.propiedades.docs)) {
        setPropiedades(data.propiedades.docs);
      } else {
        setPropiedades([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const conseguirVendedores = async () => {
    try {
      let url = "http://localhost:3900/api/vendedores/obtener-vendedores";
      let peticion = await fetch(url, { method: "GET" });

      if (!peticion.ok) {
        throw new Error("No se ha podido conseguir los vendedores");
      }

      let data = await peticion.json();
      if (data.status === "success" && Array.isArray(data.vendedores)) {
        setVendedores(data.vendedores);
      } else {
        setVendedores([]);
      }
    } catch (error) {
      console.error(error);
      setVendedores([]);
    }
  };

  const eliminarPropiedad = async (id) => {
    try {
      let url = `http://localhost:3900/api/propiedades/eliminar-propiedad/${id}`;
      let peticion = await fetch(url, {
        method: "DELETE",
      });

      if (!peticion.ok) {
        throw new Error("No se pudo eliminar la propiedad.");
      }

      let data = await peticion.json();
      if (data.status === "success") {
        setPropiedades(propiedades.filter((propiedad) => propiedad._id !== id));
        setConfirmarEliminacion(null); // Oculta el botón de confirmación
      }
    } catch (error) {
      console.error("Error al eliminar la propiedad:", error);
    }
  };

  const eliminarVendedor = async (id) => {
    try {
      let url = `http://localhost:3900/api/vendedores/eliminar-vendedor/${id}`;
      let peticion = await fetch(url, {
        method: "DELETE",
      });

      if (!peticion.ok) {
        throw new Error("No se pudo eliminar el vendedor.");
      }

      let data = await peticion.json();
      if (data.status === "success") {
        setVendedores(vendedores.filter((vendedor) => vendedor._id !== id));
        setConfirmarEliminacionVendedor(null); // Oculta el botón de confirmación
      }
    } catch (error) {
      console.error("Error al eliminar el vendedor:", error);
    }
  };

  useEffect(() => {
    conseguirPropiedades();
    conseguirVendedores();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Administración</h2>
      <NavLink to="/crear-propiedad" className="btn-agregar">
        Agregar Propiedad
      </NavLink>
      <NavLink to="/crear-vendedor" className="btn-agregar">Agregar Vendedor</NavLink>

      {/* Sección de propiedades */}
      <section className="admin-section">
        <h3 className="admin-subtitle">Lista de Propiedades</h3>
        <div className="admin-titles">
          <p>ID</p>
          <p>Propiedad</p>
          <p>Vendedor</p>
          <p>Acciones</p>
        </div>

        {propiedades.length > 0 ? (
          propiedades.map((propiedad) => (
            <div key={propiedad._id} className="admin-item">
              <NavLink to={`/propiedades/${propiedad._id}`} className="propiedad-navlink">{propiedad._id}</NavLink>
              <p>{propiedad.titulo}</p>
              <p>
                {propiedad.vendedor?.nombre} {propiedad.vendedor?.apellido}
              </p>
              <div className="admin-actions">
              <NavLink to={`/editar-propiedad/${propiedad._id}`} className="btn btn-edit">Editar</NavLink>
                {confirmarEliminacion === propiedad._id ? (
                  <>
                    <button
                      className="btn btn-confirm"
                      onClick={() => eliminarPropiedad(propiedad._id)}
                    >
                      Confirmar Eliminación
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={() => setConfirmarEliminacion(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-delete"
                    onClick={() => setConfirmarEliminacion(propiedad._id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">Cargando propiedades...</p>
        )}
      </section>

      {/* Sección de vendedores */}
      <section className="admin-section">
        <h3 className="admin-subtitle">Lista de Vendedores</h3>
        <div className="admin-titles">
          <p>ID</p>
          <p>Nombre</p>
          <p>Apellido</p>
          <p>Email</p>
          <p>Teléfono</p>
          <p>Acciones</p>
        </div>

        {vendedores.length > 0 ? (
          vendedores.map((vendedor) => (
            <div key={vendedor._id} className="admin-item">
              <p>{vendedor._id}</p>
              <p>{vendedor.nombre}</p>
              <p>{vendedor.apellido}</p>
              <p>{vendedor.email}</p>
              <p>{vendedor.telefono}</p>
              <div className="admin-actions">
                <NavLink to={`/editar-vendedor/${vendedor._id}`} className="btn btn-edit">Editar</NavLink>
                {confirmarEliminacionVendedor === vendedor._id ? (
                  <>
                    <button
                      className="btn btn-confirm"
                      onClick={() => eliminarVendedor(vendedor._id)}
                    >
                      Confirmar Eliminación
                    </button>
                    <button
                      className="btn btn-cancel"
                      onClick={() => setConfirmarEliminacionVendedor(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-delete"
                    onClick={() => setConfirmarEliminacionVendedor(vendedor._id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">Cargando vendedores...</p>
        )}
      </section>
    </div>
  );
}
