class Contacto {
    constructor(nombre, apellido, telefono) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.telefono = telefono;
    }
}

function agregarContacto(contacto) {

    const contactos = JSON.parse(localStorage.getItem("contactos"));
    contactos.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));

}

function mostrarContactos() {
    
    const contactos = JSON.parse(localStorage.getItem("contactos"));
    let tablaBody = document.getElementById("Datos");
    tablaBody.innerHTML = "";
  
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
    
        fila.appendChild(celdaAcciones);
    
        tablaBody.appendChild(fila);
    }

}

function limpiarFormulario() {

    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";

  }

document.getElementById("agregar").addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    if (nombre && apellido && telefono){
    const contacto = new Contacto(nombre, apellido, telefono);
    agregarContacto(contacto);
    limpiarFormulario()
    mostrarContactos();
    }

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

mostrarContactos()