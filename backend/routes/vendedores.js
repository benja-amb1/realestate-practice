const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const VendedoresController = require("../controllers/vendedores");

router.get("/prueba-vendedores", VendedoresController.pruebaVendedores);
router.post("/registrar-vendedor", VendedoresController.registrar);
router.delete("/eliminar-vendedor/:id", VendedoresController.eliminar);
router.put("/editar-vendedor/:id", VendedoresController.editar);
router.get("/obtener-vendedor/:id", VendedoresController.obtenerVendedor);
router.get("/obtener-vendedores", VendedoresController.obtenerVendedores);
router.post("/login", VendedoresController.login); // Endpoint público para autenticarse
router.put("/cambiar-password", authMiddleware, VendedoresController.cambiarPassword); // Solo accesible con token

module.exports = router;