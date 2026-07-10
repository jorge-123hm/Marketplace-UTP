const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosCarrito,
    obtenerProductosPorCategoria,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productoController");

router.get("/categoria/:categoria", obtenerProductosPorCategoria);
router.post("/destacados", obtenerProductosCarrito);
router.post("/carrito", obtenerProductosCarrito);
router.get("/", obtenerProductos);
router.post("/",upload.single("imagen"),agregarProducto);
router.put("/:id",upload.single("imagen"),actualizarProducto);
router.delete("/:id",eliminarProducto);
router.get("/:id", obtenerProductoPorId);

module.exports = router;