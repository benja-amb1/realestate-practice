import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const EditarPropiedad = () => {
    const { id } = useParams(); // Obtener el ID de la propiedad desde la URL
    const [propiedad, setPropiedad] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        vendedor: '',
        imagen: null
    });
    const [vendedores, setVendedores] = useState([]);
    const [mensajeExito, setMensajeExito] = useState('');
    const [errorMensaje, setErrorMensaje] = useState('');

    useEffect(() => {
        obtenerPropiedad();
        obtenerVendedores();
    }, []);

    const obtenerPropiedad = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3900/api/propiedades/obtener-propiedad/${id}`);
            const data = await respuesta.json();
            if (data.status === 'success') {
                setPropiedad({
                    titulo: data.propiedad.titulo,
                    descripcion: data.propiedad.descripcion,
                    precio: data.propiedad.precio,
                    vendedor: data.propiedad.vendedor._id,  // Guardamos el ID del vendedor
                    imagen: null
                });
            } else {
                setErrorMensaje('No se pudo obtener la propiedad.');
            }
        } catch (error) {
            setErrorMensaje('Error al obtener la propiedad.');
        }
    };

    const obtenerVendedores = async () => {
        try {
            const respuesta = await fetch('http://localhost:3900/api/vendedores/obtener-vendedores');
            const data = await respuesta.json();
            if (data.status === 'success') {
                setVendedores(data.vendedores);
            }
        } catch (error) {
            setErrorMensaje('Error al obtener vendedores.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropiedad((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setPropiedad((prev) => ({
            ...prev,
            imagen: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', propiedad.titulo);
        formData.append('descripcion', propiedad.descripcion);
        formData.append('precio', propiedad.precio);
        formData.append('vendedor', propiedad.vendedor);
        if (propiedad.imagen) {
            formData.append('imagen', propiedad.imagen);
        }

        try {
            const respuesta = await fetch(`http://localhost:3900/api/propiedades/editar-propiedad/${id}`, {
                method: 'PUT',
                body: formData
            });

            const data = await respuesta.json();

            if (data.status === 'success') {
                setMensajeExito('Propiedad actualizada correctamente.');
                setErrorMensaje('');
            } else {
                setErrorMensaje('Error al actualizar la propiedad.');
            }
        } catch (error) {
            setErrorMensaje('Error en la solicitud.');
        }
    };

    return (
        <>
            <div className="btn-volver-container">
                <NavLink to="/admin" className="btn-volver">Volver</NavLink>
            </div>

            <div className="crear-propiedad-container">
                <h2>Editar Propiedad</h2>

                {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
                {errorMensaje && <div className="mensaje-error">{errorMensaje}</div>}

                <form className="crear-propiedad-form" onSubmit={handleSubmit}>
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Título"
                        value={propiedad.titulo}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="descripcion">Descripción</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        placeholder="Descripción"
                        value={propiedad.descripcion}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="precio">Precio</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        placeholder="Precio"
                        value={propiedad.precio}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="vendedor">Vendedor</label>
                    <select
                        id="vendedor"
                        name="vendedor"
                        value={propiedad.vendedor}
                        onChange={handleChange}
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
                        onChange={handleFileChange}
                    />

                    <input type="submit" value="Actualizar Propiedad" />
                </form>
            </div>
        </>
    );
};
