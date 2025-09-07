document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".agregar");
    const listaCarrito = document.getElementById("lista-carrito"); 
    const totalSpan = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout");
    const contadorIcono = document.getElementById("contador"); 

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    function actualizarContadorIcono() {
        if (contadorIcono) {
            contadorIcono.textContent = carrito.length;
        }
    }


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
            li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;

            li.appendChild(btnEliminar);
            listaCarrito.appendChild(li);
        });

        totalSpan.textContent = total.toLocaleString();
    }


    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const producto = e.target.closest(".producto, .insumo");
                const nombre = producto.getAttribute("data-nombre");
                const precio = parseInt(producto.getAttribute("data-precio"));

                carrito.push({ nombre, precio });

  
                localStorage.setItem("carrito", JSON.stringify(carrito));

                actualizarContadorIcono();
            });
        });
    }

    actualizarContadorIcono();
    renderCarrito();
});

// barra de buzqueda 
function buscar() {
    let input = document.getElementById("input-busqueda").value.toLowerCase();


    let items = document.querySelectorAll(".producto, .insumo");

    items.forEach(item => {
        let nombre = item.getAttribute("data-nombre").toLowerCase();
        
        if (nombre.includes(input)) {
        item.style.display = "flex"; 
        } else {
        item.style.display = "none";
        }
    });

}