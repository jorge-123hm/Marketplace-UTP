// Mensaje al cargar la pagina
console.log("Bienvenido a UTP Ventas");
// Mostrar un mensaje al hacer clic en un botón
const botones = document.querySelectorAll(".btn-danger");
botones.forEach(function(boton) {
    boton.addEventListener("click", function() {
        alert("Esta funcion estara disponible en el siguiente avance del proyecto, que ahora solo es el 30%.");
    });
});