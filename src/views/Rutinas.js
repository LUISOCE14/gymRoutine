const { main } = require('@popperjs/core');
const {ipcRenderer} = require('electron');

let nombre;
let descri;
let ejercicio;
let listEjer;
let mainrutinas;
let list;
let nomeje;
let infoeje;
let imgMus;
let descrip;
let imgEjec;
let video;
let btnrutinas;
let btnmirutina;
let btncalentami;
let user;
let descriEjer;
let cerrarsesion;
let retos;
let inforeto;
let nomreto;

window.onload = function (){
mainrutinas = document.getElementById("main");
nomeje = document.getElementById("NomEjer");
infoeje = document.getElementById("infoEje");
imgMus=document.getElementById("imgMus");
descrip = document.getElementById("descrip");
imgEjec = document.getElementById("imgejec");
video = document.getElementById("video");  
ejercicio = document.getElementById("ejercicio");
btnrutinas =document.getElementById("rutinas");
btnmirutina = document.getElementById("misRutinas");
btncalentami = document.getElementById("calentamientos");
cerrarsesion = document.getElementById("cerrarSesion");
descriEjer = document.getElementById("infohacer");
inforeto = document.getElementById("infoReto");
nomreto = document.getAnimations("Momreto");
btnmirutina.onclick = misRutinas;
btncalentami.onclick = calentamientos;
cerrarsesion.onclick = cerrarSesion;

//Cargar las rutinas cuando recarga a pagina
ipcRenderer.invoke('getRutinas');


btnrutinas.onclick = rutinaspre;
}


//Devuelve las rutinnes de la base de datos
ipcRenderer.on('getRutinas',(e,result,users)=>{
  list =result;
  user = users[0].IdUsuario;
  DetallesRutina(list);
});


function mostrardetallesRutina(id){
ipcRenderer.invoke('detallesRutina',id);
}

ipcRenderer.on('getDetalles',(e,result)=>{
  let sss=false;
  nomeje.innerHTML = "";
  infoeje.innerHTML ="";
  ejercicio.innerHTML ="";
  listEjer = result;
  list.forEach(element=>{
    if(result[0].idRutina == element.idRutina){
      nombre = element.nombreRutina;
      descri = element.descripcion;
       sss=true;
      return sss;
    }
  });
  

  nomeje.innerHTML = `${nombre} `;
  infoeje.innerHTML = `${descri} `;
  result.forEach(res=>{
     ejercicio.innerHTML +=`
     <tr>
     
     <td > <a href="#" style=" text-decoration:none; color: #FF8243;" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onclick="detalleEjer(${res.idEjercicio})">${res.NombreEjercicio} </a></td>
      <td >${res.Repeticiones}</td>
      <td >${res.Series}</td>
      </tr>
 `;
    
  })

});


//Muestra las rutinas en la pantalla principal de  rutina
function DetallesRutina(li){
if(li[0] != ""){
    li.forEach(element => {
      if(element.IdUsuario == 1){
      mainrutinas.innerHTML +=`
      
      <div class="card border border-dark col text-black m-1" style="width: 13rem;  height: 13rem;  background-color: #FF8243; " onclick = "mostrardetallesRutina(${element.idRutina})"
      data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="card-body">
        <p ></p>
          <h5 class="card-title">${element.nombreRutina}</h5>
          <p class="card-text">${element.descripcion}</p>
        </div>
      </div>
        
    `;  
      }
    });
}

}

//Muestra los detales de la rutina en un modal secundario
function detalleEjer(id){
  listEjer.forEach(element=>{
    if(element.idEjercicio == id){
      nomeje.innerHTML  =`${element.NombreEjercicio} `;  
        descriEjer.innerHTML =`<p>${element.informacion}</p>`; 
        imgMus.innerHTML = `<img src="${element.imagendeMusculo}" alt="Imagen de musculo trabajado" class="m-2" height="200px" width="350px">`; 
        descrip.innerHTML = `<p>${element.descripcion}</p>`; 
        imgEjec.innerHTML = `<img src="${element.imagen}" alt="Imagen de la ejecucion del ejercicio" class="m-2" width="350px" height="200px" >`; 
        video.innerHTML = `<a href="${element.urlVideo}" class="m-2" target="_blank">
        <button class="btn btn-select text-light">Ver video</button>
      </a>`; 
    shouldkip = true;
    return;
    }
})
}

//siguientes dunciones de botones de filtrado

function rutinaspre(){
  mainrutinas.innerHTML ="";
  DetallesRutina(list);
}

function misRutinas(){
  mainrutinas.innerHTML = "";
    list.forEach(element=>{
      if(element.IdUsuario == user){
mainrutinas.innerHTML +=`
      <div class="card border border-dark col m-1  text-black" style="width: 13rem; height: 13rem; background-color: #FF8243; " onclick = "mostrardetallesRutina(${element.idRutina})"
      data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="card-body">
        <p ></p>
          <h5 class="card-title">${element.nombreRutina}</h5>
          <p class="card-text">${element.descripcion}</p>
        </div>
      </div>
    `;  
      }


});
}

function calentamientos(){
  mainrutinas.innerHTML = "";
  ipcRenderer.invoke('getRetos');

}
ipcRenderer.on('getReto',(e,results)=>{
  retos = results;

    retos.forEach(res=>{
      mainrutinas.innerHTML +=`
      <div class="card border border-dark col m-1  text-black" style="width: 13rem; height: 13rem; background-color: #FF8243; " onclick = "mostrardetallesReto(${res.idReto})"
      data-bs-target="#ModalToggle2" data-bs-toggle="modal">
        <div class="card-body">
        <p ></p>
          <h5 class="card-title">${res.NombreReto}</h5>
          <p class="card-text">${res.DuracionReto}</p>
        </div>
      </div>
    `;  
    });
})


function cerrarSesion(){
  ipcRenderer.invoke('cerrarsesion');
}

function mostrardetallesReto(id){
  console.log(id);

  retos.forEach(element=>{
    
    if(element.idReto == id){
      let aux;
      aux = element.DescripcionReto;
      aux  = aux.replace(/\r?\n/g, "<br>");
      console.log("entre");
      nomreto.innerHTML  =`${element.NombreReto} `;  
        inforeto.innerHTML =`<p>Duracion: ${element.DuracionReto}</p> </br>
        <p>Informacion: ${aux}</p> `; 
        if(element.urlrutina != ""){
        inforeto.innerHTML +=`
        <img src="${element.urlrutina}" alt="Imagen de la ejecucion del ejercicio" class="m-2" width="400px" height="300px" >`; 
        }
    shouldkip = true;
    return;
    }
})
}
