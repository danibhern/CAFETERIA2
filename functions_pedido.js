document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".agregar");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout");
    const contadorIcono = document.getElementById("contador");

    // Cargar carrito desde localStorage o crear vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para actualizar contador del icono
    function actualizarContadorIcono() {
        contadorIcono.textContent = carrito.length;
    }

    // Función para renderizar el carrito en esta página
    function actualizarCarrito() {
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
                actualizarCarrito();
                actualizarContadorIcono();
            });

            li.appendChild(btnEliminar);
            listaCarrito.appendChild(li);
        });

        totalSpan.textContent = total.toLocaleString();
    }

    // Evento click en "Agregar"
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const producto = e.target.closest(".producto, .insumo");
            const nombre = producto.getAttribute("data-nombre");
            const precio = parseInt(producto.getAttribute("data-precio"));

            carrito.push({ nombre, precio });

            // Guardar en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarCarrito();
            actualizarContadorIcono();
        });
    });

    // Botón de pagar
    checkoutBtn.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
        } else {
            alert("¡Gracias por tu compra! 🛒");
            carrito = []; // vaciar carrito
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
            actualizarContadorIcono();
        }
    });

    // Inicializar al cargar la página
    actualizarCarrito();
    actualizarContadorIcono();
});
