
const images = document.querySelector('.carousel-images');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

function showSlide(i) {
  const total = images.children.length;
  if (i < 0) index = total - 1;
  else if (i >= total) index = 0;
  else index = i;
  images.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

setInterval(() => showSlide(index + 1), 5000);
