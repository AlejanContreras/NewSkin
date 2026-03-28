function comprarAhora() {

    let total = productoActual.precio * cantidad;

    // 🧾 INFO DE COMPRA
    alert(`Compra rápida

Producto: ${productoActual.nombre}
Talla: ${tallaSeleccionada || "N/A"}
Color: ${colorSeleccionado || "N/A"}
Cantidad: ${cantidad}
Total: $${total.toLocaleString()}`);

    // 💰 PEDIR DINERO
    const dinero = parseInt(prompt("Digite el dinero:"));

    if (isNaN(dinero)) {
        alert("valor invalido");
        return;
    }

    // 🔴 NO ALCANZA
    if (dinero < total) {
        alert("no tiene saldo suficiente haga una recarga o quite una prenda");
        return;
    }

    // 🟡 / 🟢 PAGO OK
    let mensaje = "";

    if (dinero === total) {
        mensaje = "pago realizado sus prendas seran enviadas";
    } else {
        let sobra = dinero - total;
        mensaje = `pago realizado le sobra $${sobra.toLocaleString()} los cuales seran guardados para su proxima compra`;
    }

    alert(mensaje);

    // 🖼️ 🔥 ARREGLO DE IMAGEN (CLAVE)
    const imagenFinal =
        productoActual.imagen ||
        document.querySelector(".img-principal")?.src ||
        "https://via.placeholder.com/80";

    // 📦 GUARDAR EN HISTORIAL
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

    // ❌ OPCIONAL: cerrar modal
    document.querySelector(".modal").style.display = "none";
}