const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const PropiedadesController = require("../controllers/propiedades");

// Configurar Multer para la subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/propiedades")); // Ruta correcta
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"), false);
    }
};

const upload = multer({ storage, fileFilter });

// 🔗 Definición de rutas
router.get("/prueba-propiedades", PropiedadesController.pruebaPropiedad);

router.post("/registrar-propiedad", upload.single("imagen"), PropiedadesController.registrarPropiedad);
router.put("/editar-propiedad/:id", upload.single('imagen'), PropiedadesController.editarPropiedad);
router.delete("/eliminar-propiedad/:id", PropiedadesController.eliminarPropiedad);

router.get("/listar-propiedades", PropiedadesController.listarPropiedades);
router.get("/obtener-propiedad/:id", PropiedadesController.obtenerPropiedad);

router.post("/subir-imagen/:id", upload.single("imagen"), PropiedadesController.subirImagen);
router.get("/obtener-imagen/:filename", PropiedadesController.obtenerImagen);

module.exports = router;
