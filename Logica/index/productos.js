/* ===== LISTA DE PRODUCTOS ===== */
/* Base de datos temporal */

const productos = [

    {
        id:1,
        nombre:"Modelo Básico",
        precio:45000,
        descripcion:"Camiseta limpia",
        imagenes:["img/modelo1.jpg"],
        categoria:"sin_estampado"
    },
    
    {
        id:2,
        nombre:"Street Style",
        precio:50000,
        descripcion:"Estampado frontal",
        imagenes:["img/modelo2.jpg"],
        categoria:"con_estampado"
    },
    
    {
        id:3,
        nombre:"Urban Pro",
        precio:55000,
        descripcion:"Doble estampado",
        imagenes:["img/modelo3.jpg"],
        categoria:"doble_estampado"
    },
    
    {
        id:4,
        nombre:"Minimal",
        precio:45000,
        descripcion:"Diseño simple",
        imagenes:["img/modelo4.jpg"],
        categoria:"sin_estampado"
    },
    
    {
        id:5,
        nombre:"Grafiti",
        precio:52000,
        descripcion:"Arte urbano",
        imagenes:["img/modelo5.jpg"],
        categoria:"con_estampado"
    },
    
    {
        id:6,
        nombre:"Dark Style",
        precio:60000,
        descripcion:"Doble print",
        imagenes:["img/modelo6.jpg"],
        categoria:"doble_estampado"
    },
    
    {
        id:7,
        nombre:"Basic White",
        precio:43000,
        descripcion:"Sin diseño",
        imagenes:["img/modelo7.jpg"],
        categoria:"sin_estampado"
    },
    
    
    {
        id:8,
        nombre:"Gorra NewSkin",
        precio:35000,
        descripcion:"Solo prueba filtro",
        imagenes:[
            "/Pruebas/img/james_2014.jpg",
            "/Pruebas/img/james_copaAmerica_2024.jpeg",
            "/Pruebas/img/james_porto.jpeg",
            "/Pruebas/img/james_realVardrid.jpg"
        ],
        categoria:"gorra"
    }
    
    ];
    
    
    /* ===== OBTENER CONTENEDOR ===== */
    
    const contenedor = document.getElementById("contenedor-productos");
    
    
    /* ===== FUNCION CREAR CARDS ===== */
    
    function mostrarProductos(lista = productos) {
    
        contenedor.innerHTML = "";
    
        lista.forEach(producto => {
    
            const card = document.createElement("div");
            card.classList.add("card");
    
            card.innerHTML = `
                <div class="imagen">
                    <img src="${producto.imagenes[0]}" 
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
    
    /* ===== CARGAR AL INICIAR ===== */
    
    document.addEventListener("DOMContentLoaded", mostrarProductos);