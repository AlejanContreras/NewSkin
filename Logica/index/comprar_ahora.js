function comprarAhora() {

    let total = productoActual.precio * cantidad;

    // 🧾 1. MOSTRAR TOAST GRANDE PRIMERO
    mostrarToast_ComprarAhora({
        titulo: "Resumen de compra",
        tipo: "infoGrande",
        duracion: 5000,
        mensaje: `
            Producto: ${productoActual.nombre}<br>
            Talla: ${tallaSeleccionada || "N/A"}<br>
            Color: ${colorSeleccionado || "N/A"}<br>
            Cantidad: ${cantidad}<br>

            <span class="total">
                Total a pagar: $${total.toLocaleString()}
            </span>
        `
    });

    // 🧠 2. ESPERAR ANTES DEL PROMPT
    setTimeout(() => {

        const dineroInput = prompt("Digite el dinero:");

        // 🔴 CANCELAR
        if (dineroInput === null) {
            mostrarToast_ComprarAhora({
                titulo: "Cancelado",
                mensaje: "Compra cancelada por el usuario",
                tipo: "error"
            });
            return;
        }

        const dinero = parseInt(dineroInput);

        // 🔴 INVALIDO
        if (isNaN(dinero)) {
            mostrarToast_ComprarAhora({
                titulo: "Error",
                mensaje: "Valor inválido",
                tipo: "error"
            });
            return;
        }

        // 🔴 NO ALCANZA
        if (dinero < total) {
            mostrarToast_ComprarAhora({
                titulo: "Saldo insuficiente",
                mensaje: "No tiene saldo suficiente, quite una prenda o recargue",
                tipo: "error"
            });
            return;
        }

        // 🟢 PAGO OK
        let mensaje = "";

        if (dinero === total) {
            mensaje = "Pago realizado, sus prendas serán enviadas";
        } else {
            let sobra = dinero - total;
            mensaje = `Pago realizado, le sobran $${sobra.toLocaleString()} guardados para su próxima compra`;
        }

        mostrarToast_ComprarAhora({
            titulo: "Compra exitosa",
            mensaje: mensaje,
            tipo: "success"
        });

        // 🖼️ IMAGEN
        const imagenFinal =
            productoActual.imagen ||
            document.querySelector(".img-principal")?.src ||
            "https://via.placeholder.com/80";

        // 📦 HISTORIAL
        let historial = JSON.parse(localStorage.getItem("historial")) || [];

        historial.push({
            nombre: productoActual.nombre,
            precio: productoActual.precio,
            cantidad: cantidad,
            talla: tallaSeleccionada || "N/A",
            color: colorSeleccionado || "N/A",
            imagen: imagenFinal,
            estado: "enviado",
            fecha: new Date().toLocaleString()
        });

        localStorage.setItem("historial", JSON.stringify(historial));

        // ❌ cerrar modal
        document.querySelector(".modal").style.display = "none";

    }, 300);
}