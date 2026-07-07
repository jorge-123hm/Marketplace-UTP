require("dotenv").config();

const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/db");

const app = express();

// Conectar a MongoDB
conectarDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", require("./routes/productos"));

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutado en http://localhost:${PORT}`);
});