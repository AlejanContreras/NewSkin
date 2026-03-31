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
                        TÉRMINOS Y CONDICIONES – NEWSKIN
                        <br><br>
                        1. INFORMACIÓN GENERAL
                            NewSkin es una tienda web en desarrollo con fines académicos y demostrativos. Los productos, precios y disponibilidad mostrados pueden no corresponder a una oferta comercial real.
                        <br>
                        2. USO DEL SITIO
                            El usuario se compromete a hacer un uso adecuado de la página, sin realizar acciones que afecten su funcionamiento, seguridad o integridad.
                        <br>
                        3. PRODUCTOS Y PRECIOS
                            Los productos exhibidos son representaciones visuales. Los precios y características pueden cambiar sin previo aviso.
                        <br>
                        4. PEDIDOS Y COMPRAS
                            Las acciones de “compra” dentro del sitio pueden ser simulaciones con fines académicos. No garantizan una transacción real ni generan obligación comercial.
                        <br>
                        5. DATOS DEL USUARIO
                            La información ingresada por el usuario será utilizada únicamente con fines de prueba dentro del sistema. No se garantiza almacenamiento permanente ni uso comercial.
                        <br>
                        6. RESPONSABILIDAD
                            NewSkin no se hace responsable por errores en la información, fallos técnicos o interrupciones del servicio.
                        <br>
                        7. MODIFICACIONES
                            Estos términos pueden ser modificados en cualquier momento sin previo aviso.
                        <br>
                        8. CONTACTO
                            Para cualquier duda o información, el usuario puede comunicarse a través de los canales disponibles en la página.
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

    /* 🔥 BLOQUEAR SCROLL DEL FONDO */
    document.body.classList.add("modal-abierto");

    modal.querySelector(".cerrarRegistro").onclick = () => {
        modal.remove();
        document.body.classList.remove("modal-abierto"); /* 🔥 desbloquear */
    };

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

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexNombre.test(nombre) || !regexNombre.test(apellido)) {
        error.textContent = "Nombre y apellido solo deben contener letras";
        mostrarToast("Nombre inválido", "error");
        return;
    }

    const regexCelular = /^3\d{9}$/;
    if (!regexCelular.test(celular)) {
        error.textContent = "El celular debe tener 10 dígitos y comenzar con 3";
        mostrarToast("Celular inválido", "error");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        error.textContent = "Correo electrónico inválido";
        mostrarToast("Correo inválido", "error");
        return;
    }

    if (password.length < 6) {
        error.textContent = "La contraseña debe tener mínimo 6 caracteres";
        mostrarToast("Contraseña muy corta", "error");
        return;
    }

    if (!nombre || !apellido || !email || !password || !celular) {
        error.textContent = "Completa todos los campos";
        mostrarToast("Completa todos los campos", "error");
        return;
    }

    if (!check) {
        error.textContent = "Debes aceptar los términos";
        mostrarToast("Acepta los términos", "error");
        return;
    }

    const usuario = {
        nombre: nombre + " " + apellido,
        email,
        password,
        celular
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("logueado", "false");

    mostrarToast("Registro exitoso", "success");

    document.getElementById("modalRegistro").remove();
    document.body.classList.remove("modal-abierto"); /* 🔥 desbloquear */

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
    mostrarToast("Abriendo login...", "info");

    document.getElementById("modalRegistro").remove();
    document.body.classList.remove("modal-abierto"); /* 🔥 desbloquear */

    abrirInicioSesion();
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