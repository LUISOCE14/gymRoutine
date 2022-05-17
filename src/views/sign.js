const {ipcRenderer} =require('electron');

let btnlogin;
let email;
let nombre;
let passw;

window.onload = function (){

  nombre = document.getElementById("nombre");
  email = document.getElementById("email");
  passw = document.getElementById("password");
  btnlogin = document.getElementById("login");

  btnlogin.onclick = function(){
    const user = {
    Nombre: nombre.value,
      Correo: email.value,
      Contraseña: passw.value
    };
    
    ipcRenderer.invoke("registrar",user);
  }

};

ipcRenderer.on('respuesta',(e,messaje)=>{
  
   window.location.href = "./login.html";
});