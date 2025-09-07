const url = 'menu-nebula.pdf'; 

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js';

let pdfDoc = null,
    pageNum = 1,
    scale = 1.0,
    canvas = document.getElementById('pdf-canvas'),
    ctx = canvas.getContext('2d');

function renderPage(num) {
  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    page.render(renderContext);
  });
}

document.getElementById('zoomIn').addEventListener('click', () => {
  if (scale < 3.0) {
    scale += 0.1;
    renderPage(pageNum);
  }
});

document.getElementById('zoomOut').addEventListener('click', () => {
  if (scale > 0.5) {
    scale -= 0.1;
    renderPage(pageNum);
  }
});

pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  renderPage(pageNum);
});
