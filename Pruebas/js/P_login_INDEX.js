// ===== CUANDO CARGA LA PAGINA =====
document.addEventListener("DOMContentLoaded", () => {
    renderUsuario();
});

// 🔥 SI CAMBIA LOCALSTORAGE
window.addEventListener("storage", () => {
    renderUsuario();
});


// ===== FUNCION PRINCIPAL =====
function renderUsuario() {

    // 🔥 TODOS los botones (PC + móvil)
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

        accion = () => mostrarMenuUsuario(usuario);
    }

    // 🟡 REGISTRADO PERO NO LOGUEADO
    else if (usuario) {
        contenido = `Iniciar sesión`;
        accion = abrirLogin;
    }

    // 🔴 USUARIO NUEVO
    else {
        contenido = `Registrarse`;
        accion = abrirRegistro;
    }

    // 🔥 APLICAR A TODOS (PC + móvil)
    for (let i = 0; i < loginBtns.length; i++) {

        loginBtns[i].innerHTML = contenido;

        loginBtns[i].onclick = function () {

            // 🔥 si es menú móvil → cerrarlo
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


// ===== INFO USUARIO =====
function mostrarMenuUsuario(usuario) {
    alert(`Nombre: ${usuario.nombre}\nCorreo: ${usuario.email}`);
}

//TEMPORAL O ESO ESPERO JUEPUTA
// ===== LOGIN =====
function abrirLogin() {
    alert("Abrir modal de iniciar sesión");

    // 🔥 prueba
    iniciarSesionUsuario();
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