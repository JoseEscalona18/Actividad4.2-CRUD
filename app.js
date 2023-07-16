let indexEditar = -1;

// DATOS QUE VIENEN DE LOS INPUT TEXT
class Contacto {
    constructor(nombre, apellido, telefono) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.telefono = telefono;
    }
}


// FUNCION PARA AGREGAR CONTACTO
function agregarContacto(contacto) {

  const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
  contactos.push(contacto);
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

// CUANDO SE LE DA CLICK AL BOTON DE AGREGAR
document.getElementById("agregar").addEventListener("click", () => {

  const contactos = JSON.parse(localStorage.getItem("contactos"))
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;

  var numeroRegistrado = contactos.find(function(contacto) {
    return contacto.telefono === telefono;
  });

  if (numeroRegistrado) {
    const mensajeEmergente = document.getElementById('mensajeEmergente')
    mensajeEmergente.style.display = 'block';
    mensajeEmergente.innerHTML = `
    <div class='contenedorEmergente'>
      <div class='textoEmergente'> 
        <h2>Número de Teléfono ya registrado</h2>
        <img src="./images/x.png">
      </div>
    `

    setTimeout(() => {
      mensajeEmergente.style.display = 'none';
    }, 2000);
    return;
  }

  if (nombre && apellido && numeroRegistrado === undefined){
    
    const contacto = new Contacto(nombre, apellido, telefono);
    agregarContacto(contacto);
    limpiarFormulario()
    mostrarContactos();
  }

  // CUANDO NO HAY NADA EN EL INPUT TEXT DEL NOMBRE
  if(!nombre){
      document.getElementById("nombre").classList.remove("#input")
      document.getElementById("nombre").classList.add("faltanDatos")
      document.querySelector('#nombre').placeholder = ('Ingresa el nombre')
      setTimeout(() => {
        document.getElementById("nombre").classList.remove("faltanDatos")
        document.getElementById("nombre").classList.add("#input")
        document.querySelector('#nombre').placeholder = ('Nombre')
      }, 2000);
  }

    // CUANDO NO HAY NADA EN EL INPUT TEXT DEL APELLIDO
  if(!apellido){
      document.getElementById("apellido").classList.remove("#input")
      document.getElementById("apellido").classList.add("faltanDatos")
      document.querySelector('#apellido').placeholder = ('Ingresa el apellido')
      setTimeout(() => {
        document.getElementById("apellido").classList.remove("faltanDatos")
        document.getElementById("apellido").classList.add("#input")
        document.querySelector('#apellido').placeholder = ('Apellido')
      }, 2000);
  }

    // CUANDO NO HAY NADA EN EL INPUT TEXT DEL TELEFONO
  if(!telefono){
      document.getElementById("telefono").classList.remove("#input")
      document.getElementById("telefono").classList.add("faltanDatos")
      document.querySelector('#telefono').placeholder = ('Ingresa el número de teléfono')
      setTimeout(() => {
        document.getElementById("telefono").classList.remove("faltanDatos")
        document.getElementById("telefono").classList.add("#input")
        document.querySelector('#telefono').placeholder = ('Teléfono')
      }, 2000);
  }

});


// FUNCION QUE MUESTRA LOS CONTACTOS GUARDADOS EN EL LOCALSTORAGE
function mostrarContactos() {
    
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    let tablaBody = document.getElementById("Datos");
    tablaBody.innerHTML = "";
  
    // INGRESA LOS ELEMENTOS A LA FILA DE LA TABLA

    for (let i = 0; i < contactos.length; i++) {
        let contacto = contactos[i];
        let fila = document.createElement("tr");
    
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = contacto.nombre;
        fila.appendChild(celdaNombre);
    
        let celdaApellido = document.createElement("td");
        celdaApellido.textContent = contacto.apellido;
        fila.appendChild(celdaApellido);
    
        let celdaTelefono = document.createElement("td");
        celdaTelefono.textContent = contacto.telefono;
        fila.appendChild(celdaTelefono);
    
        let celdaAcciones = document.createElement("td");

        // GENERA EL BOTON DE EDITAR
        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList.add("botonEditar");
        botonEditar.addEventListener("click", () => {
          editarContacto(i);
        });
        celdaAcciones.appendChild(botonEditar);
    
        // GENERA EL BOTON DE ELIMINAR
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("botonEliminar");
        botonEliminar.addEventListener("click", () => {
          eliminarContacto(i);
        });
        celdaAcciones.appendChild(botonEliminar);
    
        fila.appendChild(celdaAcciones);
    
        tablaBody.appendChild(fila);
    }

}

// FUNCION PARA EDITAR CONTACTO SELECCIONADO
function editarContacto(index) {
  const contactos = JSON.parse(localStorage.getItem("contactos"));
  const contacto = contactos[index];

  document.getElementById("nombre").value = contacto.nombre;
  document.getElementById("apellido").value = contacto.apellido;  
  document.getElementById("telefono").value = contacto.telefono;

  document.getElementById("editar").style.display = "inline-block";
  document.getElementById("cancelar").style.display = "inline-block";
  document.getElementById("agregar").style.display = "none";

  indexEditar = index;
}

// CUANDO SE PRESIONA EL BOTON DE EDITAR
document.getElementById("editar").addEventListener("click", () => {
  const contactos = JSON.parse(localStorage.getItem("contactos"));
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;

  var numeroRegistrado = contactos.find(function(contacto) {
    return contacto.telefono === telefono;
  });

  if (numeroRegistrado) {
    const mensajeEmergente = document.getElementById('mensajeEmergente')
    mensajeEmergente.style.display = 'block';
    mensajeEmergente.innerHTML = `
    <div class='contenedorEmergente'>
      <div class='textoEmergente'> 
        <h2>Número de Teléfono ya registrado</h2>
        <img src="./images/x.png">
      </div>
    `

    setTimeout(() => {
      mensajeEmergente.style.display = 'none';
    }, 2000);
    return;
  }


  const contacto = new Contacto(nombre, apellido, telefono);
  contactos[indexEditar] = contacto;
  localStorage.setItem("contactos", JSON.stringify(contactos));
  limpiarFormulario();
  mostrarContactos();

  document.getElementById("editar").style.display = "none";
  document.getElementById("cancelar").style.display = "none";
  document.getElementById("agregar").style.display = "inline-block";

  indexEditar = -1;
});


// FUCION PARA LIMPIAR EL CONTENIDO DE LOS INPUT TEXT 
function limpiarFormulario() {

  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("telefono").value = "";
}


// CUANDO SE PRESIONA LE BOTON DE CANCELAR, EL QUE SE GENERA AL EDITAR
document.getElementById("cancelar").addEventListener("click", () => {
  limpiarFormulario();

  document.getElementById("editar").style.display = "none";
  document.getElementById("cancelar").style.display = "none";
  document.getElementById("agregar").style.display = "inline-block";

  indexEditar = -1;
});

//FUNCION PARA ELIMINAR CONTACTO
function eliminarContacto(index) {
  const contactos = JSON.parse(localStorage.getItem("contactos"));
  contactos.splice(index, 1);
  localStorage.setItem("contactos", JSON.stringify(contactos));
  mostrarContactos();
}


mostrarContactos()