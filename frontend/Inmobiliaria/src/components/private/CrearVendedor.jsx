import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const CrearVendedor = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [vendedores, setVendedores] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMensaje("");

        const url = "http://localhost:3900/api/vendedores/registrar-vendedor";

        const vendedor = {
            nombre,
            apellido,
            email,
            telefono,
            password
        };

        try {
            const peticion = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vendedor),
            });

            const data = await peticion.json();
            console.log("Respuesta del servidor:", data);

            if (!peticion.ok) {
                throw new Error("Error al registrar el vendedor: " + data.message);
            }

            if (data.status === "success") {
                setNombre("");
                setApellido("");
                setEmail("");
                setTelefono("");
                setPassword("");
                setMensajeExito("¡Vendedor registrado exitosamente!");
            
                // Agregar el nuevo vendedor al inicio de la lista
                setVendedores((prevVendedores) => [data.vendedor, ...prevVendedores]);
            
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
                <h2>Crear Vendedor</h2>

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
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="telefono">Telefono</label>
                    <input
                        type="number"
                        id="telefono"
                        name="telefono"
                        placeholder="Telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input type="submit" value="Guardar Vendedor" />
                </form>
            </div>
        </>
    );
};
