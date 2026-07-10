const Producto = require("../models/Producto");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find();

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener productos"
        });

    }

};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {

    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener el producto"
        });
    }
};

// Obtener varios productos para el carrito
const obtenerProductosCarrito = async (req, res) => {

    try {
        const { ids } = req.body;
        const productos = await Producto.find({
            _id: { $in: ids }
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los productos del carrito"
        });
    }

};

const obtenerProductosPorCategoria = async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const productos = await Producto.find({
            categoria: categoria
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener productos"
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosCarrito,
    obtenerProductosPorCategoria
};