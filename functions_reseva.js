const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const telefono = document.getElementById("telefono")
const datetime = document.getElementById("datetime")
const form= document.getElementById("form")
const errores= document.getElementById("errores")

const set = new Set();


nombre.addEventListener('keyup',function(e){
    if(nombre.value.length <=3){
        nombre.classList.add("error");
        set.add("<p> Completar campo Nombre.</p>");
    }else{
        nombre.classList.remove("error");
        set.delete("<p> Completar campo Nombre.</p> ");
    }
});

email.addEventListener('keyup',function(e){
    if(!email.value.includes("@")){
        email.classList.add("error");
        set.add("<p> Completar campo Email con un @. </p>")
    }else{
        email.classList.remove("error");
        set.delete("<p> Completar campo Email con un @. </p>")
    }
});

telefono.addEventListener('keyup',function(e){
    if(telefono.value.length !==9){
        telefono.classList.add("error");
        set.add("<p> Completar campo Teléfono con solo 9 digítos. </p>")
    }else{
        telefono.classList.remove("error");
        set.delete("<p> Completar campo Teléfono con solo 9 digítos. </p>")
    }
});


//valida que el campo no este vacio y que este el mismo tiempo y hora actual
datetime.addEventListener('change',function(e){ 
    if (!datetime.value || new Date(datetime.value) <= new Date()) {
    datetime.classList.add("error");
    set.add("<p> Completar campo Fecha y Hora. </p>")
} else {
    datetime.classList.remove("error");
    set.delete("<p> Completar campo Fecha y Hora. </p>")
}
})

form.addEventListener('submit', function(e) {
    errores.innerHTML = "";
    let hayErrores = false;

    document.querySelectorAll("input").forEach(element => {
        if (element.classList.contains("error")) {
            hayErrores = true;
        }
    });

    if (hayErrores) {
        e.preventDefault();
        errores.innerHTML = "<p>Error, revisa y rellena los campos que están en rosa.</p>";
    }
});

