/* ===== LISTA DE PRODUCTOS ===== */

const productos = [

    {
        id:1,
        nombre:"Porsche Regular Fit",
        precio:45000,
        descripcion:"camisa limpia regular FIt",
        imagenes:["/Pruebas/img/camisetas/sin estampado/Porsche_Cafe.jpeg"],
        categoria:"sin_estampado",

        coloresDisponibles:["Cafe"],
        tallasDisponibles:["S","M","L"]
    },
    
    {
        id:2,
        nombre:"Predict The Future",
        precio:50000,
        descripcion:"camisa regular fit",
        imagenes:["/Pruebas/img/camisetas/sin estampado/PredictTheFuture_Morado.jpeg"],
        categoria:"sin_estampado",

        coloresDisponibles:["Morado"],
        tallasDisponibles:["S","M","L"]
    },
    
    {
        id:3,
        nombre:"Mundo NBA",
        precio:55000,
        descripcion:"camiseta estampada regular Fit de NBA",
        imagenes:["/Pruebas/img/camisetas/con estampado/NBA_cargandoBalon.jpeg"],
        categoria:"con_estampado",

        coloresDisponibles:["Blanco","Negro"],
        tallasDisponibles:["S","M","L"]
    },
    
    {
        id:4,
        nombre:"Camiseta NBA",
        precio:45000,
        descripcion:"Diseño simple del logo de NBA",
        imagenes:["/Pruebas/img/camisetas/con estampado/NBA_logo.jpeg"],
        categoria:"con_estampado",

        coloresDisponibles:["Gris"],
        tallasDisponibles:["S","M","L"]
    },
    
    {
        id:5,
        nombre:"The Uncle",
        precio:52000,
        descripcion:"camiseta con estapado doble de rico mc pato",
        imagenes:["/Pruebas/img/camisetas/estampado doble/TheUncle_espalda.jpeg",
            "/Pruebas/img/camisetas/estampado doble/TheUncle_Frente.jpeg"
        ],
        categoria:"doble_estampado",

        coloresDisponibles:["Negro","Gris Oscuro"],
        tallasDisponibles:["S","M","L"]
    },
    
    {
        id:6,
        nombre:"De Oriente",
        precio:60000,
        descripcion:"Camiseta de Spider Man, con estapado doble",
        imagenes:["/Pruebas/img/camisetas/estampado doble/SpiderMan_delante.jpeg",
            "/Pruebas/img/camisetas/estampado doble/SpiderMan_detras.jpeg"
        ],
        categoria:"doble_estampado",

        coloresDisponibles:["Negro"],
        tallasDisponibles:["S","M","L"]
    },
    
    {
        id:7,
        nombre:"Plam Angels",
        precio:43000,
        descripcion:"Camiseta Plam Angels Oversize",
        imagenes:["/Pruebas/img/camisetas/estampado doble/PalmAngeles_letrasDorado.jpeg",
            "/Pruebas/img/camisetas/estampado doble/PalmAngeles_letrasBlancas.jpeg"
        ],
        categoria:"doble_estampado",

        coloresDisponibles:["Negro con Dorado", "Negro con Blanco"],
        tallasDisponibles:["S","M","L","XL"]
    },
    
    {
        id:8,
        nombre:"Gorra NewSkin",
        precio:35000,
        descripcion:"Solo prueba filtro",
        imagenes:[
            "/Pruebas/img/pruebasIMGjames/james_2014.jpg",
            "/Pruebas/img/pruebasIMGjames/james_copaAmerica_2024.jpeg",
            "/Pruebas/img/pruebasIMGjames/james_porto.jpeg",
            "/Pruebas/img/pruebasIMGjames/james_realVardrid.jpg"
        ],
        categoria:"gorra",

        coloresDisponibles:["Amarillo","Azul","Rojo"],
        tallasDisponibles:["S","M","L"]
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