function renderHistorial() {

    const cont = document.getElementById("carritoContainer");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    cont.innerHTML = "";

    if (historial.length === 0) {
        cont.innerHTML = "<p>No hay compras aún</p>";
        return;
    }

    let html = `
    <div class="historial-box">

        <div class="historial-header">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Estado</span>
            <span>Total</span>
        </div>
    `;

    historial.forEach(p => {

        html += `
        <div class="historial-item">

            <div class="info">
                <img src="${p.imagen || 'https://via.placeholder.com/80'}" alt="">

                <div>
                    <h3>${p.nombre}</h3>
                    <p>Talla: ${p.talla}</p>
                    <p>Color: ${p.color}</p>
                </div>
            </div>

            <div class="precio">
                ${p.cantidad}
            </div>

            <div class="estado enviado">
                Enviado
            </div>

            <div class="subtotal">
                <span>$${(p.precio * p.cantidad).toLocaleString()}</span>
            </div>

        </div>
        `;
    });

    html += `</div>`;

    cont.innerHTML = html;
}