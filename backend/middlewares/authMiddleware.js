require("dotenv").config();

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization"); // Solo extrae el token, sin modificarlo
    if (!token) {
        return res.status(401).json({ status: "error", message: "Acceso denegado, token requerido" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.vendedor = decoded; // Guarda los datos del usuario en `req`
        next();
    } catch (error) {
        return res.status(401).json({ status: "error", message: "Token inválido o expirado" });
    }

};

module.exports = authMiddleware;
