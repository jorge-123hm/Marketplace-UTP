// Obtener carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Actualizar contador del navbar
function actualizarContadorCarrito() {

    const carrito = obtenerCarrito();

    const total = carrito.reduce((suma, producto) => {
        return suma + producto.cantidad;
    }, 0);

    const contador = document.getElementById("contadorCarrito");

    if (contador) {
        contador.textContent = total;
    }

}

const tablaCarrito = document.getElementById("tablaCarrito");
const totalCarrito = document.getElementById("totalCarrito");

async function cargarCarrito() {

    if (!tablaCarrito) return;
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        tablaCarrito.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">
                    Tu carrito está vacío.
                </td>
            </tr>
        `;
        totalCarrito.textContent = "S/ 0.00";
        return;
    }
    try {
        const respuesta = await fetch("http://localhost:3000/api/productos/carrito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ids: carrito.map(item => item.id)
            })
        });

        const productos = await respuesta.json();
        tablaCarrito.innerHTML = "";
        let total = 0;
        productos.forEach(producto => {
            const item = carrito.find(i => i.id === producto._id);
            const subtotal = producto.precio * item.cantidad;
            total += subtotal;
            tablaCarrito.innerHTML += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td>S/ ${producto.precio}</td>
                    <td>${item.cantidad}</td>
                    <td>S/ ${subtotal.toFixed(2)}</td>
                    <td>
                        <button
                            class="btn btn-success btn-sm"
                            onclick="aumentarCantidad('${producto._id}')">
                            +
                        </button>
                        <button
                            class="btn btn-warning btn-sm"
                            onclick="disminuirCantidad('${producto._id}')">
                            -
                        </button>
                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarProducto('${producto._id}')">
                            🗑
                        </button>
                    </td>
                </tr>
            `;
        });

        totalCarrito.textContent = `S/ ${total.toFixed(2)}`;
    } catch (error) {
        console.error(error);
    }
}

function aumentarCantidad(id) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);
    producto.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    cargarCarrito();
}

function disminuirCantidad(id) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter(item => item.id !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    cargarCarrito();

}

function eliminarProducto(id) {
    const carrito = obtenerCarrito().filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    cargarCarrito();

}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
    cargarCarrito();
}

cargarCarrito();

actualizarContadorCarrito();