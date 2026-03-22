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