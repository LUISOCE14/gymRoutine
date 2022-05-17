const { computeStyles } = require('@popperjs/core');
const {ipcRenderer, MenuItem} = require('electron');
const { getCharsetNumber } = require('mysql/lib/ConnectionConfig');
const { DOUBLE } = require('mysql/lib/protocol/constants/types');

let listaEjercicios;
let user;
let ejerciciosrutina=[];
let ejercicos;
let cargarEjercicos;
let DetallesEjerRutina;
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
let btntodos;
let ejerciciosderutina;


window.onload = function(){
  ejercicos = document.getElementById("ejercicios");
  cargarEjercicos = document.getElementById("AgregarEjercicios");
  DetallesEjerRutina = document.getElementById("detallesEjercicioRutina");
  nombreru = document.getElementById("nombreRutina");
  descrp = document.getElementById("descripcion");
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
 btntodos = document.getElementById("todos");
 ejerciciosderutina = document.getElementById("ejercicosderutina");
 btnespa.onclick = filtrarporEspalda;
 btnhom.onclick = listarHom;
 btnab.onclick = listarAbdo;
 btnpech.onclick = listarPecho;
 btnpier.onclick = listarPierna;
 btnglu.onclick = listaGluteos;
 btnTri.onclick = listaTricep;
 btnbi.onclick = listaBiceps;
 btnAnte.onclick = listaAnte;
cardi.onclick = listaCardio;
cargarEjercicos.onclick = cargarLosEjercicios;

    ipcRenderer.invoke('Enviar');

    btntodos.onclick = ListarTodos2;
}



ipcRenderer.on('listEjercicios',(e,listEjer,use)=>{
listaEjercicios = listEjer;
user= use;
});

function cargarLosEjercicios(){
    ejercicos.innerHTML ="";
    if(listaEjercicios[0] != ""){
        listaEjercicios.forEach(element => {
          ejercicos.innerHTML +=`
        <button  class="list-group-item list-group-item-action " onclick="mostrarDescripcion(${element.idEjercicio})" aria-current="true" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" style="width: 650px; background-color: #333333; border-bottom: 1px solid gray;">
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

function mostrarDescripcion(i){
        let shouldkip = false;
        console.log("entre");
        listaEjercicios.forEach(element=>{
            if(element.idEjercicio == i){
                DetallesEjerRutina.innerHTML = `
                <p class="m-2" id="nombre">${element.NombreEjercicio}</p>
                <input hidden value="${element.idEjercicio}" type="text" id="idEjercicio">
                <div class="row g-3">
                <div class="col">
                  <input type="number" class="form-control input1" placeholder="Repeticiones" required id="repeticiones">
                </div>
                <div class="col">
                  <input type="number" class="form-control input1" placeholder="Series" required id="series">
                </div>
              </div>
                
              <div class="d-grid gap-2 d-flex justify-content-center m-3">
              <button class="btn btn-select text-light" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onclick="recogerinfor(${element.idEjercicio})">Guardar</button>
            </div>
              `; 
            shouldkip = true;
            return;
            }
        })
}

function filtrarporEspalda(filtro){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Espalda';
    });
    if(espc[0] != ""){
  ejercicos.innerHTML = "";
  espc.forEach(res=>{
ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de espalda")
}
}

function listarAbdo(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Abdomen';
    });
    if(espc[0] != ""){
ejercicos.innerHTML = "";
  espc.forEach(res=>{
  ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Abdomen")
  }
  }
  
  
  
  function listarPierna(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Pierna';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Pierna")
  }
  }
  
  function listarPecho(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo ==  'Pecho';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Pecho")
  }
  }
  
  function listarHom(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Hombro';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Hombros")
  }
  }
  
  
  function listaGluteos(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Gluteos';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Gluteos")
  }
  }
  
  function listaTricep(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == ' Tricep';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Tricep")
  }
  }
  
  function listaBiceps(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Bicep';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de Bicep")
  }
  }
  
  function listaAnte(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'AnteBrazo';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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
  alert("No hay ejercicios de AnteBrazo")
  }
  }
  
  function listaCardio(){
    let espc = listaEjercicios.filter(res=>{
      return res.NombreMusculo == 'Cardio';
    });
    if(espc[0] != ""){
      ejercicos.innerHTML = "";
  espc.forEach(res=>{
    ejercicos.innerHTML +=`
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

  function ListarTodos2(){
    cargarLosEjercicios();
  }
let i;

  function recogerinfor(id){
    let existe
    let nom =document.getElementById("nombre").textContent;
    let ide = document.getElementById("idEjercicio").value;
    let rep= document.getElementById("repeticiones").value;
    let ser =  document.getElementById("series").value;
    let detelles ={
      nombre: nom,
        idEjercicio: ide,
        Repeticiones: rep,
        Series: ser
    }
    if(ejerciciosrutina.length == 0){
    ejerciciosrutina.push(detelles);
  
    ejerciciosderutina.innerHTML +=`
    <tr>
    <td style="visibility: collapse;">${detelles.idEjercicio}</td>
     <td >${detelles.nombre}</td>
      <td >${detelles.Repeticiones}</td>
      <td >${detelles.Series}</td>
      <td id="modi"><button class=" btn btn-danger" onclick="modificar(${detelles.idEjercicio},${detelles.Repeticiones},${detelles.Series})" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"> <i class="fa-solid fa-broom" style="color: white;"></i></button></td> 
      <td id="elim"> <button class=" btn btn-danger" onclick="eliminar(this,${detelles.idEjercicio})"><i class="fa-solid fa-xmark" style="color: white;"></i></button></td> 
      </tr>
    `;  
    }else{
     existe = ejerciciosrutina.filter(res=>{
      return res.idEjercicio == id;
    })
    if(existe.length !=1){     
      ejerciciosderutina.innerHTML +=`
      <tr>
      <td style="visibility: collapse;">${detelles.idEjercicio}</td>
       <td >${detelles.nombre}</td>
        <td >${detelles.Repeticiones}</td>
        <td >${detelles.Series}</td>
        <td id="modi"><button class=" btn btn-danger" onclick="modificar(${detelles.idEjercicio},${detelles.Repeticiones},${detelles.Series})" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"> <i class="fa-solid fa-broom" style="color: white;"></i></button></td> 
        <td id="elim"> <button class=" btn btn-danger" onclick="eliminar(this,${detelles.idEjercicio})"><i class="fa-solid fa-xmark" style="color: white;"></i></button></td> 
        </tr>
      `; 
      ejerciciosrutina.push(detelles); 
    }else{
      ejerciciosrutina.filter(res=>{
        if(res.idEjercicio == id){
          res.Repeticiones = rep;
          res.Series = ser;
        }
      })
     
      ejerciciosderutina.innerHTML ="";
      ejerciciosrutina.forEach(element=>{
        ejerciciosderutina.innerHTML +=`
        <tr>
        <td style="visibility: collapse;">${element.idEjercicio}</td>
         <td >${element.nombre}</td>
          <td >${element.Repeticiones}</td>
          <td >${element.Series}</td>
          <td id="modi"><button class=" btn btn-danger" onclick="modificar(${element.idEjercicio},${element.Repeticiones},${element.Series})" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"> <i class="fa-solid fa-broom" style="color: white;"></i></button></td> 
          <td id="elim"> <button class=" btn btn-danger" onclick="eliminar(this,${element.idEjercicio})"><i class="fa-solid fa-xmark" style="color: white;"></i></button></td> 
          </tr>
        `; 
      })
    }
  }
  }

function crearRutina(){
 let nom= document.getElementById("nombreRutina").value;
  let descri =document.getElementById("descripcion").value;
  if(ejerciciosrutina.length>0 && nom != "" && descri != " "){
  let rutina={
      nombreRutina: nom,
      descripcion: descri,
      IdUsuario : user[0].IdUsuario
  }
   
    ipcRenderer.invoke('AgregarRutina',ejerciciosrutina,rutina);
}else{
  console.log("como asi");

}
}

function eliminar(r,id){
  var i = r.parentNode.parentNode.rowIndex;
  
  try {
  document.getElementById('myTable').deleteRow(i);
  console.log(ejerciciosrutina);
  ejerciciosrutina = ejerciciosrutina.filter((item)=>item.idEjercicio != id);
  console.log(ejerciciosrutina);
  } catch (error) {
    alert("error" + console.log(error));
  }
}

function modificar(id,rep,ser){
          let nombre = listaEjercicios.filter((item)=> item.idEjercicio == id);
          DetallesEjerRutina.innerHTML = `
          <p class="m-2" id="nombre">${nombre[0].NombreEjercicio}</p>
          <input hidden value="${id}" type="text" id="idEjercicio">
          <div class="row g-3">
          <div class="col">
            <input type="number" class="form-control input1" placeholder="Repeticiones" required id="repeticiones"  value="${rep}">
          </div>
          <div class="col">
            <input type="number" class="form-control input1" placeholder="Series" required id="series" value="${ser}">
          </div>
        </div>
        <div class="d-grid gap-2 d-flex justify-content-center m-3">
        <button class="btn btn-select text-light" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onclick="recogerinfor(${id})">Guardar</button>
      </div>
        `; 
}

ipcRenderer.on('RutinaAgregada',()=>{
  window.location.href = "./Rutinas.html";
})