// ==========================
// AUTO RENDER
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    renderCarritoUI();
});

window.addEventListener("storage", () => {
    renderCarritoUI();
});


// ==========================
// OBTENER / GUARDAR
// ==========================
function obtenerCarrito(){
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// ==========================
// RENDER PRINCIPAL
// ==========================
function renderCarritoUI(){

    const container = document.getElementById("carritoContainer");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const logueado = localStorage.getItem("logueado");

    if(!usuario || logueado !== "true"){

        container.innerHTML = `
            <div class="no-session">
                <h2>Debes iniciar sesión</h2>
                <p>Para ver o agregar productos</p>
                <button id="btnLogin">Iniciar sesión</button>
            </div>
        `;

        return;
    }

    renderCarrito();
}


// ==========================
// RENDER CARRITO
// ==========================
function renderCarrito(){

    const container = document.getElementById("carritoContainer");
    const carrito = obtenerCarrito();

    container.innerHTML = "";

    if(carrito.length === 0){
        container.innerHTML = `
            <div class="no-session">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para comenzar</p>
            </div>
        `;
        return;
    }

    const box = document.createElement("div");
    box.classList.add("carrito-box");

    box.innerHTML = `
        <div class="carrito-header">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
        </div>
    `;

    carrito.forEach(prod => {

        const producto = document.createElement("div");
        producto.classList.add("producto");

        producto.innerHTML = `
            <div class="info">

                <div class="editar" 
                    data-id="${prod.id}" 
                    data-color="${prod.color || ""}" 
                    data-talla="${prod.talla || ""}">
                    ✏️
                </div>

                <img src="${prod.imagen}" alt="">

                <div>
                    <h3>${prod.nombre}</h3>
                    <p>Talla: ${prod.talla || "N/A"}</p>
                    <p>Color: ${prod.color || "N/A"}</p>
                </div>
            </div>

            <div class="precio">$${prod.precio.toLocaleString()}</div>

            <div class="cantidad">
                <button class="disminuir" 
                    data-id="${prod.id}" 
                    data-color="${prod.color || ""}" 
                    data-talla="${prod.talla || ""}">-</button>

                <span>${prod.cantidad}</span>

                <button class="aumentar" 
                    data-id="${prod.id}" 
                    data-color="${prod.color || ""}" 
                    data-talla="${prod.talla || ""}">+</button>
            </div>

            <div class="subtotal">
                <span>$${(prod.precio * prod.cantidad).toLocaleString()}</span>

                <div class="eliminar" 
                    data-id="${prod.id}" 
                    data-color="${prod.color || ""}" 
                    data-talla="${prod.talla || ""}">
                    🗑️
                </div>
            </div>
        `;

        box.appendChild(producto);
    });

    const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");

    totalDiv.innerHTML = `
        <span>Total:</span>
        <strong>$${total.toLocaleString()}</strong>
    `;

    box.appendChild(totalDiv);

    const acciones = document.createElement("div");
    acciones.classList.add("acciones");

    acciones.innerHTML = `
        <button class="seguir">Seguir comprando</button>
        <button class="finalizar">Finalizar compra</button>
    `;

    box.appendChild(acciones);

    container.appendChild(box);
}


// ==========================
// EVENTOS
// ==========================
document.addEventListener("click", (e) => {

    const id = e.target.dataset.id;
    const color = e.target.dataset.color;
    const talla = e.target.dataset.talla;

    let carrito = obtenerCarrito();

    // LOGIN 🔥
    if (e.target.id === "btnLogin") {

        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const logueado = localStorage.getItem("logueado");

        mostrarToast_productos_carrito_login({
            titulo: "Sesión requerida",
            mensaje: "Debes iniciar sesión",
            tipo: "error"
        });
        // 🔥 ABRIR MODAL SEGÚN ESTADO
        if (usuario && logueado !== "true") {
            // usuario existe pero no ha iniciado sesión
            abrirInicioSesion();
        } else if (!usuario) {
            // usuario nuevo
            abrirRegistro();
        }
    }

    // ======================
    // ELIMINAR 🔥
    // ======================
    if(e.target.classList.contains("eliminar")){
        if(confirm("¿Seguro que deseas eliminar este producto?")){

            carrito = carrito.filter(p =>
                !(p.id == id && p.color == color && p.talla == talla)
            );

            guardarCarrito(carrito);
            renderCarritoUI();

            mostrarToast_productos_carrito_login({
                titulo: "Eliminado",
                mensaje: "Producto eliminado del carrito",
                tipo: "success"
            });
        }
    }

    // ======================
    // AUMENTAR
    // ======================
    if(e.target.classList.contains("aumentar")){
        const prod = carrito.find(p =>
            p.id == id && p.color == color && p.talla == talla
        );

        if(prod){
            prod.cantidad++;
            guardarCarrito(carrito);
            renderCarritoUI();
        }
    }

    // ======================
    // DISMINUIR
    // ======================
    if(e.target.classList.contains("disminuir")){
        const prod = carrito.find(p =>
            p.id == id && p.color == color && p.talla == talla
        );

        if(prod && prod.cantidad > 1){
            prod.cantidad--;
            guardarCarrito(carrito);
            renderCarritoUI();
        }
    }

    // ======================
    // EDITAR 🔥
    // ======================
    if(e.target.classList.contains("editar")){
        abrirModalEditar(id, color, talla);
    }

    // ======================
    // BOTONES EXTRA
    // ======================
    if(e.target.classList.contains("seguir")){
        window.location.href = "/Pruebas/html/PRUEBASoficial.html";
    }

    if(e.target.classList.contains("finalizar")){
        abrirModalCompra();
    }

});