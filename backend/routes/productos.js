const express = require("express");

const router = express.Router();

const {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosCarrito,
    obtenerProductosPorCategoria
} = require("../controllers/productoController");

router.get("/categoria/:categoria", obtenerProductosPorCategoria);
router.post("/destacados", obtenerProductosCarrito);
router.post("/carrito", obtenerProductosCarrito);
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

module.exports = router;