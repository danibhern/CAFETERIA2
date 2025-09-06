document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".agregar");
    const listaCarrito = document.getElementById("lista-carrito"); // existe solo en carrito.html
    const totalSpan = document.getElementById("total"); // existe solo en carrito.html
    const checkoutBtn = document.getElementById("checkout"); // existe solo en carrito.html
    const contadorIcono = document.getElementById("contador"); // existe en pedido.html

    // Cargar carrito desde localStorage o crear vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // ✅ Actualiza contador del ícono
    function actualizarContadorIcono() {
        if (contadorIcono) {
            contadorIcono.textContent = carrito.length;
        }
    }

    // ✅ Renderiza carrito (solo si estamos en carrito.html)
    function renderCarrito() {
        if (!listaCarrito || !totalSpan) return; // si no existe, no hace nada

        listaCarrito.innerHTML = "";
        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<li>No hay productos aún.</li>";
            totalSpan.textContent = "0";
            return;
        }

        let total = 0;
        carrito.forEach((item, index) => {
            total += item.precio;

            const li = document.createElement("li");
            li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;

            // Botón eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";
            btnEliminar.style.marginLeft = "10px";
            btnEliminar.addEventListener("click", () => {
                carrito.splice(index, 1); // elimina del array
                localStorage.setItem("carrito", JSON.stringify(carrito)); // actualizar localStorage
                renderCarrito();
                actualizarContadorIcono();
            });

            li.appendChild(btnEliminar);
            listaCarrito.appendChild(li);
        });

        totalSpan.textContent = total.toLocaleString();
    }

    // ✅ Evento click en "Agregar" (solo en pedido.html)
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const producto = e.target.closest(".producto, .insumo");
                const nombre = producto.getAttribute("data-nombre");
                const precio = parseInt(producto.getAttribute("data-precio"));

                carrito.push({ nombre, precio });

                // Guardar en localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));

                actualizarContadorIcono();
                alert(`${nombre} agregado al carrito ✅`);
            });
        });
    }

    // ✅ Botón de pagar (solo en carrito.html)
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
            } else {
                alert("¡Gracias por tu compra! 🛒");
                carrito = []; // vaciar carrito
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderCarrito();
                actualizarContadorIcono();
            }
        });
    }

    // Inicializar
    actualizarContadorIcono();
    renderCarrito();
});
function buscar() {
    let input = document.getElementById("input-busqueda").value.toLowerCase();

    // Seleccionamos todos los productos e insumos
    let items = document.querySelectorAll(".producto, .insumo");

    items.forEach(item => {
        let nombre = item.getAttribute("data-nombre").toLowerCase();
        
        // Si coincide el texto, se muestra; si no, se oculta
        if (nombre.includes(input)) {
        item.style.display = "flex"; // o "block", según tu CSS
        } else {
        item.style.display = "none";
        }
    });
}