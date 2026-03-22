// ===== CREAR MODAL =====
function crearModal(id, contenidoHTML) {

    const existente = document.getElementById(id);
    if (existente) existente.remove();

    const modal = document.createElement("div");
    modal.id = id;
    modal.className = "modalUsuario";

    modal.innerHTML = `
        <div class="modalUsuario-box">
            <span class="close">&times;</span>
            ${contenidoHTML}
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close").onclick = () => modal.remove();

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}


// ===== MOSTRAR MENU USUARIO =====
function mostrarMenuUsuario() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    crearModal("menuUsuarioModal", `
        <h2>Mi Perfil</h2>

        <div class="campo">
            <label>Nombre</label>
            <input id="nombreUser" type="text" value="${usuario.nombre}" disabled>
        </div>

        <div class="campo">
            <label>Correo</label>
            <input id="emailUser" type="email" value="${usuario.email}" disabled>
        </div>

        <div class="campo">
            <label>Celular</label>
            <input id="celularUser" type="text" value="${usuario.celular || ""}" disabled>
        </div>

        <div class="campo">
            <label>Contraseña</label>
            <div class="password-boxLogin">
                <input id="passwordUser" type="password" value="${usuario.password || ""}" disabled>
                <span id="togglePasswordUser">👁️</span>
            </div>
        </div>

        <div class="acciones-usuario">
            <button id="btnEditar" onclick="activarEdicion()">Editar</button>
            <button id="btnGuardar" onclick="guardarCambiosUsuario()" style="display:none;">Guardar</button>
            <button id="btnCancelar" onclick="cancelarEdicion()" style="display:none;">Cancelar</button>
            <button onclick="cerrarSesionUsuario()">Cerrar sesión</button>
        </div>
    `);

    document.getElementById("togglePasswordUser").onclick = togglePasswordUsuario;
}


// ===== MOSTRAR/OCULTAR PASSWORD =====
function togglePasswordUsuario() {

    const input = document.getElementById("passwordUser");
    const icon = document.getElementById("togglePasswordUser");

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}


// ===== ACTIVAR EDICION =====
function activarEdicion() {

    document.getElementById("nombreUser").disabled = false;
    document.getElementById("emailUser").disabled = false;
    document.getElementById("celularUser").disabled = false;
    document.getElementById("passwordUser").disabled = false;

    document.getElementById("btnEditar").style.display = "none";
    document.getElementById("btnGuardar").style.display = "inline-block";
    document.getElementById("btnCancelar").style.display = "inline-block";
}


// ===== CANCELAR EDICION =====
function cancelarEdicion() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    document.getElementById("nombreUser").value = usuario.nombre;
    document.getElementById("emailUser").value = usuario.email;
    document.getElementById("celularUser").value = usuario.celular || "";
    document.getElementById("passwordUser").value = usuario.password || "";

    document.getElementById("nombreUser").disabled = true;
    document.getElementById("emailUser").disabled = true;
    document.getElementById("celularUser").disabled = true;
    document.getElementById("passwordUser").disabled = true;

    document.getElementById("btnEditar").style.display = "inline-block";
    document.getElementById("btnGuardar").style.display = "none";
    document.getElementById("btnCancelar").style.display = "none";
}


// ===== GUARDAR CAMBIOS =====
function guardarCambiosUsuario() {

    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));

    const nuevoUsuario = {
        ...usuarioActual,
        nombre: document.getElementById("nombreUser").value,
        email: document.getElementById("emailUser").value,
        celular: document.getElementById("celularUser").value,
        password: document.getElementById("passwordUser").value
    };

    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    cancelarEdicion();

    if (typeof renderUsuario === "function") {
        renderUsuario();
    }

    mostrarToast("Datos actualizados correctamente", "success");
}


// ===== CERRAR SESION =====
function cerrarSesionUsuario() {

    localStorage.setItem("logueado", "false");

    const modal = document.getElementById("menuUsuarioModal");
    if (modal) modal.remove();

    if (typeof renderUsuario === "function") {
        renderUsuario();
    }

    mostrarToast("Sesión cerrada", "info");
}