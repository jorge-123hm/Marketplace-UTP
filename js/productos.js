const contenedor = document.getElementById("contenedorProductos");

async function cargarProductos() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/productos");
        const productos = await respuesta.json();

        contenedor.innerHTML = "";
        productos.forEach(producto => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="img/${producto.imagen}"
                            class="card-img-cover"
                            alt="${producto.nombre}">
                        <div class="card-body text-center d-flex flex-column">
                            <h5>${producto.nombre}</h5>
                            <p class="text-muted">
                                S/ ${producto.precio}
                            </p>
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

cargarProductos();