import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const CrearPropiedad = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [vendedor, setVendedor] = useState("");
    const [imagen, setImagen] = useState(null);
    const [vendedores, setVendedores] = useState([]); // Estado para almacenar los vendedores
    const [mensajeExito, setMensajeExito] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");

    // Obtener vendedores de la BD cuando se monta el componente
    useEffect(() => {
        const obtenerVendedores = async () => {
            try {
                const res = await fetch("http://localhost:3900/api/vendedores/obtener-vendedores"); // URL del endpoint de vendedores
                const data = await res.json();

                if (data.status === "success") {
                    setVendedores(data.vendedores); // Guardamos la lista de vendedores en el estado
                }
            } catch (error) {
                console.error("Error al obtener los vendedores:", error);
            }
        };

        obtenerVendedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMensaje("");

        let url = "http://localhost:3900/api/propiedades/registrar-propiedad";

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("vendedor", vendedor);
        formData.append("imagen", imagen);
        

        try {
            const peticion = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!peticion.ok) {
                throw new Error("Error al registrar la propiedad");
            }

            let data = await peticion.json();

            if (data.status === "success") {
                setTitulo("");
                setDescripcion("");
                setPrecio("");
                setVendedor("");
                setImagen(null);
                setMensajeExito("¡Propiedad registrada exitosamente!");

                setTimeout(() => setMensajeExito(""), 5000);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMensaje(error.message);
        }
    };

    return (
        <>
            <div className="btn-volver-container">
                <NavLink to='/admin' className="btn-volver">Volver</NavLink>
            </div>

            <div className="crear-propiedad-container">
                <h2>Crear Propiedad</h2>

                 {/* Mensaje de éxito */}
                 {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
                 {/* Mensaje de error */}
                {errorMensaje && <div className="mensaje-error">{errorMensaje}</div>}

                <form className="crear-propiedad-form" onSubmit={handleSubmit}>
                    <label htmlFor="titulo">Título</label>
                    <input 
                        type="text" 
                        id="titulo" 
                        name="titulo" 
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />

                    <label htmlFor="descripcion">Descripción</label>
                    <input 
                        type="text" 
                        id="descripcion" 
                        name="descripcion" 
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    <label htmlFor="precio">Precio</label>
                    <input 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />

                    <label htmlFor="vendedor">Vendedor</label>
                    <select 
                        id="vendedor" 
                        name="vendedor" 
                        value={vendedor} 
                        onChange={(e) => setVendedor(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un vendedor</option>
                        {vendedores.map((v) => (
                            <option key={v._id} value={v._id}>
                                {v.nombre} {v.apellido}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="imagen">Imagen</label>
                    <input 
                        type="file" 
                        id="imagen" 
                        name="imagen"
                        accept="image/*"
                        onChange={(e) => setImagen(e.target.files[0])}
                        required
                    />

                    <input type="submit" value="Guardar Propiedad" />
                </form>
            </div>
        </>
    );
};
