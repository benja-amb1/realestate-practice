import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const EditarVendedor = () => {
    const { id } = useParams(); // Obtener el ID del vendedor desde la URL

    // Estado inicial del vendedor
    const [vendedor, setVendedor] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: ''
    });
    const [mensajeExito, setMensajeExito] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");

    // Efecto para obtener la información del vendedor
    useEffect(() => {
        obtenerVendedor();
    }, []);

    const obtenerVendedor = async () => {
        const url = `http://localhost:3900/api/vendedores/obtener-vendedor/${id}`;
        
        try {
            const peticion = await fetch(url, {
                method: "GET"
            });
            
            if (!peticion.ok) {
                setErrorMensaje("Error al obtener el vendedor");
                return;
            }

            const data = await peticion.json();
            if (data.status === "success") {
                setVendedor({
                    nombre: data.vendedor.nombre,
                    apellido: data.vendedor.apellido,
                    email: data.vendedor.email,
                    telefono: data.vendedor.telefono,
                    password: data.vendedor.password // Asegúrate de que este campo esté correctamente manejado
                });
            }
        } catch (error) {
            setErrorMensaje("Error al obtener los datos del vendedor.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendedor((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el envío del formulario

        // Crear el objeto con los datos que se enviarán al backend
        const data = {
            nombre: vendedor.nombre,
            apellido: vendedor.apellido,
            email: vendedor.email,
            telefono: vendedor.telefono,
            password: vendedor.password // Si quieres actualizar la contraseña
        };

        try {
            const url = `http://localhost:3900/api/vendedores/editar-vendedor/${id}`;
            const peticion = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json', // Establecer el encabezado para JSON
                },
                body: JSON.stringify(data) // Enviar los datos como un objeto JSON
            });

            const response = await peticion.json();

            if (response.status === 'success') {
                setMensajeExito("Vendedor actualizado correctamente.");
                setErrorMensaje("");
            } else {
                setErrorMensaje("Error al editar el vendedor.");
            }
        } catch (error) {
            setErrorMensaje("Error al editar el vendedor.");
        }
    };

    return (
        <>
            <div className="btn-volver-container">
                <NavLink to='/admin' className="btn-volver">Volver</NavLink>
            </div>

            <div className="crear-propiedad-container">
                <h2>Editar Vendedor</h2>

                {/* Mensaje de éxito */}
                {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}

                {/* Mensaje de error */}
                {errorMensaje && <div className="mensaje-error">{errorMensaje}</div>}

                <form className="crear-propiedad-form" onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        value={vendedor.nombre} // Aquí usamos el valor del estado `vendedor`
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        placeholder="Apellido"
                        value={vendedor.apellido} // Aquí usamos el valor del estado `vendedor`
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={vendedor.email} // Aquí usamos el valor del estado `vendedor`
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="telefono">Telefono</label>
                    <input
                        type="number"
                        id="telefono"
                        name="telefono"
                        placeholder="Telefono"
                        value={vendedor.telefono} // Aquí usamos el valor del estado `vendedor`
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        required
                    />

                    <input type="submit" value="Actualizar Vendedor" />
                </form>
            </div>
        </>
    );
};
