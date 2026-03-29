/*login*/
// ===== CREAR CONTENEDOR SI NO EXISTE =====
function obtenerContenedorToast() {

    let contenedor = document.querySelector(".toast-container");

    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.className = "toast-container";
        document.body.appendChild(contenedor);
    }

    return contenedor;
}

// ===== MOSTRAR TOAST =====
function mostrarToast(mensaje, tipo = "info") {

    const contenedor = obtenerContenedorToast();

    const toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;

    contenedor.appendChild(toast);

    // 🔥 AUTO ELIMINAR
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s ease forwards";

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}


/*productos carrito*/
function mostrarToast_productos_carrito_login({
    titulo = "",
    mensaje = "",
    tipo = "success",
    duracion = 3000
}) {

    const toast = document.createElement("div");
    toast.className = `toast_productos_carrito_login ${tipo}`;

    toast.innerHTML = `
        <div class="toast-contenido">
            <strong>${titulo}</strong>
            <p>${mensaje}</p>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duracion);
}