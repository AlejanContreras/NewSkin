function actualizarContadorCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = 0;

    carrito.forEach(p => {
        total += p.cantidad;
    });

    /* 🔥 actualizar TODOS los contadores (desktop + mobile) */
    const contadores = document.querySelectorAll(".contadorCarrito");

    contadores.forEach(contador => {
        contador.innerText = total;
    });
}

// cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});

// cuando cambia localStorage (otra pestaña)
window.addEventListener("storage", () => {
    actualizarContadorCarrito();
});