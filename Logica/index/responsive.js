function toggleMenu() {
    let menu = document.getElementById("mobileMenu");
    menu.style.display =
        menu.style.display === "block" ? "none" : "block";
}

function toggleMenu_carrito(){
    const menu = document.getElementById("mobileMenu_carrito");
    menu.classList.toggle("active");
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
        const menu = document.getElementById("mobileMenu_carrito");
        if (menu) {
            menu.classList.remove("active");
        }
        const menuNormal = document.getElementById("mobileMenu");
        if (menuNormal) {
            menuNormal.style.display = "none";
        }
    }
});

document.addEventListener("click", (e) => {
    if(e.target.id === "btnProductosMobile_carrito"){
        const btn = document.getElementById("btnProductos");
        if(btn) btn.click();
    }
    if(e.target.id === "btnHistorialMobile_carrito"){
        const btn = document.getElementById("btnHistorial");
        if(btn) btn.click();
    }
});