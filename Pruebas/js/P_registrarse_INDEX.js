// ===== ABRIR MODAL REGISTRO =====
function abrirRegistro() {

    if (document.getElementById("modalRegistro")) return;

    const modal = document.createElement("div");
    modal.id = "modalRegistro";
    modal.classList.add("modalRegistro");

    modal.innerHTML = `
        <div class="modalRegistro-box">

            <span class="cerrarRegistro">&times;</span>

            <h2>Registro</h2>

            <div class="filaRegistro">
                <input type="text" id="nombre" placeholder="Nombre">
                <input type="text" id="apellido" placeholder="Apellido">
            </div>

            <input type="email" id="email" placeholder="Correo Electrónico">

            <div class="password-boxRegistro">
                <input type="password" id="password" placeholder="Contraseña">
                <span id="togglePassword">👁️</span>
            </div>

            <input type="text" id="celular" placeholder="Número de Celular">

            <div class="terminos-boxRegistro">
                <label>
                    <input type="checkbox" id="checkTerminos">
                    Acepto los <span id="toggleTerminos">Términos y Condiciones</span>
                </label>

                <div id="contenidoTerminos" class="contenido-terminosRegistro">
                    <p>
                        Aquí van los términos y condiciones.
                    </p>
                </div>
            </div>

            <p id="errorMsg" style="color:red; font-size:13px;"></p>

            <button id="btnRegistrar">Crear cuenta</button>

            <p class="login-linkRegistro">
                ¿Ya tienes una cuenta? <span id="irLogin">Iniciar Sesión</span>
            </p>

        </div>
    `;

    document.body.appendChild(modal);

    // cerrar
    modal.querySelector(".cerrarRegistro").onclick = () => modal.remove();

    // eventos
    document.getElementById("btnRegistrar").onclick = registrarUsuario;
    document.getElementById("toggleTerminos").onclick = toggleTerminos;
    document.getElementById("irLogin").onclick = irALogin;
    document.getElementById("togglePassword").onclick = togglePassword;
}


// ===== REGISTRAR Y GUARDAR =====
function registrarUsuario() {

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const check = document.getElementById("checkTerminos").checked;

    const error = document.getElementById("errorMsg");
    error.textContent = "";

    // ===== VALIDACIONES =====

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre) || !regexNombre.test(apellido)) {
        error.textContent = "Nombre y apellido solo deben contener letras";
        return;
    }

    const regexCelular = /^3\d{9}$/;
    if (!regexCelular.test(celular)) {
        error.textContent = "El celular debe tener 10 dígitos y comenzar con 3";
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        error.textContent = "Correo electrónico inválido";
        return;
    }

    if (password.length < 6) {
        error.textContent = "La contraseña debe tener mínimo 6 caracteres";
        return;
    }

    if (!nombre || !apellido || !email || !password || !celular) {
        error.textContent = "Completa todos los campos";
        return;
    }

    if (!check) {
        error.textContent = "Debes aceptar los términos";
        return;
    }

    // ===== GUARDAR =====
    const usuario = {
        nombre: nombre + " " + apellido,
        email,
        password,
        celular
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("logueado", "false");

    alert("Registro exitoso");

    // cerrar modal
    document.getElementById("modalRegistro").remove();

    // 🔥 actualizar UI (PC + móvil)
    if (typeof renderUsuario === "function") {
        renderUsuario();
    }
}


// ===== FUNCIONES =====

function toggleTerminos() {
    const contenido = document.getElementById("contenidoTerminos");
    contenido.classList.toggle("activo");
}

function irALogin() {
    alert("Abrir modal de login");
}

function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.getElementById("togglePassword");

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}