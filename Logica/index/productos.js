/* ===== LISTA DE PRODUCTOS ===== */
const productos = [

    {
        id: 1,
        nombre: "Porsche Regular Fit",
        precio: 45000,

        descripcion: `Camiseta Regular Fit Porsche (Café) Inspirada en el estilo deportivo premium, esta camiseta regular fit combina comodidad y elegancia urbana.
        <span class="noCard">Su diseño minimalista con estampado frontal le da un toque exclusivo, ideal para looks casuales con personalidad.
        Perfecta para el día a día sin perder estilo.</span>`,

        imagenes: ["https://i.ibb.co/9k2TYf04/Porsche-Cafe.jpg"],
        categoria: "sin_estampado",

        coloresDisponibles: ["Cafe"],
        tallasDisponibles: ["S", "M", "L"]
    },

    {
        id: 2,
        nombre: "Predict The Future",
        precio: 50000,
        descripcion: `Camiseta Regular Fit “Predict The Future” (Morada)
        <span class="noCard">Camiseta regular fit con diseño gráfico moderno que transmite actitud y originalidad.
        Su estampado llamativo y tipografía urbana la convierten en una prenda ideal para destacar en cualquier outfit streetwear.
        Cómoda, versátil y con mucho flow.</span>`,
        imagenes: ["https://i.ibb.co/1f36TsW1/Predict-The-Future-Morado.jpg"],
        categoria: "con_estampado",

        coloresDisponibles: ["Morado"],
        tallasDisponibles: ["S", "M", "L"]
    },

    {
        id: 3,
        nombre: "Atlas Basketball",
        precio: 55000,
        descripcion: `⁠Camiseta NBA “Atlas Basketball” Gráfico conceptual de figura cargando un balón dorado tipo Atlas, <span class="noCard">combinando deporte y significado. Estilo: Deportivo premium.</span>`,
        imagenes: ["https://i.ibb.co/6JfDtJw8/NBA-cargando-Balon.jpg"],
        categoria: "con_estampado",

        coloresDisponibles: ["Blanco","Gris","Negro"],
        tallasDisponibles: ["S", "M", "L"]
    },

    {
        id: 4,
        nombre: "Camiseta NBA",
        precio: 45000,
        descripcion: `Camiseta NBA “Logo Classic” (Gris Ácido) <span class="noCard">Camiseta con efecto acid wash y logo clásico NBA al frente, con vibra retro noventera.Estilo: Vintage / Casual.</span>`,
        imagenes: ["https://i.ibb.co/J0b3b8S/NBA-logo.jpg"],
        categoria: "con_estampado",

        coloresDisponibles: ["Gris"],
        tallasDisponibles: ["S", "M", "L"]
    },

    {
        id: 5,
        nombre: "The Uncle",
        precio: 52000,
        descripcion: ` ⁠Camiseta “The Uncle” Camiseta regular fit con doble estampado <span class="noCard">: frente minimalista y espalda con ilustración estilo El Padrino con toque humorístico. Estilo: Streetwear / Cultura pop.</span>`,
        imagenes: ["https://i.ibb.co/sdtzh8pS/The-Uncle-espalda.jpg",
            "https://i.ibb.co/Y4yhm8h1/The-Uncle-Frente.jpg"
        ],
        categoria: "doble_estampado",

        coloresDisponibles: ["Negro","Gris"],
        tallasDisponibles: ["S", "M", "L"]
    },

    {
        id: 6,
        nombre: "Spider-Man Typography",
        precio: 60000,
        descripcion: `Camiseta “Spider-Man Typography” Diseño urbano con logo tipo graffiti <span class="noCard">al frente y máscara de Spider-Man creada con tipografía en la espalda. Estilo: Urbano / Artístico.</span>`,
        imagenes: ["https://i.ibb.co/tThrzQ2q/Spider-Man-delante.jpg",
            "https://i.ibb.co/bj1LpfMC/Spider-Man-detras.jpg"
        ],
        categoria: "doble_estampado",

        coloresDisponibles: ["Negro"],
        tallasDisponibles: ["S", "M", "L"]
    },

    {
        id: 7,
        nombre: "Palm Angels",
        precio: 43000,
        descripcion: `Camiseta “Palm Angels - Angel & Palms”Camiseta negra con gráfico de ángel entre palmeras <span class="noCard">y estética de lujo urbano. Estilo: High-end streetwear</span>`,
        imagenes: ["https://i.ibb.co/4RgzD117/Palm-Angeles-letras-Dorado.jpg",
            "https://i.ibb.co/DH2dSwd7/Palm-Angeles-letras-Blancas.jpg"
        ],
        categoria: "doble_estampado",

        coloresDisponibles: ["Negro con Dorado", "Negro con Blanco"],
        tallasDisponibles: ["S", "M", "L", "XL"]
    },

    {
        id: 8,
        nombre: "Gorra NewSkin",
        precio: 35000,
        descripcion: `Gorras Streetwear Snapback Gorras de ajuste regulable con diseños urbanos y deportivos <span class="noCard">que combinan logos icónicos, tipografías llamativas y gráficos modernos. Fabricadas con materiales de buena calidad, ofrecen comodidad y durabilidad para el uso diario. Un accesorio versátil, ideal para complementar cualquier outfit y destacar con estilo propio</span>`,
        imagenes: [
            "https://i.ibb.co/1Jm0F2mP/Colecion-Gorras.jpg",
            "https://i.ibb.co/j92qdBbZ/Gorra-LA-amarillo-Rojo.jpg",
            "https://i.ibb.co/zWmcRpgW/Gorra-NY-verde.jpg",
            "https://i.ibb.co/zW7zTYM4/Gorra-Sex-negro.jpg"
        ],
        categoria: "gorra",

        coloresDisponibles: ["Amarillo con Rojo", "Verde", "Negro"],
        tallasDisponibles: ["S", "M", "L"]
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