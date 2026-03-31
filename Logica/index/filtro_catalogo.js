/* ABRIR / CERRAR MENU */
function toggleCatalogoMenu(){

    const menu = document.getElementById("catalogoMenu");

    menu.style.display =
        menu.style.display === "block"
        ? "none"
        : "block";

    const flecha = document.getElementById("flechaCatalogo");
    flecha.classList.toggle("abierto");
}

/* FILTRAR PRODUCTOS */
function filtrarProductos(categoria){

    const menu = document.getElementById("catalogoMenu");
    menu.style.display = "none";

    const flecha = document.getElementById("flechaCatalogo");
    flecha.classList.remove("abierto");

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

document.addEventListener("click", function(e){

    const menu = document.getElementById("catalogoMenu");
    const flecha = document.getElementById("flechaCatalogo");

    const botonesCatalogo = document.querySelectorAll(".catalogo, .mobile-menu p");

    let clickEnBoton = false;

    botonesCatalogo.forEach(btn => {
        if(btn.contains(e.target)){
            clickEnBoton = true;
        }
    });

    if(
        !menu.contains(e.target) &&
        !clickEnBoton
    ){
        menu.style.display = "none";
        flecha.classList.remove("abierto");
    }
});