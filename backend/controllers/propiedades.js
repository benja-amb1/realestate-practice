const Propiedad = require("../models/propiedades");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

//Prueba
const pruebaPropiedad = async(req, res) => {
    return res.status(200).send({message: "Prueba Propiedad"});
}

// Registro de propiedades
const registrarPropiedad = async (req, res) => {
    try {
        const params = req.body;

        // Validar datos obligatorios
        if (!params.titulo || !params.descripcion || !params.precio || !params.vendedor) {
            return res.status(400).json({ status: "error", message: "Faltan datos" });
        }

        // Validar que el precio sea un número
        if (isNaN(params.precio)) {
            return res.status(400).json({ status: "error", message: "El precio debe ser un número válido" });
        }

        // Si hay imagen, agregarla a la propiedad
        let imagen = req.file ? req.file.filename : null;

        // Crear y guardar la propiedad
        let propiedad = new Propiedad({ ...params, imagen });
        await propiedad.save();

        return res.status(200).json({ status: "success", propiedad });

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al guardar la propiedad", error: error.message });
    }
};

const eliminarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es válido de MongoDB
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        // Buscar la propiedad
        const propiedad = await Propiedad.findById(id).exec();
        if (!propiedad) {
            return res.status(404).json({ status: "error", message: "Propiedad no encontrada" });
        }

        // Eliminar la propiedad de forma segura
        await Propiedad.deleteOne({ _id: id });

        return res.status(200).json({ status: "success", message: "Propiedad eliminada", propiedad });

    } catch (error) {
        console.error("Error al eliminar propiedad:", error);
        return res.status(500).json({ status: "error", message: "Error interno del servidor", error: error.message });
    }
};

const editarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, precio, vendedor } = req.body;

        const updateData = { titulo, descripcion, precio, vendedor };

        // Si se ha subido una nueva imagen, actualízala
        if (req.file) {
            updateData.imagen = req.file.filename;
        }

        const propiedad = await Propiedad.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!propiedad) {
            return res.status(404).json({ status: "error", message: "Propiedad no encontrada" });
        }

        return res.status(200).json({ status: "success", propiedad });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al editar la propiedad", error: error.message });
    }
};


const listarPropiedades = async (req, res) => {
    try {
        // Parámetros opcionales con valores por defecto
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', minPrice, maxPrice } = req.query;

        // Construcción del filtro dinámico
        let filter = {};
        if (minPrice) filter.precio = { ...filter.precio, $gte: Number(minPrice) };
        if (maxPrice) filter.precio = { ...filter.precio, $lte: Number(maxPrice) };

        // Opciones de paginación con populate
        const options = {
            page: Number(page),
            limit: Number(limit),
            sort: { [sortBy]: order === 'asc' ? 1 : -1 },
            populate: "vendedor"  // 👈 Esto trae los datos completos del vendedor
        };

        // Usar la paginación de mongoose-paginate-v2
        const propiedades = await Propiedad.paginate(filter, options);

        return res.status(200).json({ status: "success", propiedades });

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al listar las propiedades", error: error.message });
    }
};


const obtenerPropiedad = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar si el ID es un ObjectId válido de MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        // Buscar la propiedad en la base de datos
        const propiedad = await Propiedad.findById(req.params.id).populate("vendedor", "nombre apellido");

        // Si no existe la propiedad
        if (!propiedad) {
            return res.status(404).json({ status: "error", message: "Propiedad no encontrada" });
        }

        // Responder con la propiedad encontrada
        return res.status(200).json({ status: "success", propiedad });

    } catch (error) {
        console.error("Error al obtener la propiedad:", error);
        return res.status(500).json({ status: "error", message: "Error interno del servidor", error: error.message });
    }
};

// Subir Imagen para una Propiedad
const subirImagen = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar ID de MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        // Verificar si la propiedad existe
        const propiedad = await Propiedad.findById(id);
        if (!propiedad) {
            return res.status(404).json({ status: "error", message: "Propiedad no encontrada" });
        }

        // Verificar si se subió una imagen
        if (!req.file) {
            return res.status(400).json({ status: "error", message: "No se ha subido ninguna imagen" });
        }

        // Ruta de imágenes
        const uploadDir = path.join(__dirname, "../uploads/propiedades");

        // Eliminar imagen anterior si existe
        if (propiedad.imagen) {
            const oldImagePath = path.join(uploadDir, propiedad.imagen);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Guardar la nueva imagen en la base de datos
        propiedad.imagen = req.file.filename;
        await propiedad.save();

        return res.status(200).json({
            status: "success",
            message: "Imagen subida con éxito",
            imagenUrl: `${req.protocol}://${req.get("host")}/uploads/propiedades/${req.file.filename}`,
            propiedad
        });

    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return res.status(500).json({ status: "error", message: "Error al subir la imagen", error: error.message });
    }
};

const obtenerImagen = async (req, res) => {
    try {
        const { filename } = req.params;

        // Si no hay filename, devuelve error
        if (!filename) {
            return res.status(400).json({ status: "error", message: "Falta el nombre de la imagen en la URL" });
        }

        // Ruta completa de la imagen
        const imagePath = path.join(__dirname, "../uploads/propiedades", filename);

        // Verificar si el archivo existe
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ status: "error", message: "Imagen no encontrada" });
        }

        // Enviar la imagen como respuesta
        return res.sendFile(imagePath);

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al obtener la imagen", error: error.message });
    }
};



module.exports = {
    pruebaPropiedad,
    registrarPropiedad,
    eliminarPropiedad,
    editarPropiedad,
    listarPropiedades,
    obtenerPropiedad,
    subirImagen,
    obtenerImagen
}