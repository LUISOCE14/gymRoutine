const {ipcRenderer} =require('electron');

const btnModificar = document.getElementById("modificar");
const infoModal = document.getElementById("model");


window.onload = function(){
    ipcRenderer.invoke('formMoCli');
}


ipcRenderer.on('Respu',(e,element)=>{
    let template ="";
    template =`
    <div class="container text-warning  ">
    <h5 class="m-3 text-center">Modificar datos</h5>
    <form class="row g-2 mb-3">

        <div class="col-12">

            <label for="inputAddress" class="form-label">Nombre</label>
            <input type="text" class="form-control input1" id="Nombre" value="${element.Nombre}" >
          </div>
          <input type="text"  id="idUsuario" hidden value="${element.IdUsuario}">

        <div class="col">
          <label for="inputEmail4" class="form-label">Peso</label>
          <input type="text" class="form-control input1" id="Peso" value="${element.Peso}">
        </div>

        <div class="col">
          <label for="inputPassword4" class="form-label">Altura</label>
          <input type="text" class="form-control input1" id="Altura" value="${element.Altura}">
        </div>


        <div class="col">
            <label for="inputCity" class="form-label">Edad</label>
            <input type="text" class="form-control input1" id="Edad" value="${element.Edad}">
          </div>

          <div class="col">
                <label for="inputCity" class="form-label">IMC</label>
                <input type="text" class="form-control input1" id="Imc" value="${element.IMC}">
          </div>
          <input type="hidden" class="form-control input1" id="correo" value="${element.Correo}">
      </form>
  `; 

  infoModal.innerHTML = template;

});

btnModificar.onclick=function(){
const nombre = document.getElementById("Nombre");
const idusuario = document.getElementById("idUsuario");
const peso = document.getElementById("Peso");
const altura = document.getElementById("Altura");
const edad = document.getElementById("Edad");
const imc = document.getElementById("Imc");
const correo= document.getElementById("correo")
console.log("correo")

    const user ={
        Nombre : nombre.value,
        Correo: correo.value,
        id: idusuario.value,
        Peso: peso.value,
        Altura: altura.value,
        Edad: edad.value,
        IMC: imc.value
    }
   ipcRenderer.invoke("modifiUser",user);

}