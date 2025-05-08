require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose'); // Para validar ObjectId
const Vendedor = require("../models/vendedores");

// Prueba
const pruebaVendedores = async (req, res) => {
    res.status(200).send({ message: "Prueba Vendedores" });
};

// Registrar vendedor
const registrar = async (req, res) => {
    const { nombre, apellido, email, telefono, password } = req.body;

    if (!nombre || !apellido || !email || !telefono || !password) {
        return res.status(400).json({ status: "error", message: "Faltan datos" });
    }

    try {
        let vendedoresExistentes = await Vendedor.find({
            $or: [{ email }, { telefono }]
        }).exec();

        if (vendedoresExistentes.length > 0) {
            return res.status(400).json({ status: "error", message: "El vendedor ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const vendedor = new Vendedor({
            nombre,
            apellido,
            email,
            telefono,
            password: hashedPassword
        });

        await vendedor.save();

        // Obtener lista actualizada de vendedores
        const vendedores = await Vendedor.find().sort({ fechaCreacion: -1 });

        // Generar Token JWT
        const token = jwt.sign(
            { id: vendedor._id, email: vendedor.email },
            process.env.SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRATION || "7d" }
        );

        return res.status(201).json({ status: "success", vendedor, vendedores, token });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al guardar el vendedor", error: error.message });
    }
};

// Eliminar vendedor
const eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        let vendedor = await Vendedor.findById(id).exec();
        if (!vendedor) {
            return res.status(404).json({ status: "error", message: "Vendedor no encontrado" });
        }

        await Vendedor.deleteOne({ _id: id });

        return res.status(200).json({ status: "success", message: "Vendedor eliminado", vendedor });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al eliminar el vendedor", error: error.message });
    }
};

// Editar vendedor
const editar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "ID inválido" });
        }

        const { nombre, apellido, email, telefono, password } = req.body;

        if (!nombre && !apellido && !email && !telefono && !password) {
            return res.status(400).json({ status: "error", message: "No hay datos para actualizar" });
        }

        const updateFields = { nombre, apellido, email, telefono };

        // Si se proporciona una nueva contraseña, la hasheamos
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const vendedor = await Vendedor.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!vendedor) {
            return res.status(404).json({ status: "error", message: "Vendedor no encontrado" });
        }

        return res.status(200).json({ status: "success", vendedor });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al editar el vendedor", error: error.message });
    }
};

const obtenerVendedor = async (req, res) => {
    try {
        
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({status: "error", message: "ID inválido"});
        }

        const vendedor = await Vendedor.findById(id)

        if(!vendedor){
            return res.status(404).json({status: "error", message: "Vendedor no encontrado"});
        }

        return res.status(200).json({status: "success", vendedor});


    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al obtener el vendedor", error: error.message });
    }
}

const obtenerVendedores = async (req, res) => {
    try {
        
        const {page = 1, limit = 10} = req.query;

        const vendedores = await Vendedor.find().sort({fechaCreacion : -1}).limit(limit * 1).skip((page - 1) * Number(limit));

        return res.status(200).json({status: "success", vendedores});

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al obtener los vendedores", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Faltan datos" });
        }

        const vendedor = await Vendedor.findOne({ email });
        if (!vendedor) {
            return res.status(404).json({ status: "error", message: "Vendedor no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, vendedor.password);
        if (!validPassword) {
            return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: vendedor._id, email: vendedor.email },
            process.env.SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRATION || "7d" }
        );

        return res.status(200).json({ status: "success", token, vendedor });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error en el login", error: error.message });
    }
};

const cambiarPassword = async (req, res) => {
    try {
        const { id } = req.vendedor; // Extrae el ID del usuario autenticado (desde el token)
        const { oldPassword, newPassword } = req.body;

        // Validar que los campos estén completos
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ status: "error", message: "Faltan datos" });
        }

        // Validar longitud mínima de la nueva contraseña
        if (newPassword.length < 6) {
            return res.status(400).json({ status: "error", message: "La nueva contraseña debe tener al menos 6 caracteres" });
        }

        // Buscar al vendedor en la base de datos
        const vendedor = await Vendedor.findById(id);
        if (!vendedor) {
            return res.status(404).json({ status: "error", message: "Vendedor no encontrado" });
        }

        // Verificar que la contraseña actual sea correcta
        const validPassword = await bcrypt.compare(oldPassword, vendedor.password);
        if (!validPassword) {
            return res.status(401).json({ status: "error", message: "Contraseña antigua incorrecta" });
        }

        // Evitar que el usuario use la misma contraseña
        const passwordMatches = await bcrypt.compare(newPassword, vendedor.password);
        if (passwordMatches) {
            return res.status(400).json({ status: "error", message: "La nueva contraseña no puede ser igual a la actual" });
        }

        // Hashear la nueva contraseña con mayor seguridad
        const saltRounds = 12; // Aumenta la seguridad del hash
        vendedor.password = await bcrypt.hash(newPassword, saltRounds);

        // Guardar la nueva contraseña
        await vendedor.save();

        return res.status(200).json({ status: "success", message: "Contraseña actualizada correctamente" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error al cambiar contraseña", error: error.message });
    }
};


module.exports = {
    pruebaVendedores,
    registrar,
    eliminar,
    editar,
    obtenerVendedor,
    obtenerVendedores,
    login,
    cambiarPassword
};
