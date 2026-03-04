/* ===== LISTA DE PRODUCTOS ===== */
/* Aquí vive tu base de datos temporal */

const productos = [

    {    id:1,
        nombre:"Modelo Básico",
        precio:45000,
        descripcion:"Camiseta limpia",
        imagen:"img/modelo1.jpg",
        categoria:"sin_estampado"
    },
    
    { id:2, nombre:"Street Style", precio:50000,
    descripcion:"Estampado frontal",
    imagen:"img/modelo2.jpg",
    categoria:"con_estampado" },
    
    { id:3, nombre:"Urban Pro", precio:55000,
    descripcion:"Doble estampado",
    imagen:"img/modelo3.jpg",
    categoria:"doble_estampado" },
    
    { id:4, nombre:"Minimal", precio:45000,
    descripcion:"Diseño simple",
    imagen:"img/modelo4.jpg",
    categoria:"sin_estampado" },
    
    /* 🧢 NUEVOS */
    
    { id:5, nombre:"Grafiti", precio:52000,
    descripcion:"Arte urbano",
    imagen:"img/modelo5.jpg",
    categoria:"con_estampado" },
    
    { id:6, nombre:"Dark Style", precio:60000,
    descripcion:"Doble print",
    imagen:"img/modelo6.jpg",
    categoria:"doble_estampado" },
    
    { id:7, nombre:"Basic White", precio:43000,
    descripcion:"Sin diseño",
    imagen:"img/modelo7.jpg",
    categoria:"sin_estampado" },
    
    { id:8, nombre:"Gorra NewSkin", precio:35000,
    descripcion:"Solo prueba filtro",
    imagen:"img/gorra.jpg",
    categoria:"gorra" }
    
];



/* ===== OBTENER CONTENEDOR DEL HTML ===== */

const contenedor = document.getElementById("contenedor-productos");


/* ===== FUNCION CREAR CARDS + FILTRO ===== */

function mostrarProductos(lista = productos) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="imagen">
                <img src="${producto.imagen}" 
                     alt="${producto.nombre}"
                     style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div class="nombre">${producto.nombre}</div>

            <div class="precio">
                $${producto.precio.toLocaleString()}
            </div>

            <div class="descripcion">
                ${producto.descripcion}
            </div>

            <button class="btn"
                onclick="verDetalle(${producto.id})">
                Ver detalles
            </button>
        `;

        contenedor.appendChild(card);
    });
}




/* ===== VER DETALLE (PRUEBA) ===== */
/* luego aquí conectaremos el modal */

function verDetalle(id){

    const producto = productos.find(p => p.id === id);

    alert(
        producto.nombre +
        "\nPrecio: $" + producto.precio.toLocaleString()
    );
}


/* ===== CARGAR AL INICIAR ===== */

document.addEventListener("DOMContentLoaded", mostrarProductos);