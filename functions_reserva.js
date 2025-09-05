const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const telefono = document.getElementById("telefono")
const fecha = document.getElementById("fecha")
const hora = document.getElementById("hora")
const form= document.getElementById("form")
const errores= document.getElementById("errores")

const set = new Set();

nombre.addEventListener('keyup',function(e){
    if(nombre.value.length <=3){
        nombre.classList.add("error");
        set.add("<p> Completar campo Nombre.</p>");
    }else{
        nombre.classList.remove("error");
        set.delete("<p> Completar campo Nombre.</p>");
    }
});

email.addEventListener('keyup',function(e){
    if(!email.value.includes("@")){
        email.classList.add("error");
        set.add("<p> Completar campo Email con un @. </p>");
    }else{
        email.classList.remove("error");
        set.delete("<p> Completar campo Email con un @. </p>");
    }
});

telefono.addEventListener('keyup',function(e){
    if(telefono.value.length !==9){
        telefono.classList.add("error");
        set.add("<p> Completar campo Teléfono con solo 9 dígitos. </p>");
    }else{
        telefono.classList.remove("error");
        set.delete("<p> Completar campo Teléfono con solo 9 dígitos. </p>");
    }
});

fecha.addEventListener('change',function(e){
    if(!fecha.value){
        fecha.classList.add("error");
        set.add("<p> Completar campo Fecha. </p>");
    } else {
        fecha.classList.remove("error");
        set.delete("<p> Completar campo Fecha. </p>");
    }
});

hora.addEventListener('change',function(e){
    if(!hora.value){
        hora.classList.add("error");
        set.add("<p> Completar campo Hora. </p>");
    } else {
        hora.classList.remove("error");
        set.delete("<p> Completar campo Hora. </p>");
    }
});


    
form.addEventListener('submit', function(e) {
    errores.innerHTML = "";
    let hayErrores = false;

    document.querySelectorAll("input, select").forEach(element => {
        if (element.classList.contains("error")) {
            hayErrores = true;
        }
    });

    if (hayErrores) {
        e.preventDefault();
        // Mostrar todos los mensajes guardados en el Set
        errores.innerHTML = Array.from(set).join("");
    }
});
/* form.addEventListener('submit', function(e) {
    errores.innerHTML = "";
    let hayErrores = false;

    document.querySelectorAll("input, select").forEach(element => {
        if (element.classList.contains("error")) {
            hayErrores = true;
        }
    });

    if (hayErrores) {
        e.preventDefault();
        errores.innerHTML = "<p>Error, revisa y rellena los campos que están en rosa.</p>";
    }
}); */

