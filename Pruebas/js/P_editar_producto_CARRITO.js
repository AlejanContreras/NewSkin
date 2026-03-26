/* ========================== */
/* CREAR MODAL */
/* ========================== */

function crearModal() {

    const modal = document.createElement("div");
    modal.id = "modalEditar";
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">

            <h2 id="editNombre"></h2>

            <div class="grupo" id="grupoTalla">
                <p>Talla</p>
                <div id="editTalla" class="opciones"></div>
            </div>

            <div class="grupo" id="grupoColor">
                <p>Color</p>
                <div id="editColor" class="opciones"></div>
            </div>

            <div class="grupo">
                <p>Cantidad</p>
                <div class="cantidad-box">
                    <button id="menos">-</button>
                    <span id="editCantidad">1</span>
                    <button id="mas">+</button>
                </div>
            </div>

            <div class="acciones">
                <button id="btnGuardar">Guardar</button>
                <button id="btnCancelar">Cancelar</button>
            </div>

        </div>
    `;

    document.body.appendChild(modal);
}

document.addEventListener("DOMContentLoaded", crearModal);


/* ========================== */
/* EVENTOS */
/* ========================== */

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("editar")) {

        const id = e.target.dataset.id;
        const color = e.target.dataset.color;
        const talla = e.target.dataset.talla;

        abrirModalEditar(id, color, talla);
    }

    if (e.target.id === "btnGuardar") guardarCambios();

    if (e.target.id === "btnCancelar") cerrarModal();

    const modal = document.getElementById("modalEditar");
    if (e.target === modal) cerrarModal();
});


/* ========================== */
/* ABRIR MODAL */
/* ========================== */

function abrirModalEditar(id, color, talla) {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(p =>
        p.id == id &&
        p.color == color &&
        p.talla == talla
    );

    if (!producto) return;

    const modal = document.getElementById("modalEditar");
    modal.style.display = "flex";

    document.getElementById("editNombre").textContent = producto.nombre;

    /* ====================== */
    /* TALLAS */
    /* ====================== */

    const contTalla = document.getElementById("editTalla");
    contTalla.innerHTML = "";

    if (producto.tallasDisponibles && producto.tallasDisponibles.length > 0) {

        document.getElementById("grupoTalla").style.display = "block";

        producto.tallasDisponibles.forEach(t => {

            const div = document.createElement("div");
            div.textContent = t;

            if (t === producto.talla) div.classList.add("activo");

            div.onclick = () => {
                document.querySelectorAll("#editTalla div")
                    .forEach(el => el.classList.remove("activo"));
                div.classList.add("activo");
            };

            contTalla.appendChild(div);
        });

    } else {
        document.getElementById("grupoTalla").style.display = "none";
    }

    /* ====================== */
    /* COLORES */
    /* ====================== */

    const contColor = document.getElementById("editColor");
    contColor.innerHTML = "";

    if (producto.coloresDisponibles && producto.coloresDisponibles.length > 0) {

        document.getElementById("grupoColor").style.display = "block";

        producto.coloresDisponibles.forEach(c => {

            const div = document.createElement("div");
            div.textContent = c;

            if (c === producto.color) div.classList.add("activo");

            div.onclick = () => {
                document.querySelectorAll("#editColor div")
                    .forEach(el => el.classList.remove("activo"));
                div.classList.add("activo");
            };

            contColor.appendChild(div);
        });

    } else {
        document.getElementById("grupoColor").style.display = "none";
    }

    /* ====================== */
    /* CANTIDAD */
    /* ====================== */

    let cantidadActual = producto.cantidad;
    const spanCantidad = document.getElementById("editCantidad");

    spanCantidad.textContent = cantidadActual;

    document.getElementById("mas").onclick = () => {
        cantidadActual++;
        spanCantidad.textContent = cantidadActual;
    };

    document.getElementById("menos").onclick = () => {
        if (cantidadActual > 1) {
            cantidadActual--;
            spanCantidad.textContent = cantidadActual;
        }
    };

    /* 🔥 CLAVE */
    const btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.dataset.id = producto.id;
    btnGuardar.dataset.color = producto.color;
    btnGuardar.dataset.talla = producto.talla;
}


/* ========================== */
/* GUARDAR */
/* ========================== */

function guardarCambios() {

    const btn = document.getElementById("btnGuardar");

    const id = btn.dataset.id;
    const color = btn.dataset.color;
    const talla = btn.dataset.talla;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = carrito.find(p =>
        p.id == id &&
        p.color == color &&
        p.talla == talla
    );

    if (!producto) return;

    const nuevaCantidad = parseInt(document.getElementById("editCantidad").textContent);

    if (nuevaCantidad < 1) return alert("Cantidad inválida");

    producto.cantidad = nuevaCantidad;

    const tallaSel = document.querySelector("#editTalla .activo");
    if (tallaSel) producto.talla = tallaSel.textContent;

    const colorSel = document.querySelector("#editColor .activo");
    if (colorSel) producto.color = colorSel.textContent;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("cambio guardado");

    cerrarModal();
    renderCarritoUI();
}


/* ========================== */
/* CERRAR */
/* ========================== */

function cerrarModal() {
    document.getElementById("modalEditar").style.display = "none";
}