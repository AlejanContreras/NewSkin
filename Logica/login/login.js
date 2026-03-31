document.addEventListener("DOMContentLoaded", () => {
    renderUsuario();
});

window.addEventListener("storage", () => {
    renderUsuario();
});

// ===== FUNCION PRINCIPAL =====
function renderUsuario() {

    const loginBtns = document.getElementsByClassName("loginBtn");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const logueado = localStorage.getItem("logueado");

    let contenido;
    let accion;

    // 🟢 USUARIO LOGUEADO
    if (usuario && logueado === "true") {

        const iniciales = obtenerIniciales(usuario.nombre);

        contenido = `
            <div class="avatar">
                ${iniciales}
            </div>
        `;

        accion = () => mostrarMenuUsuario();
    }

    // 🟡 REGISTRADO PERO NO LOGUEADO
    else if (usuario) {
        contenido = `Iniciar sesión`;
        accion = abrirInicioSesion;
    }

    // 🔴 USUARIO NUEVO
    else {
        contenido = `Registrarse`;
        accion = abrirRegistro;
    }

    for (let i = 0; i < loginBtns.length; i++) {

        loginBtns[i].innerHTML = contenido;

        loginBtns[i].onclick = function () {

            if (this.closest("#mobileMenu")) {
                toggleMenu();
            }

            accion();
        };
    }
}

// ===== INICIALES =====
function obtenerIniciales(nombre) {
    const partes = nombre.trim().split(" ");
    if (partes.length === 1) {
        return partes[0][0].toUpperCase();
    }
    return (partes[0][0] + partes[1][0]).toUpperCase();
}

// ===== ESTADO =====

// 🆕 REGISTRO
function registrarUsuario(datos) {
    localStorage.setItem("usuario", JSON.stringify(datos));
    localStorage.setItem("logueado", "false");

    renderUsuario();
}

// 🔑 LOGIN
function iniciarSesionUsuario() {
    localStorage.setItem("logueado", "true");

    renderUsuario();
}

// 🔒 LOGOUT
function cerrarSesion() {
    localStorage.setItem("logueado", "false");

    renderUsuario();
}