const { main } = require('@popperjs/core');
const {ipcRenderer} = require('electron');
const { DOUBLE } = require('mysql/lib/protocol/constants/types');

let mainmodal;
let resultado;
let calcular;
let modal2;
let cerrarsesion;


window.onload = function(){
mainmodal = document.getElementById("mainmodal");
resultado = document.getElementById("resultado");
calcular = document.getElementById("calcular");
modal2 = document.getElementById("mainmodal2");
cerrarsesion = document.getElementById("cerrarSesion");
cerrarsesion.onclick = cerrarSesion;
}



function CalcularIMC(){
    mainmodal.innerHTML ="";
    mainmodal.innerHTML = `

    <div class="container">

    
    <p class="m-2 text-light">El índice de masa corporal (IMC) es un número que se calcula con base en el peso y la estatura de la persona. 
        Para la mayoría de las personas,el IMC es un indicador confiable de la gordura y se usa para identificar 
        las categorías de peso que pueden llevar a problemas de salud.</p>
      
        <p class="m-3 text-light">CM,KG</p>
        
       
        <div class="d-grid gap-2 d-flex justify-content-center">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label text-light ">Altura</label>
          <input type="text" class="form-control input1" id="altura" style="width: 150px;" >
        </div>
        <div class="mb-3">
          <label for="" class="form-label text-light">Peso</label>
          <input type="text" class="form-control input1" id="peso" style="width: 150px;">
        </div>
      </div>
        
      </div>
      `;
        let altura;
        let peso;
        let aux;
      
    calcular.onclick = function(){
        resultado.innerHTML ="";
        altura = document.getElementById("altura").value;
        peso = document.getElementById("peso").value;
        if(!parseFloat(altura) ){
                alert("Ingresa de forma correcta el peso en centimetros");
        }
        else if(!parseFloat(peso)){
            alert("Ingresa de forma correcta el peso en kilogramos");
        }
        else{
            aux= peso/(altura*altura);
         let aux2 = Number.parseFloat(aux).toFixed(2)
            resultado.innerHTML = `Tu masa corporal es: ${aux2}`
        }
    }
}


function CalculaKalorias(){
    mainmodal.innerHTML="";
    mainmodal.innerHTML = `

    <div class="container">

    
    <p class="m-2 text-light">con esta calculadora podras calcular las calorias necesarias a consumir 
    para tu dia a dia y estar sano o poder bajar de peso segun tu proposito.</p>
      
        <p class="m-3 text-light">CM,KG</p>
        
       
        <div class="d-grid gap-2 d-flex justify-content-center">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label text-light ">Peso</label>
          <input type="text" class="form-control input1" id="peso" style="width: 150px;" >
        </div>
        <div class="mb-3">
          <label for="" class="form-label text-light">Altura</label>
          <input type="text" class="form-control input1" id="altura" style="width: 150px;">
        </div>
        <div class="mb-3">
          <label for="" class="form-label text-light">Edad</label>
          <input type="text" class="form-control input1" id="edad" style="width: 150px;">
        </div>
      </div>
</div>

        
      </div>
      `;
        let altura;
        let peso;
        let edad;
        let aux;
        let btn;
      
    calcular.onclick = function(){
       
        resultado.innerHTML ="";
        altura = document.getElementById("altura").value;
        peso = document.getElementById("peso").value;
        edad = document.getElementById("edad").value;

        if(!parseFloat(altura) ){
                alert("Ingresa de forma correcta el peso en centimetros");
        }
        else if(!parseFloat(peso)){
            alert("Ingresa de forma correcta el peso en kilogramos");
        }
        else if(!parseInt(edad)){
            alert("Ingresa de forma correcta la edad");
        }
        else{
         aux =   (10*peso) + (6.25*(altura))- (5*edad)+5;
         console.log(aux);
            resultado.innerHTML = `Calorias recomendas de cosumir (si no haces actividad fisica): ${aux}`;
        }
    }

}

function ejemploDietaV(){
  modal2.innerHTML="";
  modal2.innerHTML=`
  <div class="text-light">
    
  <p class="m-2"> <b class="text-center"> ¿Qué es una dieta para aumentar masa muscular? </b><br>
    Las dietas para ganar masa muscular son planificaciones de comidas ideadas específicamente para aumentar tu tamaño muscular 
    sin obtener grasa corporal.En ella  aumentaremos la ingesta calórica así como los hidratos de carbono.</p>

    <p class="m-2"> <b> Los objetivos que persiguen las dietas para ganar masa muscular </b></p>
    <ul class="m-2">
      <li>Aumento de peso corporal en personas delgadas.</li>
      <li>Fase de volumen muscular para entrenamiento de culturista.</li>
      <li>Aumento de fuerza muscular para maximizar el rendimiento de cualquier deporte.</li>
      <li>Desarrollo  muscular en personas muy activas.</li>
    </ul>
    <h5 class="m-2">Ejemplo de dieta para hacer masa muscular</h5>
    <p class="m-2">
      El siguiente ejemplo de dieta para ganar masa muscular son simples modelos que deben adaptarse a las cantidades exactas de la persona,
       teniendo en cuenta el peso exacto, así como a su edad, talla y actividad física.
    </p>

    <ul>
      <li><b>Desayuno</b>: 2 huevos enteros, 1 taza de claras de huevo, 1 taza de avena, 1 taza de arándanos, 2 cucharadas de sirope de arce</li>
      <li><b>Almuerzo </b>: 6 oz de pechuga de pollo, 1 taza de brócoli al vapor picado, 1 taza de arroz integral de grano largo</li>
      <li><b>Merienda </b>: 1 cucharada de proteína de suero, 1/3 taza de almendras crudas</li>
      <li><b> Cena </b> : bistec de 6 oz, 1 camote mediano, 1 tajada de mantequilla, 15 espárragos, 1 taza de zanahorias en rodajas,<br>
        2 cucharadas de aceite de oliva extra virgen</li>
    </ul>
</div>
`;
}

function ejemploDietaD(){
  modal2.innerHTML="";
  modal2.innerHTML=`
  <div class="text-light">
    
  <p class="m-2"> <b class="text-center"> ¿Qué es una dieta para definicion muscular? </b><br>
  Una dieta de definición muscular está basada en reducir el nivel de grasa corporal y acompañarlo de ejercicios para tonificar y definir el cuerpo.</p>

    <p class="m-2"> <b> Los objetivos que persiguen estas dietas de definición son:</b></p>
    <ul class="m-2">
      <li>Perder peso y reducir volumen corporal en personas que realizan ejercicio físico.</li>
      <li>Maximizar la definición muscular de practicantes de culturismo y fitness.</li>
      <li>Mantenimiento de la definición muscular de los que ya están en forma.</li>
      <li>Dieta de choque inicial para los que tienen un exceso de grasa corporal.</li>
    </ul>
    <h5 class="m-2">Ejemplo de dieta para definicion muscular</h5>
    <p class="m-2">
    El siguiente plan de alimentación es un  simple modelo, las cantidades exactas deben ajustarse al gasto calórico de la persona,
     pero pueden resultar muy útiles para que a partir de ellas, crees tu dieta ideal.
    </p>

    <ul>
      <li><b>Desayuno</b>: Infusión de cola de caballo y té verde,Tortilla de claras de huevo,Harina de Avena</li>
      <li><b>Almuerzo </b>: Ternera magra,Arroz integral o legumbres,Fruta</li>
      <li><b>Merienda </b>: Pechuga de pavo,Pan de cereales,Aceite de oliva</li>
      <li><b> Cena </b> : Ensalada de atún natural, aguacate y Tomate,Infusión de cola de caballo</li>
    </ul>
</div>
`;
}


function cerrarSesion(){
  ipcRenderer.invoke('cerrarsesion');
}








