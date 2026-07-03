const express = require("express");

const router = express.Router();

const {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosCarrito
} = require("../controllers/productoController");

router.post("/carrito", obtenerProductosCarrito);
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

module.exports = router;