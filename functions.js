const carrusel = document.querySelector(".carrusel-imagenes");
const imagenes = document.querySelectorAll(".carrusel-imagenes img");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;

function mostrarImagen() {
  const width = imagenes[0].clientWidth; // ancho de la imagen
  carrusel.style.transform = `translateX(${-index * width}px)`;
}

next.addEventListener("click", () => {
  index++;
  if (index >= imagenes.length) {
    index = 0; // volver al inicio
  }
  mostrarImagen();
});

prev.addEventListener("click", () => {
  index--;
  if (index < 0) {
    index = imagenes.length - 1; // ir a la última
  }
  mostrarImagen();
});

// Carrusel automático cada 5 segundos
setInterval(() => {
  index++;
  if (index >= imagenes.length) {
    index = 0;
  }
  mostrarImagen();
}, 5000);

