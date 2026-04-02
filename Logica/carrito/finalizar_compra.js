// CREAR MODAL FINALIZAR PAGO
function crearModalCompra(){

    const html = `
    <div id="modalFinalizarPago" class="modalFinalizarPago">

        <div class="modalFinalizarPago-box">

            <span class="cerrar" onclick="cerrarModalCompra()">✖</span>

            <h2>Finalizar Compra</h2>

            <div id="listaCompra"></div>

            <div class="footer-compra">

                <div class="total">
                    Total: $<span id="totalCompra">0</span>
                </div>

                <div class="botones-compra">

                    <button class="btn-seleccionar" onclick="seleccionarTodo()">
                        Seleccionar todo
                    </button>

                    <button class="btn-pagar" onclick="pagar()">
                        Pagar
                    </button>

                </div>

            </div>

        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", html);
}

document.addEventListener("DOMContentLoaded", crearModalCompra);

// ABRIR MODAL
function abrirModalCompra(){

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cont = document.getElementById("listaCompra");

    cont.innerHTML = "";

    carrito.forEach((p, index) => {

        cont.innerHTML += `
        <div class="item-compra">

            <input type="checkbox" 
                   onchange="calcularTotal()"
                   data-index="${index}" 
                   class="check-producto">

            <img src="${p.imagen}">

            <div>
                <p>${p.nombre}</p>
                <p>Talla: ${p.talla}</p>
                <p>Color: ${p.color}</p>
                <p>Cant: ${p.cantidad}</p>
            </div>

            <span>$${(p.precio * p.cantidad).toLocaleString()}</span>

        </div>
        `;
    });

    document.getElementById("modalFinalizarPago").style.display = "flex";
}

// SELECCIONAR TODO
function seleccionarTodo(){

    const checks = document.querySelectorAll(".check-producto");

    let todosSeleccionados = true;

    checks.forEach(ch => {
        if(!ch.checked) todosSeleccionados = false;
    });

    checks.forEach(ch => {
        ch.checked = !todosSeleccionados;
    });

    calcularTotal();
}

// CALCULAR TOTAL
function calcularTotal(){

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const checks = document.querySelectorAll(".check-producto");

    let total = 0;

    checks.forEach(ch => {
        if(ch.checked){
            const i = ch.dataset.index;
            total += carrito[i].precio * carrito[i].cantidad;
        }
    });

    document.getElementById("totalCompra").innerText =
        total.toLocaleString();
}

// PAGAR
function pagar(){

    const total = parseInt(
        document.getElementById("totalCompra").innerText.replace(/\./g,"")
    );

    // NO SELECCIONÓ NADA
    if(total === 0){
        mostrarToast_finalizar_compra({
            titulo: "Error",
            mensaje: "Seleccione al menos un producto",
            tipo: "error"
        });
        return;
    }

    // MOSTRAR TOTAL
    mostrarToast_finalizar_compra({
        titulo: "Resumen de pago",
        mensaje: `Total a pagar: $${total.toLocaleString()}`,
        duracion: 4000
    });

    setTimeout(() => {

        const dineroInput = prompt("Digite el dinero:");

        // CANCELADO
        if (dineroInput === null) {
            mostrarToast_finalizar_compra({
                titulo: "Cancelado",
                mensaje: "Pago cancelado por el usuario",
                tipo: "error"
            });
            return;
        }

        const dinero = parseInt(dineroInput);

        // INVALIDO
        if(isNaN(dinero)){
            mostrarToast_finalizar_compra({
                titulo: "Error",
                mensaje: "Valor inválido",
                tipo: "error"
            });
            return;
        }

        // 🔴 NO ALCANZA
        if(dinero < total){
            mostrarToast_finalizar_compra({
                titulo: "Saldo insuficiente",
                mensaje: "No tiene saldo suficiente, quite productos o recargue",
                tipo: "error"
            });
            return;
        }

        // 🟢 JUSTO
        if(dinero === total){
            mostrarToast_finalizar_compra({
                titulo: "Pago exitoso",
                mensaje: "Sus productos serán enviados",
                tipo: "success"
            });

            completarCompra();
        }

        // 🟡 SOBRA
        else{
            let sobra = dinero - total;

            mostrarToast_finalizar_compra({
                titulo: "Pago exitoso",
                mensaje: `Le sobran $${sobra.toLocaleString()}`,
                tipo: "success"
            });

            completarCompra();
        }

    }, 300);
}

// COMPLETAR COMPRA
// COMPLETAR COMPRA
function completarCompra(){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let historial = JSON.parse(localStorage.getItem("historial")) || [];

    const checks = document.querySelectorAll(".check-producto");

    let nuevosCarrito = [];

    checks.forEach((ch, i) => {

        if(ch.checked){
            historial.push(carrito[i]);
        } else {
            nuevosCarrito.push(carrito[i]);
        }

    });

    localStorage.setItem("carrito", JSON.stringify(nuevosCarrito));
    localStorage.setItem("historial", JSON.stringify(historial));

    actualizarContadorCarrito();

    cerrarModalCompra();

    if(typeof renderCarritoUI === "function"){
        renderCarritoUI();
    }
}
// CERRAR MODAL
function cerrarModalCompra(){
    document.getElementById("modalFinalizarPago").style.display = "none";
}