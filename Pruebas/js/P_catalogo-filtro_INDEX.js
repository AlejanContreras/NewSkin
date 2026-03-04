/* ABRIR / CERRAR MENU */
function toggleCatalogoMenu(){

    const menu = document.getElementById("catalogoMenu");

    menu.style.display =
        menu.style.display === "block"
        ? "none"
        : "block";
}


/* FILTRAR PRODUCTOS */
function filtrarProductos(categoria){

    const menu = document.getElementById("catalogoMenu");
    menu.style.display = "none";

    /* ===== ACTIVAR OPCION VISUAL ===== */
    const opciones =
        document.querySelectorAll("#catalogoMenu p");

    opciones.forEach(opcion => {

        opcion.classList.remove("activo");

        if(
            opcion
            .getAttribute("onclick")
            .includes(categoria)
        ){
            opcion.classList.add("activo");
        }
    });

    /* ===== FILTRO ===== */
    if(categoria === "todos"){
        mostrarProductos(productos);
        return;
    }

    const filtrados =
        productos.filter(p =>
            p.categoria === categoria
        );

    mostrarProductos(filtrados);
}


/* ===== MOSTRAR TODO AL CARGAR ===== */
document.addEventListener("DOMContentLoaded", () => {
    filtrarProductos("todos");
});