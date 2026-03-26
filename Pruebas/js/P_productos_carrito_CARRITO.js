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
// RENDER PRINCIPAL (como usuario)
// ==========================
function renderCarritoUI(){

    const container = document.getElementById("carritoContainer");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const logueado = localStorage.getItem("logueado");

    // 🔴 NO LOGUEADO
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

    // 🟢 LOGUEADO → mostrar carrito
    renderCarrito();
}


// ==========================
// RENDER CARRITO REAL
// ==========================
function renderCarrito(){

    const container = document.getElementById("carritoContainer");
    const carrito = obtenerCarrito();

    container.innerHTML = "";

    // 🟡 CARRITO VACÍO
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

                <div class="editar" data-id="${prod.id}">
                    ✏️
                </div>

                <img src="${prod.imagen}" alt="">

                <div>
                    <h3>${prod.nombre}</h3>
                    <p>Talla: ${prod.talla}</p>
                    <small>Producto agregado</small>
                </div>
            </div>

            <div class="precio">$${prod.precio.toLocaleString()}</div>

            <div class="cantidad">
                <button class="disminuir" data-id="${prod.id}">-</button>
                <span">${prod.cantidad}</span>
                <button class="aumentar" data-id="${prod.id}">+</button>
            </div>

            <div class="subtotal">
                <span id="subtotal">$${(prod.precio * prod.cantidad).toLocaleString()}</span>

                <div class="eliminar" data-id="${prod.id}">
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

    container.appendChild(box);
}


// ==========================
// EVENTOS
// ==========================
document.addEventListener("click", (e) => {

    const id = e.target.dataset.id;
    let carrito = obtenerCarrito();

    // LOGIN BTN
    if(e.target.id === "btnLogin"){
        alert("Inicia sesión");
    }

    // ELIMINAR
    if(e.target.classList.contains("eliminar")){
        if(confirm("¿Seguro que deseas eliminar este producto?")){
            carrito = carrito.filter(p => p.id != id);
            guardarCarrito(carrito);
            renderCarritoUI();
        }
    }

    // AUMENTAR
    if(e.target.classList.contains("aumentar")){
        const prod = carrito.find(p => p.id == id);
        if(prod){
            prod.cantidad++;
            guardarCarrito(carrito);
            renderCarritoUI();
        }
    }

    // DISMINUIR
    if(e.target.classList.contains("disminuir")){
        const prod = carrito.find(p => p.id == id);
        if(prod && prod.cantidad > 1){
            prod.cantidad--;
            guardarCarrito(carrito);
            renderCarritoUI();
        }
    }

    // EDITAR
    if(e.target.classList.contains("editar")){
        alert("Modificar pedido");
    }

});