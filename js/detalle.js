const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function cargarProducto() {

    try {

        const respuesta = await fetch(`http://localhost:3000/api/productos/${id}`);
        const producto = await respuesta.json();

        document.getElementById("imagenProducto").src = `img/${producto.imagen}`;

        document.getElementById("nombreProducto").textContent = producto.nombre;

        document.getElementById("precioProducto").textContent = `S/ ${producto.precio}`;

        document.getElementById("descripcionProducto").textContent = producto.descripcion;

        document.getElementById("estadoProducto").textContent = producto.estado;

        document.getElementById("categoriaProducto").textContent = producto.categoria;

        document.getElementById("stockProducto").textContent = producto.stock;

    } catch (error) {

        console.error(error);

        alert("No se pudo cargar el producto.");

    }

}

let productoActual = null;

async function cargarProducto() {

    try {

        const respuesta = await fetch(`http://localhost:3000/api/productos/${id}`);

        productoActual = await respuesta.json();

        document.getElementById("imagenProducto").src = `img/${productoActual.imagen}`;

        document.getElementById("nombreProducto").textContent = productoActual.nombre;

        document.getElementById("precioProducto").textContent = `S/ ${productoActual.precio}`;

        document.getElementById("descripcionProducto").textContent = productoActual.descripcion;

        document.getElementById("estadoProducto").textContent = productoActual.estado;

        document.getElementById("categoriaProducto").textContent = productoActual.categoria;

        document.getElementById("stockProducto").textContent = productoActual.stock;

    } catch (error) {

        console.log(error);

    }

}

const boton = document.getElementById("btnCarrito");

boton.addEventListener("click", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(item => item.id === productoActual._id);

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push({
            id: productoActual._id,
            cantidad: 1
        });

    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();

    const toast = new bootstrap.Toast(
        document.getElementById("toastCarrito")
    );

toast.show();

});

cargarProducto();