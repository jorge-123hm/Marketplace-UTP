const idsDestacados = [
    "6a472d0f587f56b3ac3607a9",
    "6a474aa2587f56b3ac3607b0",
    "6a474d73587f56b3ac3607c2"
];

const contenedor = document.getElementById("productosDestacados");

async function cargarDestacados() {
    try {
        const respuesta = await fetch("http://localhost:3000/api/productos/destacados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ids: idsDestacados
            })
        });
        const productos = await respuesta.json();
        contenedor.innerHTML = "";
        productos.forEach(producto => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
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
    } catch (error) {
        console.error("Error al cargar productos destacados:", error);
    }
}

cargarDestacados();