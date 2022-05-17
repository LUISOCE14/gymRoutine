const {ipcRenderer} =require('electron');

let btnlogin;
let email;
let passw;

window.onload = function (){

  email = document.getElementById("email");
  passw = document.getElementById("password");
  btnlogin = document.getElementById("login");

console.log(email);
  btnlogin.onclick = function(){
    const user = {
      correo: email.value,
      pass: passw.value

    };
    
    ipcRenderer.invoke("login",user);
  }

};


ipcRenderer.on('resultado',()=>{
  
  console.log(user.correo);

  localStorage.setItem("titulo", );

});
