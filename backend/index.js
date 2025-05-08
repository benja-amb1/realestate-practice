const connection = require("./connection/connection");
const express = require("express");
const cors = require("cors");

const app = express();
const puerto = 3900;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas prueba
app.get('/ruta-prueba', (req, res) => {
    res.status(200).json({message: "Ruta Prueba"});
});

// Cargar config de rutas
const vendedoresRoutes = require("./routes/vendedores");
const propiedadesRoutes = require("./routes/propiedades");
app.use("/api/vendedores", vendedoresRoutes);
app.use("/api/propiedades", propiedadesRoutes);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})

connection();