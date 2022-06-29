const salir = document.querySelector("#btnSalir")
const pos = window.history.length;

if (pos == 1) salir.classList.add("disabled")
else{
    salir.addEventListener("click", ()=>{
    
        if (pos > 1) window.history.back();
       
     })
}
