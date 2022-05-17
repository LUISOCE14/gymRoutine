const {ipcRenderer} = require('electron');

const infoUser = document.getElementById("datosUser");
const btnModificar = document.getElementById("modificar");
let cerrarsesion;

window.onload = function(){

  cerrarsesion = document.getElementById("cerrarSesion");
  cerrarsesion.onclick = cerrarSesion;

const mesaje ={
  users: 1,
  correo: 2
}
ipcRenderer.invoke('getuser',mesaje);

};


ipcRenderer.on('Clientes',(e,user)=>{

  let template = " ";
  template =`
  <div class="col-auto p-2 text-center image-user text-light">
  <img src="./Utilidades/User.png" alt="" width="180px" height="180px" class="rounded-circle ">
  <h4>${user.Nombre}</h4>
  <h5>${user.Correo}</h5>
 </div>


  <div class="container text-light ">
      <div class="">
        <ul class="list-unstyled d-flex mx-auto justify-content-center ">
      <li class="mx-lg-5 ">
        Altura: ${user.Altura}
      </li>
      <li class="mx-5">
        Peso: ${user.Peso}
      </li>
      <li class="mx-5">
          IMC:${user.IMC}
      </li>
        </ul>
      </div>
      <div class="">
        <ul class="list-unstyled d-flex mx-auto justify-content-center">
      <li class="mx-5 justify-content-start">
        Edad: ${user.Edad}
      </li>
        </ul>
      </div>
  </div>  
  `; 
  infoUser.innerHTML = template;  
  });


  btnModificar.onclick =function(){
    ipcRenderer.invoke('creaModal');
  }

  function cerrarSesion(){
    ipcRenderer.invoke('cerrarsesion');
  }




