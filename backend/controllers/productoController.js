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

module.exports = {
    obtenerProductos
};