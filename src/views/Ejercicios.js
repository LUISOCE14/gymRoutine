const {ipcRenderer} = require('electron');



let listEjer;
let btnhom;
let btnab;
let btnespa;
let btnpech;
let btnpier;
let btnbi;
let btnTri;
let btnAnte;
let btnglu;
let cardi;
let list;
let nomeje;
let infoeje;
let imgMus;
let descrip;
let imgEjec;
let video;
let btntodos;
let cerrarsesion;


window.onload = function(){
    
 listEjer = document.getElementById("ejercicios");
 idBuscar =document.getElementById("buscador");
 btnhom = document.getElementById("hombro");
 btnab = document.getElementById("abdomen");
 btnespa = document.getElementById("espalda");
 btnpech = document.getElementById("pecho");
 btnpier = document.getElementById("pierna");
 btnTri = document.getElementById("tricep");
 btnbi = document.getElementById("bicep");
 btnAnte = document.getElementById("AnteB");
 btnglu = document.getElementById("gluteos");
 cardi = document.getElementById("cardio");
 nomeje = document.getElementById("NomEjer");
 infoeje = document.getElementById("infoEje");
 imgMus=document.getElementById("imgMus");
 descrip = document.getElementById("descrip");
 imgEjec = document.getElementById("imgejec");
 video = document.getElementById("video");  
 btntodos = document.getElementById("todos");
 cerrarsesion = document.getElementById("cerrarSesion");
 btnespa.onclick = filtrarporEspalda;
 btntodos.onclick = ListarTodos2;
 btnhom.onclick = listarHom;
 btnab.onclick = listarAbdo;
 btnpech.onclick = listarPecho;
 btnpier.onclick = listarPierna;
 btnglu.onclick = listaGluteos;
 btnTri.onclick = listaTricep;
 btnbi.onclick = listaBiceps;
 btnAnte.onclick = listaAnte;
 cardi.onclick = listaCardio;
 cerrarsesion.onclick = cerrarSesion;

 ipcRenderer.invoke("cargaejercicios");
 
} 


ipcRenderer.on('ejercicios',(e,results)=>{
  list = results;
  ListarTodos(list);
    

});




function mostrarDescripcion(i){
    let shouldkip = false;
    list.forEach(element=>{
        if(element.idEjercicio == i){
          let aux;
          let aux2;
          aux = element.descripcion;
          aux  = aux.replace(/\r?\n/g, "<br>");
          aux2 = element.informacion;
          aux2 = aux2.replace(/\r?\n/g, "<br>");
          nomeje.innerHTML  =`${element.NombreEjercicio} `;  
            infoeje.innerHTML =`<p>${element.informacion}</p>`; 
            imgMus.innerHTML = `<img src="${element.imagendeMusculo}" alt="Imagen de musculo trabajado" class="m-2" height="200px" width="350px">`; 
            descrip.innerHTML = `<p>${aux}</p>`; 
            imgEjec.innerHTML = `<img src="${element.imagen}" alt="Imagen de la ejecucion del ejercicio" class="m-2" width="350px" height="200px" >`; 
            video.innerHTML = `<a href="${element.urlVideo}" class="m-2" target="_blank">
            <button class="btn btn-select text-light">Ver video</button>
          </a>`; 
        shouldkip = true;
        return;
        }
    })

}

function filtrarporEspalda(){
      let espc = list.filter(res=>{
        return res.NombreMusculo == 'Espalda';
      });
      if(espc[0] != ""){
    listEjer.innerHTML = "";
    espc.forEach(res=>{
 listEjer.innerHTML +=`
    <button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
          <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
       <p class="text-light">${res.NombreEjercicio}
         <br>
         ${res.NombreMusculo}
       </p>
        </button>
    `;  
    });
  }else{
    alert("No hay ejercicios de espalda");
  }
}

function ListarTodos( list){
  if(list[0] != ""){
    list.forEach(element => {
      listEjer.innerHTML +=`
    <button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${element.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
          <img src="${element.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
       <p class="text-light">${element.NombreEjercicio}
         <br>
         ${element.NombreMusculo}
       </p>
        </button>

    `;  
    });

          }
}

function ListarTodos2(){
  listEjer.innerHTML ="";
  ListarTodos(list);
}

function listarAbdo(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Abdomen';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Abdomen");
}
}



function listarPierna(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Pierna';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Pierna");
}
}

function listarPecho(){
  let espc = list.filter(res=>{
    return res.NombreMusculo ==  'Pecho';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Pecho");
}
}

function listarHom(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Hombro';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Hombros");
}
}


function listaGluteos(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Gluteos';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Gluteos");
}
}

function listaTricep(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Tricep';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Tricep");
}
}

function listaBiceps(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Bicep';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Bicep");
}
}

function listaAnte(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'AnteBrazo';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de AnteBrazo");
}
}

function listaCardio(){
  let espc = list.filter(res=>{
    return res.NombreMusculo == 'Cardio';
  });
  if(espc[0] != ""){
listEjer.innerHTML = "";
espc.forEach(res=>{
listEjer.innerHTML +=`
<button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${res.idEjercicio})" aria-current="true" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
      <img src="${res.imagendeMusculo}" alt="" height="65px" width="70px" class="m-1 rounded rounded-circle border border-danger border-2" style="float: left;" >
   <p class="text-light">${res.NombreEjercicio}
     <br>
     ${res.NombreMusculo}
   </p>
    </button>
`;  
});
}else{
alert("No hay ejercicios de Cardio")
}
}

function cerrarSesion(){
  ipcRenderer.invoke('cerrarsesion');
}