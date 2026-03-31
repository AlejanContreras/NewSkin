// ===== ABRIR MODAL LOGIN =====
function abrirInicioSesion() {

    if (document.getElementById("modalLogin")) return;

    const modal = document.createElement("div");
    modal.id = "modalLogin";
    modal.classList.add("modalInicioSesion");

    modal.innerHTML = `
        <div class="modalInicioSesion-box">

            <span class="cerrarInicioSesion">&times;</span>

            <h2>Iniciar Sesión</h2>

            <div class="login-opciones">

                <div class="login-col">
                    <h4>Correo</h4>

                    <input type="email" id="loginEmail" placeholder="Correo" autocomplete="email">

                    <div class="password-boxLogin">
                        <input type="password" id="loginPassword" placeholder="Contraseña" autocomplete="current-password">
                        <span id="toggleLoginPassword">👁️</span>
                    </div>

                    <button id="btnLoginA">Entrar</button>
                </div>

                <div class="login-col">
                    <h4>Usuario</h4>

                    <input type="text" id="loginNombre" placeholder="Nombre y Apellido" autocomplete="name">
                    <input type="text" id="loginCelular" placeholder="Celular" autocomplete="tel">

                    <button id="btnLoginB">Entrar</button>
                </div>

            </div>

            <p id="errorLogin" style="color:red; font-size:13px;"></p>

        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".cerrarInicioSesion").onclick = () => modal.remove();

    document.getElementById("btnLoginA").onclick = loginConCorreo;
    document.getElementById("btnLoginB").onclick = loginConUsuario;
    document.getElementById("toggleLoginPassword").onclick = toggleLoginPassword;

    document.getElementById("loginPassword").addEventListener("keypress", function (e) {
        if (e.key === "Enter") loginConCorreo();
    });

    document.getElementById("loginCelular").addEventListener("keypress", function (e) {
        if (e.key === "Enter") loginConUsuario();
    });

    document.getElementById("loginEmail").focus();
}

// ===== LOGIN CORREO =====
function loginConCorreo() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("errorLogin");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    error.textContent = "";

    if (!email || !password) {
        error.textContent = "Completa todos los campos";
        mostrarToast("Completa todos los campos", "error");
        return;
    }

    if (!usuario) {
        error.textContent = "No hay usuarios registrados";
        mostrarToast("No hay usuarios registrados", "error");
        return;
    }

    if (email === usuario.email && password === usuario.password) {

        localStorage.setItem("logueado", "true");

        // 🔥🔥🔥 SOLUCIÓN
        window.dispatchEvent(new Event("actualizarCarritoUI"));

        mostrarToast("Login exitoso", "success");
        document.getElementById("modalLogin").remove();

        renderUsuario();

    } else {
        error.textContent = "Correo o contraseña incorrectos";
        mostrarToast("Correo o contraseña incorrectos", "error");
    }
}

// ===== LOGIN USUARIO =====
function loginConUsuario() {

    const nombre = document.getElementById("loginNombre").value.trim();
    const celular = document.getElementById("loginCelular").value.trim();
    const error = document.getElementById("errorLogin");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    error.textContent = "";

    if (!nombre || !celular) {
        error.textContent = "Completa todos los campos";
        mostrarToast("Completa todos los campos", "error");
        return;
    }

    if (!usuario) {
        error.textContent = "No hay usuarios registrados";
        mostrarToast("No hay usuarios registrados", "error");
        return;
    }

    if (nombre === usuario.nombre && celular === usuario.celular) {

        localStorage.setItem("logueado", "true");

        window.dispatchEvent(new Event("actualizarCarritoUI"));

        mostrarToast("Login exitoso", "success");
        document.getElementById("modalLogin").remove();

        renderUsuario();

    } else {
        error.textContent = "Datos incorrectos";
        mostrarToast("Datos incorrectos", "error");
    }
}

// ===== PASSWORD =====
function toggleLoginPassword() {

    const input = document.getElementById("loginPassword");
    const icon = document.getElementById("toggleLoginPassword");

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}