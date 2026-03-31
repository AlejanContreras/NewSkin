// ==========================
// INICIO
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    const btnProductos = document.getElementById("btnProductos");
    const btnHistorial = document.getElementById("btnHistorial");

    // CLICK PRODUCTOS
    btnProductos.addEventListener("click", () => {
        activarBoton("btnProductos");
        renderCarritoUI();
    });

    // CLICK HISTORIAL
    btnHistorial.addEventListener("click", () => {
        activarBoton("btnHistorial");
        renderHistorial();
    });

    // DEFAULT → PRODUCTOS
    activarBoton("btnProductos");
    renderCarritoUI();
});


// ==========================
// CAMBIAR ACTIVO (NEGRILLA)
// ==========================
function activarBoton(id){

    document.getElementById("btnProductos").classList.remove("activo");
    document.getElementById("btnHistorial").classList.remove("activo");

    document.getElementById(id).classList.add("activo");
}


// ==========================
// STORAGE SYNC (OPCIONAL)
// ==========================
window.addEventListener("storage", () => {

    const activo = document.querySelector(".activo");

    if(activo && activo.id === "btnHistorial"){
        renderHistorial();
    } else {
        renderCarritoUI();
    }
});