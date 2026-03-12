/* ========================= */
/* CREAR MODAL DINAMICO */
/* ========================= */

function crearModal() {

    const modalHTML = `
    
    <div id="modalProducto" class="modal" style="display:none;">
    
        <div class="modal-box">
    
            <span class="cerrar" onclick="cerrarModal()">✖</span>
    
            <div class="img-section">
    
                <img id="imagenPrincipal" class="img-principal">
    
                <div class="miniaturas"></div>
    
            </div>
    
            <div class="info">
    
                <h2 id="modalNombre"></h2>
    
                <p id="modalDescripcion"></p>
    
                <h4>Talla:</h4>
    
                <div class="tallas">
                    <button onclick="seleccionarTalla(this)">S</button>
                    <button class="activa" onclick="seleccionarTalla(this)">M</button>
                    <button onclick="seleccionarTalla(this)">L</button>
                </div>
    
                <div class="cantidad">
    
                    <button onclick="restar()">-</button>
    
                    <span id="cantidad">1</span>
    
                    <button onclick="sumar()">+</button>
    
                    <div class="precio-modal" id="modalPrecio"></div>
    
                </div>
    
                <div class="acciones">
    
                    <button class="comprar" onclick="comprarAhora()">Comprar ahora</button>
    
                    <button class="carrito-btn" onclick="agregarCarrito()">
                    🛒 Agregar
                    </button>
    
                </div>
    
            </div>
    
        </div>
    
    </div>
    
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

}

document.addEventListener("DOMContentLoaded", crearModal);



/* ========================= */
/* VARIABLES */
/* ========================= */

let productoActual = null;
let cantidad = 1;
let tallaSeleccionada = "M";


/* ========================= */
/* ABRIR MODAL */
/* ========================= */

function verDetalle(id) {

    productoActual = productos.find(p => p.id === id);

    document.getElementById("modalProducto").style.display = "flex";

    cantidad = 1;

    actualizarCantidad();

    cargarProducto();

}


/* ========================= */
/* CARGAR DATOS PRODUCTO */
/* ========================= */

function cargarProducto() {

    document.getElementById("modalNombre").innerText =
        productoActual.nombre;

    document.getElementById("modalDescripcion").innerText =
        productoActual.descripcion;

    /* imagen principal */
    document.getElementById("imagenPrincipal").src =
        productoActual.imagenes[0];

    /* precio inicial */
    document.getElementById("modalPrecio").innerText =
        "$" + productoActual.precio.toLocaleString();

    /* miniaturas */

    const miniaturas = document.querySelector(".miniaturas");

    miniaturas.innerHTML = "";

    productoActual.imagenes.forEach(img => {

        miniaturas.innerHTML +=
            `<img src="${img}" onclick="cambiarImagen('${img}')">`;

    });

}


/* ========================= */
/* CERRAR MODAL */
/* ========================= */

function cerrarModal() {

    document.getElementById("modalProducto").style.display = "none";

}


/* ========================= */
/* CAMBIAR IMAGEN */
/* ========================= */

function cambiarImagen(src) {

    document.getElementById("imagenPrincipal").src = src;

}


/* ========================= */
/* TALLA */
/* ========================= */

function seleccionarTalla(btn) {

    document.querySelectorAll(".tallas button")
        .forEach(b => b.classList.remove("activa"));

    btn.classList.add("activa");

    tallaSeleccionada = btn.innerText;

}


/* ========================= */
/* CANTIDAD */
/* ========================= */

function sumar() {

    cantidad++;

    actualizarCantidad();

}

function restar() {

    if (cantidad > 1) {

        cantidad--;

        actualizarCantidad();

    }

}

function actualizarCantidad() {

    document.getElementById("cantidad").innerText = cantidad;

    let precioTotal = productoActual.precio * cantidad;

    document.getElementById("modalPrecio").innerText =
        "$" + precioTotal.toLocaleString();

}


/* ========================= */
/* AGREGAR AL CARRITO */
/* ========================= */

function agregarCarrito() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({

        id: productoActual.id,
        nombre: productoActual.nombre,
        precio: productoActual.precio,
        cantidad: cantidad,
        talla: tallaSeleccionada,
        imagen: productoActual.imagenes[0]

    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");

}


/* ========================= */
/* SALIR TOCANDO FUERA MODAL */
/* ========================= */

window.addEventListener("click", function (event) {

    const modal = document.getElementById("modalProducto");

    if (event.target === modal) {

        cerrarModal();

    }

});


/* ========================= */
/* COMPRAR AHORA */
/* ========================= */

function comprarAhora() {

    let total = productoActual.precio * cantidad;

    alert(
        `Compra rápida
    
    Producto: ${productoActual.nombre}
    Talla: ${tallaSeleccionada}
    Cantidad: ${cantidad}
    Total: $${total.toLocaleString()}`
    );

}