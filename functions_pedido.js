document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".agregar");
    const listaCarrito = document.getElementById("lista-carrito"); 
    const totalSpan = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout");
    const contadorIcono = document.getElementById("contador"); 

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para actualizar contador del carrito
    function actualizarContadorIcono() {
        if (contadorIcono) {
            contadorIcono.textContent = carrito.length;
        }
    }

    // Función para renderizar el carrito
    function renderCarrito() {
        if (!listaCarrito || !totalSpan) return; 

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
            li.classList.add("item-carrito");

            // Imagen del producto
            const img = document.createElement("img");
            img.src = item.imagen;
            img.alt = item.nombre;
            img.classList.add("img-carrito");

            // Texto del producto
            const texto = document.createElement("span");
            texto.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;

            // Botón eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";
            btnEliminar.classList.add("btn-eliminar");
            btnEliminar.addEventListener("click", () => {
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderCarrito();
                actualizarContadorIcono();
            });

            li.appendChild(img);
            li.appendChild(texto);
            li.appendChild(btnEliminar);

            listaCarrito.appendChild(li);
        });

        totalSpan.textContent = total.toLocaleString();
    }

    // Agregar productos al carrito
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const producto = e.target.closest(".producto, .insumo");
                const nombre = producto.getAttribute("data-nombre");
                const precio = parseInt(producto.getAttribute("data-precio"));
                const imagen = producto.querySelector("img").src;

                carrito.push({ nombre, precio, imagen });
                localStorage.setItem("carrito", JSON.stringify(carrito));

                renderCarrito();
                actualizarContadorIcono();
            });
        });
    }

    // Renderizar carrito al cargar la página
    renderCarrito();
    actualizarContadorIcono();
});

// Función de búsqueda
function buscar() {
    const input = document.getElementById("input-busqueda").value.toLowerCase();
    const items = document.querySelectorAll(".producto, .insumo");

    items.forEach(item => {
        const nombre = item.getAttribute("data-nombre").toLowerCase();
        item.style.display = nombre.includes(input) ? "flex" : "none";
    });
}
