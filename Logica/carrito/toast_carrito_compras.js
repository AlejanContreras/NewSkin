//agregar carrito
function obtenerContenedorToast_agregarCarrito() {
    let container = document.getElementById("toast-agregarCarrito-container");

    if (!container) {
        container = document.createElement("div");
        container.id = "toast-agregarCarrito-container";
        document.body.appendChild(container);
    }

    return container;
}
function crearToast_agregarCarrito({ titulo, mensaje, tipo }) {
    const toast = document.createElement("div");
    toast.classList.add("toast-agregarCarrito", tipo);

    toast.innerHTML = `
        <strong>${titulo}</strong>
        <p>${mensaje}</p>
    `;

    return toast;
}

function mostrarToast_agregarCarrito({ titulo, mensaje, tipo = "success" }) {

    const container = obtenerContenedorToast_agregarCarrito();

    const toast = crearToast_agregarCarrito({
        titulo,
        mensaje,
        tipo
    });

    container.appendChild(toast);

    // Animación entrada
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Eliminar automáticamente
    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}

/*comprar ahora*/
function mostrarToast_ComprarAhora({
    titulo = "",
    mensaje = "",
    tipo = "info",
    duracion = 3500
}) {

    let contenedor = document.getElementById("contenedorToast_ComprarAhora");

    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "contenedorToast_ComprarAhora";
        document.body.appendChild(contenedor);
    }

    const toast = document.createElement("div");

    toast.className = `toast_ComprarAhora ${tipo === "infoGrande" ? "toast_grande" : tipo}`;

    toast.innerHTML = `
        <strong>${titulo}</strong>
        <div class="toast_mensaje">${mensaje}</div>
    `;

    contenedor.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, duracion);
}

/*finalizar compra*/
function mostrarToast_finalizar_compra({
    titulo = "",
    mensaje = "",
    tipo = "info",
    duracion = 3500
}) {

    let contenedor = document.getElementById("contenedorToast_finalizar_compra");

    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "contenedorToast_finalizar_compra";
        document.body.appendChild(contenedor);
    }

    const toast = document.createElement("div");
    toast.className = `toast_finalizar_compra ${tipo}`;

    toast.innerHTML = `
        <strong>${titulo}</strong>
        <div class="toast_finalizar_compra_mensaje">${mensaje}</div>
    `;

    contenedor.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, duracion);
}

/*editar producto*/
function mostrarToast_editarProducto({
    titulo = "",
    mensaje = "",
    tipo = "success",
    duracion = 3000
}) {

    const toast = document.createElement("div");
    toast.className = `toast_editarProducto ${tipo}`;

    toast.innerHTML = `
        <div class="toast-contenido">
            <strong>${titulo}</strong>
            <p>${mensaje}</p>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duracion);
}