//no se si deberia decir index pq afectaria tanto el index como carrito pero bueno por ahora es solo index

// ===== CUANDO CARGA LA PAGINA =====
document.addEventListener("DOMContentLoaded", () => {
    renderUsuario();
});

// 🔥 EXTRA: SI CAMBIA LOCALSTORAGE (MULTI-PANTALLA)
window.addEventListener("storage", () => {
    renderUsuario();
});


// ===== FUNCION PRINCIPAL =====
function renderUsuario() {
    const loginBtn = document.getElementById("loginBtn");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const logueado = localStorage.getItem("logueado");

    // 🟢 USUARIO LOGUEADO
    if (usuario && logueado === "true") {

        const iniciales = obtenerIniciales(usuario.nombre);

        loginBtn.innerHTML = `
            <div class="avatar">
                ${iniciales}
            </div>
        `;

        loginBtn.onclick = () => mostrarMenuUsuario(usuario);
    }

    // 🟡 USUARIO REGISTRADO PERO NO LOGUEADO
    else if (usuario) {
        loginBtn.innerHTML = `Iniciar sesión`;
        loginBtn.onclick = abrirLogin;
    }

    // 🔴 USUARIO NUEVO
    else {
        loginBtn.innerHTML = `Registrarse`;
        loginBtn.onclick = abrirRegistro;
    }
}


// ===== FUNCION PARA SACAR INICIALES =====
function obtenerIniciales(nombre) {
    const partes = nombre.trim().split(" ");

    if (partes.length === 1) {
        return partes[0][0].toUpperCase();
    }

    return (partes[0][0] + partes[1][0]).toUpperCase();
}


// ===== MOSTRAR INFO USUARIO =====
function mostrarMenuUsuario(usuario) {
    const opcion = alert(
        `Nombre: ${usuario.nombre}\nCorreo: ${usuario.email}`
    );
}


// ===== FUNCIONES TEMPORALES =====
function abrirLogin() {
    alert("Abrir modal de iniciar sesión");

    // 🔥 PRUEBA: simular login directo
    iniciarSesionUsuario();
}


// ===== LOGICA DE ESTADO (IMPORTANTE) =====

// 🆕 REGISTRAR
function registrarUsuario(datos) {
    localStorage.setItem("usuario", JSON.stringify(datos));
    localStorage.setItem("logueado", "false");

    renderUsuario(); // 🔥 ACTUALIZA SIN RECARGAR
}

// 🔑 LOGIN
function iniciarSesionUsuario() {
    localStorage.setItem("logueado", "true");

    renderUsuario(); // 🔥 ACTUALIZA SIN RECARGAR
}

// 🔒 LOGOUT
function cerrarSesion() {
    localStorage.setItem("logueado", "false");

    renderUsuario(); // 🔥 ACTUALIZA SIN RECARGAR
}