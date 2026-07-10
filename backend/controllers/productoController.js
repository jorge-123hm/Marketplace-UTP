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

const agregarProducto = async (req, res) => {
    try {
        const producto = new Producto({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            categoria: req.body.categoria,
            imagen: req.file.filename,
            stock: req.body.stock,
            estado: req.body.estado
        });
        await producto.save();
        res.status(201).json({
            mensaje: "Producto agregado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al agregar producto"
        });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }
        await Producto.findByIdAndDelete(req.params.id);
        res.json({
            mensaje: "Producto eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el producto"
        });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const datos = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            categoria: req.body.categoria,
            stock: req.body.stock,
            estado: req.body.estado
        };
        if (req.file) {
            datos.imagen = req.file.filename;
        }
        await Producto.findByIdAndUpdate(
            req.params.id,
            datos
        );
        res.json({
            mensaje: "Producto actualizado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar"
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerProductosCarrito,
    obtenerProductosPorCategoria,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
};