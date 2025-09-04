const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const telefono = document.getElementById("telefono")
const datetime = document.getElementById("datetime")
const form= document.getElementById("form")
const errores= document.getElementById("errores")

const set = new Set();


nombre.addEventListener('keyup',function(e){
    if(nombre.value.length == 0){
        nombre.classList.add("error");
    }else{
        nombre.classList.remove("error");
    }
});

email.addEventListener('keyup',function(e){
    if(!email.value.includes("@")){
        email.classList.add("error");
    }else{
        email.classList.remove("error")
    }
});

telefono.addEventListener('keyup',function(e){
    if(telefono.value.length !==9){
        telefono.classList.add("error");
    }else{
        telefono.classList.remove("error");
    }
});


//valida que el campo no este vacio y que este el mismo tiempo y hora actual
datetime.addEventListener('change',function(e){ 
    if (!datetime.value || new Date(datetime.value) <= new Date()) {
    datetime.classList.add("error");
} else {
    datetime.classList.remove("error");
}
})

form.addEventListener('submit',function(e){
    errores.innerHTML="";

    document.querySelectorAll("input").forEach(element => {
        if(element.classList.contains("error")){
            e.preventDefault();
            set.add("<p> Error, Revisar y rellenar los campos en rosa.")
        }
    
    });
    set.forEach(p=> {
        errores.innerHTML +=p;
    })
})