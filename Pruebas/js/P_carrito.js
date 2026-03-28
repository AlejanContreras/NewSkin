// ==========================
// ACTUALIZAR CONTADOR
// ==========================

function actualizarContadorCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // 🔥 suma TODAS las cantidades
    let total = 0;

    carrito.forEach(p => {
        total += p.cantidad;
    });

    const contador = document.getElementById("contadorCarrito");

    if (contador) {
        contador.innerText = total;
    }
}


// ==========================
// AUTO ACTUALIZAR
// ==========================

// cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});

// cuando cambia localStorage (otra pestaña o mismo flujo)
window.addEventListener("storage", () => {
    actualizarContadorCarrito();
});