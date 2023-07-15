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
  });

mostrarContactos()