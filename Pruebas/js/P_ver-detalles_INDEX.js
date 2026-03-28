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
    
                <div id="grupoTallas">
                    <h4>Talla:</h4>
                    <div class="tallas" id="contenedorTallas"></div>
                </div>

                <div id="grupoColores">
                    <h4>Color:</h4>
                    <div class="colores" id="contenedorColores"></div>
                </div>
    
                <div class="cantidad">
    
                    <button onclick="restar()">-</button>
    
                    <span id="cantidad">1</span>
    
                    <button onclick="sumar()">+</button>
    
                    <div class="precio-modal" id="modalPrecio"></div>
    
                </div>
    
                <div class="acciones">
    
                    <!-- 🔒 VALIDACIÓN AQUÍ -->
                    <button class="comprar" onclick="validarCompra()">Comprar ahora</button>
    
                    <!-- 🔒 VALIDACIÓN AQUÍ -->
                    <button class="carrito-btn" onclick="validarCarrito()">
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
/* 🔐 VALIDAR SESIÓN */
/* ========================= */

function usuarioLogueado(){
    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    return usuario !== null;
}

/* ========================= */
/* 🔒 VALIDADORES */
/* ========================= */

function validarCompra(){

    if(!usuarioLogueado()){
        alert("Debes iniciar sesión");
        return;
    }

    // ✅ LLAMA A LA FUNCIÓN REAL (otro archivo)
    comprarAhora();
}

function validarCarrito(){

    if(!usuarioLogueado()){
        alert("Debes iniciar sesión");
        return;
    }

    // ✅ LLAMA A TU FUNCIÓN ORIGINAL
    agregarCarrito();
}


/* ========================= */
/* VARIABLES */
/* ========================= */

let productoActual = null;
let cantidad = 1;
let tallaSeleccionada = null;
let colorSeleccionado = null;


/* ========================= */
/* ABRIR MODAL */
/* ========================= */

function verDetalle(id) {

    productoActual = productos.find(p => p.id === id);

    document.getElementById("modalProducto").style.display = "flex";

    cantidad = 1;
    tallaSeleccionada = null;
    colorSeleccionado = null;

    actualizarCantidad();
    cargarProducto();
}


/* ========================= */
/* CARGAR PRODUCTO */
/* ========================= */

function cargarProducto() {

    document.getElementById("modalNombre").innerText = productoActual.nombre;
    document.getElementById("modalDescripcion").innerText = productoActual.descripcion;

    document.getElementById("imagenPrincipal").src = productoActual.imagenes[0];

    document.getElementById("modalPrecio").innerText =
        "$" + productoActual.precio.toLocaleString();

    const miniaturas = document.querySelector(".miniaturas");
    miniaturas.innerHTML = "";

    productoActual.imagenes.forEach(img => {
        miniaturas.innerHTML +=
            `<img src="${img}" onclick="cambiarImagen('${img}')">`;
    });

    const contTallas = document.getElementById("contenedorTallas");
    contTallas.innerHTML = "";

    if (productoActual.tallasDisponibles) {

        productoActual.tallasDisponibles.forEach(t => {

            const btn = document.createElement("button");
            btn.textContent = t;

            btn.onclick = () => seleccionarTalla(btn);

            contTallas.appendChild(btn);
        });

    } else {
        document.getElementById("grupoTallas").style.display = "none";
    }

    const contColores = document.getElementById("contenedorColores");
    contColores.innerHTML = "";

    if (productoActual.coloresDisponibles) {

        productoActual.coloresDisponibles.forEach(c => {

            const btn = document.createElement("button");
            btn.textContent = c;

            btn.onclick = () => seleccionarColor(btn);

            contColores.appendChild(btn);
        });

    } else {
        document.getElementById("grupoColores").style.display = "none";
    }
}


/* ========================= */
/* CERRAR */
/* ========================= */

function cerrarModal() {
    document.getElementById("modalProducto").style.display = "none";
}


/* ========================= */
/* IMAGEN */
/* ========================= */

function cambiarImagen(src) {
    document.getElementById("imagenPrincipal").src = src;

    // 🔥 mejora: guardar imagen seleccionada
    productoActual.imagen = src;
}


/* ========================= */
/* TALLA */
/* ========================= */

function seleccionarTalla(btn) {

    document.querySelectorAll("#contenedorTallas button")
        .forEach(b => b.classList.remove("activa"));

    btn.classList.add("activa");

    tallaSeleccionada = btn.innerText;
}


/* ========================= */
/* COLOR */
/* ========================= */

function seleccionarColor(btn) {

    document.querySelectorAll("#contenedorColores button")
        .forEach(b => b.classList.remove("activa"));

    btn.classList.add("activa");

    colorSeleccionado = btn.innerText;
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

    let total = productoActual.precio * cantidad;

    document.getElementById("modalPrecio").innerText =
        "$" + total.toLocaleString();
}


/* ========================= */
/* 🔥 AGREGAR AL CARRITO */
/* ========================= */

function agregarCarrito(){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (productoActual.tallasDisponibles && !tallaSeleccionada) {
        return alert("Selecciona una talla");
    }

    if (productoActual.coloresDisponibles && !colorSeleccionado) {
        return alert("Selecciona un color");
    }

    let existente = carrito.find(p => 
        p.id === productoActual.id &&
        p.talla === tallaSeleccionada &&
        p.color === colorSeleccionado
    );

    if(existente){
        existente.cantidad += cantidad;
    }else{
        carrito.push({
            id: productoActual.id,
            nombre: productoActual.nombre,
            precio: productoActual.precio,
            cantidad: cantidad,
            talla: tallaSeleccionada,
            color: colorSeleccionado,
            imagen: productoActual.imagen || productoActual.imagenes[0],
            tallasDisponibles: productoActual.tallasDisponibles || [],
            coloresDisponibles: productoActual.coloresDisponibles || []
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado 🔥");
}


/* ========================= */
/* CLICK FUERA */
/* ========================= */

window.addEventListener("click", function (event) {

    const modal = document.getElementById("modalProducto");

    if (event.target === modal) cerrarModal();
});