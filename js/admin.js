const formulario = document.getElementById("formProducto");
let productoEditando = null;
let listaProductos = [];
const btnGuardar = document.getElementById("btnGuardar");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const datos = new FormData();
    datos.append("nombre", document.getElementById("nombre").value);
    datos.append("descripcion", document.getElementById("descripcion").value);
    datos.append("precio", document.getElementById("precio").value);
    datos.append("categoria", document.getElementById("categoria").value);
    datos.append("stock", document.getElementById("stock").value);
    datos.append("estado", document.getElementById("estado").value);
    const imagen = document.getElementById("imagen").files[0];
    if (imagen) {
        datos.append("imagen", imagen);
    }
    try {
        let url = "http://localhost:3000/api/productos";
        let metodo = "POST";
        if (productoEditando) {
            url += "/" + productoEditando;
            metodo = "PUT";
        }
        const respuesta = await fetch(url, {
            method: metodo,
            body: datos
        });
        const resultado = await respuesta.json();
        alert(resultado.mensaje);
        formulario.reset();
        productoEditando = null;
        btnGuardar.textContent = "Agregar Producto";
        cargarProductos();
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error.");
    }
});

async function cargarProductos() {
    const respuesta = await fetch("http://localhost:3000/api/productos");
    listaProductos = await respuesta.json();
    const tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";
    mostrarProductos(listaProductos);
}

function mostrarProductos(productos) {
    const tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";
    productos.forEach(producto => {
        tabla.innerHTML += `
            <tr>
                <td>
                    <img src="img/${producto.imagen}" width="80">
                </td>
                <td>${producto.nombre}</td>
                <td>S/ ${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td>${producto.stock}</td>
                <td>${producto.estado}</td>
                <td>
                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editarProducto('${producto._id}')">
                        Editar
                    </button>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarProducto('${producto._id}')">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

async function editarProducto(id) {
    const respuesta = await fetch(
        "http://localhost:3000/api/productos/" + id
    );
    const producto = await respuesta.json();
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("estado").value = producto.estado;
    productoEditando = producto._id;
    btnGuardar.textContent = "Actualizar Producto";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function eliminarProducto(id) {
    const confirmar = confirm(
        "¿Desea eliminar este producto?"
    );
    if (!confirmar) return;
    const respuesta = await fetch(
        "http://localhost:3000/api/productos/" + id,
        {
            method: "DELETE"
        }
    );
    const resultado = await respuesta.json();
    alert(resultado.mensaje);
    cargarProductos();
}

document.getElementById("buscarProducto").addEventListener("input", function () {
    const texto = this.value.toLowerCase();
    const filtrados = listaProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
});

cargarProductos();