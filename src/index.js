const { app, BrowserWindow, Notification, ipcMain, autoUpdater } = require('electron');
const url = require('url');
const path = require('path');
let db = require('./database');
const { main, computeStyles } = require('@popperjs/core');
const { getCharsetNumber } = require('mysql/lib/ConnectionConfig');
const { lutimesSync } = require('fs');
const { userInfo } = require('os');
const { connect } = require('./database');


let loginwindow;
let mainWindow;
let modalWindow;
let userlogin;
let list;
let listEjercicios;


app.on('ready', () => {
    openLogin();
});


function createloginWindow(){
    loginwindow = new BrowserWindow({
      width: 800,
      height: 600,
      title: "Gym Routine",
      icon: path.join(__dirname,'./views/Utilidades/Logo.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
    });
    loginwindow.setMenu(null);
  
    loginwindow.loadURL(url.format({
      pathname: path.join(__dirname, './views/login.html'),
      protocol: 'file',
      slashes: true,
    }));
    loginwindow.on('closed', () => {
      loginwindow = null;
    });
  }


  function createHomeWindow(){
    mainWindow = new BrowserWindow({
      width: 1100,
      height: 600,
      title: "Gym Routine",
      icon: path.join(__dirname,'./views/Utilidades/Logo.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
    });
    mainWindow.setMenu(null);
  
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/index.html'),
      protocol: 'file',
      slashes: true,
    }));
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }




  function createModal(){
    modalWindow = new BrowserWindow({
      width: 600,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
    });
    modalWindow.setMenu(null);
  
    modalWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/model.html'),
      protocol: 'file',
      slashes: true,
    }));
    modalWindow.on('closed', () => {
      modalWindow = null;
    });
  }


function openLogin(){
  createloginWindow();
}
function openHome(){
  createHomeWindow();
}

function openModal(){
 createModal();
}

ipcMain.handle('login',(e,user)=>{
    ValidarLogin(user);

});
ipcMain.handle('registrar',(e,user)=>{
  registrarUser(user);

});
ipcMain.handle('getuser',(e,mesaje)=>{
  getUser();
});

ipcMain.handle('creaModal',()=>{
    openModal();
});

ipcMain.handle('formMoCli',()=>{
getRespuesta();
});

ipcMain.handle('modifiUser',(e,user)=>{
    updateUser(user);
});
ipcMain.handle('cargaejercicios',()=>{
      getEjercicios();
});
ipcMain.handle('getRutinas',()=>{
    getRutinas();
})

ipcMain.handle('detallesRutina',(e,id)=>{
    getDetallesRutina(id);
});
ipcMain.handle('Enviar',()=>{
      EnviarInformacion();
});
ipcMain.handle('AgregarRutina',(e,listaEjer,DetalleRutina)=>{

       RegistrarRutina(listaEjer,DetalleRutina);
});
ipcMain.handle('cerrarsesion',()=>{
    cerrasesion();
});

ipcMain.handle('getRetos',()=>{
    getRetos();

});

function ValidarLogin( user){
const sql = "SELECT*FROM usuarios WHERE Correo = ? AND Contraseña=?";
db.query(sql,[user.correo,user.pass],(error, results ,fields)=>{
  if(error){console.log(error);}
  if(results.length > 0){
    loginwindow.close();
    openHome();
    list = results;
  } else{
    new Notification({
      title: "Login",
      body: "Email o Contraseña equivocado"
    }).show()
  }
  
});

};

function registrarUser(user){
  const sql = "INSERT INTO usuarios  SET ?"
  db.query(sql, user, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
    else{
      loginwindow.webContents.send('respuesta', "Si jalo");
    }
 });
}


function getUser(){
  console.log("Aqui mas");
  list.forEach(element => {
      userlogin = {
        IdUsuario: element.IdUsuario,
        Nombre: element.Nombre,
        Correo: element.Correo,
        Edad: element.Edad,
        Altura: element.Altura,
        Peso: element.Peso,
        IMC: element.IMC
      }
  });
  
    mainWindow.webContents.send('Clientes',userlogin);
};


function getRespuesta(){

list.forEach(element => {
      userlogin = {
        IdUsuario: element.IdUsuario,
        Nombre: element.Nombre,
        Correo: element.Correo,
        Edad: element.Edad,
        Altura: element.Altura,
        Peso: element.Peso,
        IMC: element.IMC
      }
  });

  modalWindow.webContents.send("Respu",userlogin);
}

function updateUser(user){
  const sql = "UPDATE usuarios SET Nombre = ?, Edad = ?, Altura= ?, Peso= ?, IMC= ? WHERE IdUsuario =?";
  db.query(sql, [user.Nombre,user.Edad,user.Altura ,user.Peso,user.IMC,user.id], (error, results, fields) => {
    if(error) {
       console.log(error);
    }else{
      mainWindow.webContents.send('Clientes',user);
      modalWindow.close();
    }
  });
}

function getEjercicios(){
  const sql = "select *from ejercicios";

  db.query(sql,(error,results,fields)=>{
      if(error){
        console.log(error);
      }else{
      mainWindow.webContents.send('ejercicios',results);
      }
  })

}


function getRutinas(){
  const sql = "SELECT*From rutina ";
  db.query(sql,(error,result,fields)=>{
    if(error){
      console.log(error);
    }
    else{
      mainWindow.webContents.send('getRutinas',result,list);
    }

  })
}

function getDetallesRutina(id){
  sql = "SELECT e.idEjercicio,e.NombreEjercicio,e.informacion,e.NombreMusculo, e.imagen,e.descripcion,e.urlVideo,e.imagendeMusculo, dt.Repeticiones, dt.Series, dt.idRutina FROM detallerutina dt \n"
  sql += " INNER JOIN ejercicios e ON e.idEjercicio = dt.IdEjercicio \n"
  sql += "  WHERE dt.idRutina = ?"
  db.query(sql,[id],(error,result,fields)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(result);
      mainWindow.webContents.send('getDetalles',result);
    }


  });
}

function EnviarInformacion(){
  const sql = "select *from ejercicios";
  db.query(sql,(error,results,fields)=>{
      if(error){
        console.log(error);
      }else{
      mainWindow.webContents.send('listEjercicios',results,list);
      }
  })
   
}

function RegistrarRutina(list,detallesRu){
  const sql = "INSERT INTO rutina  SET ?";
  db.query(sql,detallesRu,(error,result,fields)=>{
      if(error){
        console.log(error);
      }
      else{
        registrardetallesrutina(list,detallesRu);
      }
  })
}
function registrardetallesrutina(list,detalleEjer){
    const sql = "SELECT*from rutina where nombreRutina=? and IdUsuario=?";
    try {
    db.query(sql,[detalleEjer.nombreRutina,detalleEjer.IdUsuario],(error,result,field)=>{
      
        let ejerciciosderutina=[];
        list.forEach(element=>{
            const ejer ={
              idRutina: result[0].idRutina,
              IdEjercicio: parseInt(element.idEjercicio),
              Repeticiones: parseInt(element.Repeticiones),
              Series: parseInt(element.Series)
            }
            ejerciciosderutina.push(ejer);
        })
      
        const que="INSERT INTO detallerutina set ?";
        ejerciciosderutina.forEach(element=>{
            db.query(que,element,(error,result,fields)=>{
                mainWindow.webContents.send('RutinaAgregada');
            })
        })
    })
  }catch (error) {
      alert(error);
  }
}


function cerrasesion(){
  userlogin = "";
  let i = list.length;
  list.splice(0,i);
  mainWindow.close();
  openLogin();

}

function getRetos(){
try {
  sql="select*from retos";
    db.query(sql,(error,results,fields)=>{
      if(error){
        console.log(error);
      }else{
        console.log(results);
      mainWindow.webContents.send('getReto',results);
      }
    });

} catch (error) {
  console.log(error);
}
}



