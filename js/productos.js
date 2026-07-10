const contenedor = document.getElementById("contenedorProductos");
let productosOriginales = [];
const parametros = new URLSearchParams(window.location.search);
const categoria = parametros.get("categoria");

if (categoria) {

    document.getElementById("tituloCategoria").textContent =
        `Categoría: ${categoria}`;

}

async function cargarProductos() {

    try {

        let url = "http://localhost:3000/api/productos";
        if (categoria) {
            url = `http://localhost:3000/api/productos/categoria/${categoria}`;
        }
        const respuesta = await fetch(url);
        const productos = await respuesta.json();
        productosOriginales = productos;

        contenedor.innerHTML = "";
        mostrarProductos(productos);

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Error al cargar los productos.
                </div>
            </div>
        `;
    }

}

function mostrarProductos(productos) {

    contenedor.innerHTML = "";
    productos.forEach((producto, index) => {
        contenedor.innerHTML += `
            <div class="col-md-4 mb-4 animar-producto" style="animation-delay:${index * 0.08}s">
                <div class="card h-100 shadow-sm">
                    <img
                        src="img/${producto.imagen}"
                        class="card-img-top"
                        alt="${producto.nombre}">
                    <div class="card-body text-center d-flex flex-column">
                        <h5>${producto.nombre}</h5>
                        <p>S/ ${producto.precio}</p>
                        <a
                            href="detalle.html?id=${producto._id}"
                            class="btn btn-danger mt-auto">
                            Ver detalle
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

const buscador = document.getElementById("buscador");

if (buscador) {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const productosFiltrados = productosOriginales.filter(producto =>
            producto.nombre.toLowerCase().includes(texto)
        );
        mostrarProductos(productosFiltrados);
    });
}

cargarProductos();