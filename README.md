# 🛍️ NewSkin - Tienda Web

## 📌 Descripción
NewSkin es una tienda en línea de ropa tipo e-commerce, desarrollada como proyecto académico para la asignatura **Lenguajes del Internet** (Fundación Universitaria Compensar) y como base para un emprendimiento de ropa con un amigo. Se enfoca en la experiencia de compra: catálogo, detalle de producto, carrito, registro de usuarios e historial de compras.

## 🌐 Demo
👉 [Ver demo en Google Apps Script](https://script.google.com/macros/s/AKfycbzTnASDzUkrdanKRbbshsVCMboNcqEVAOX30eoc0AkGzqJjQ-wGtUgxa-WiT45DUC2d/exec)

## 🚀 Funcionalidades
- **Catálogo de productos** con filtro por categoría y vista de detalle en modal
- **Registro e inicio de sesión** de usuarios, con menú de usuario en el encabezado
- **Carrito de compras**: agregar, editar talla, color o cantidad y eliminar productos, con contador en el encabezado
- **"Comprar ahora"** desde el detalle del producto
- **Finalizar compra**: el usuario selecciona qué productos pagar (pago simulado)
- **Historial de compras** por usuario
- **Notificaciones tipo toast** en lugar de `alert()`
- **Diseño responsive** para celular y escritorio

## 🛠️ Tecnologías
- HTML5
- CSS3 (nativo, sin frameworks)
- JavaScript (vanilla)
- Google Apps Script (despliegue de la demo)
- `localStorage` para persistir usuario, carrito e historial en el navegador

## 📂 Estructura del proyecto
```
NewSkin/
├── Frontend/      # Páginas HTML: index (catálogo) y carrito
├── Estilos/       # CSS separado por módulo: index, login y carrito
├── Logica/        # JavaScript separado por módulo: index, login y carrito
├── Docs/          # Bitácora de progreso y enlaces de imágenes
└── SandBox/       # Entorno de pruebas donde se desarrollan los cambios antes de pasarlos a la versión oficial
```

Cada funcionalidad tiene su propio archivo JS y CSS (por ejemplo `Logica/carrito/finalizar_compra.js` y `Estilos/carrito/finalizar_compra.css`), lo que mantiene el código modular y fácil de mantener.

## 💻 Cómo ejecutarlo localmente
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AlejanContreras/NewSkin.git
   ```
2. Abrir la carpeta con un servidor local (por ejemplo, la extensión **Live Server** de VS Code), porque las rutas de estilos y scripts son absolutas.
3. Abrir `Frontend/index.html`.

## ⚠️ Limitaciones actuales
- No tiene backend ni base de datos: los datos se guardan en el `localStorage` del navegador.
- El pago es simulado; no hay pasarela de pagos real.
- Siguiente paso previsto: conectar un backend con base de datos para usuarios, productos y pedidos.

## 📸 Capturas
<img width="1600" height="900" alt="Captura de NewSkin 1" src="https://github.com/user-attachments/assets/bb1efeb1-e5b7-4cca-b933-afa649a71ee9" />

<img width="1600" height="900" alt="Captura de NewSkin 2" src="https://github.com/user-attachments/assets/d1c7601b-0b4b-44af-96a8-f1de42d720aa" />

<img width="1600" height="900" alt="Captura de NewSkin 3" src="https://github.com/user-attachments/assets/f021a2f7-f28d-407b-b96d-287bb54fe10b" />

<img width="1600" height="900" alt="Captura de NewSkin 4" src="https://github.com/user-attachments/assets/3eeb7233-f228-41b7-8b70-7a4213ab8973" />

## 🎯 Objetivo
Fortalecer habilidades en desarrollo web front-end, lógica de programación con JavaScript y organización modular de una aplicación real.

## 👨‍💻 Autor
**John Alejandro Contreras** · [GitHub](https://github.com/AlejanContreras) · alejan241107@gmail.com
