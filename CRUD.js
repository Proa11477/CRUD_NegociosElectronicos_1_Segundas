var carro = [];
var editarIndex = -1;  
var precio = 0;
function ConciertoVl(num) {
    var Concierto = document.getElementById('concierto');
    Concierto.value = num;
}

function agregar() {
    var fecha = document.getElementById('fecha').value;
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var cantidad = document.getElementById('cantidad').value;
    var selConcierto = document.getElementById('concierto').value;
    var conciertoNombre = document.getElementById('concierto').options[document.getElementById('concierto').selectedIndex].text;

    var orden = {
        fecha: fecha,
        nombre: nombre,
        email: email,
        cantidad: cantidad,
        concierto: conciertoNombre,
        conPrecio: selConcierto
    };

    if (editarIndex === -1) {
        // Agregar nuevo
        carro.push(orden);
        mostrarMensajeAgregado();
        
    } else {
        // Editar existente
        carro[editarIndex] = orden;
        editarIndex = -1;  
        document.getElementById('comprar').innerText = 'Comprar'; 
        mostrarMensajeActualizado()
    }

    mostrar();
    limpiarFormulario();
}

function mostrar() {
    var contenidoTabla = document.getElementById('contenidoTabla');
    contenidoTabla.innerHTML = '';

    for (var i = 0; i < carro.length; i++) {
        
        if (carro[i].conPrecio == 1){
            precio = 'MX $3,490,00';
        }
        if (carro[i].conPrecio == 2){
            precio = 'MX $2,780.00';
        }
        if (carro[i].conPrecio == 3){
            precio = 'MX $1,420.00';
        }
        var fila = '<tr>' +
            '<td>' + carro[i].nombre + '</td>' +
            '<td>' + carro[i].email + '</td>' +
            '<td>' + carro[i].concierto + '<br>-<br>'+precio+'</td>' +
            '<td>' + carro[i].fecha + '</td>' +
            '<td>' + carro[i].cantidad + '</td>' +
            '<td><img src="editar.png" onclick="editar(' + i + ')"></img><img src="Borrar.png" onclick="eliminar(' + i + ')"></td>' +
            '</tr>';
        contenidoTabla.innerHTML += fila;
    }
}

function eliminar(index) {
    var confirmacion = confirm('Esta seguro de que quiere eliminar?')
    if(confirmacion){
        carro.splice(index, 1);
    mostrar();
    setTimeout(mostrarMensajeEliminado, 100);


    }
    
}

function editar(index) {
    var orden = carro[index];
    document.getElementById('fecha').value = orden.fecha;
    document.getElementById('nombre').value = orden.nombre;
    document.getElementById('email').value = orden.email;
    document.getElementById('cantidad').value = orden.cantidad;
    
    // Establecer el valor del campo "Concierto" 
    //según el nombre del concierto en el registro seleccionado
    var conciertoSelect = document.getElementById('concierto');
    for (var i = 0; i < conciertoSelect.options.length; i++) {
        if (conciertoSelect.options[i].text === orden.concierto) {
            conciertoSelect.selectedIndex = i;
            break;
        }
    }

    editarIndex = index;
    document.getElementById('comprar').innerText = 'Actualizar';
}


function limpiarFormulario() {
    document.getElementById('fecha').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cantidad').value = 1;
    document.getElementById('concierto').value = 1;
}

document.getElementById('comprar').addEventListener('click', agregar);



function mostrarMensajeAgregado() {
    var mensajeAgregado = document.getElementById("mensaje");
    mensajeAgregado.style.backgroundColor = 'Green';
    mensajeAgregado.innerText = "Agregado";
    setTimeout(function() {
        mensajeAgregado.innerText = ""; 
    }, 1500);
}

function mostrarMensajeActualizado() {
    var mensajeActualizado = document.getElementById("mensaje");
    mensajeActualizado.innerText = "Actualizado";
    mensajeActualizado.style.backgroundColor = 'orange';
    setTimeout(function() {
        mensajeActualizado.innerText = ""; 
    }, 1500);
}
function mostrarMensajeEliminado() {
    var mensajeEliminado = document.getElementById("mensaje");
    mensajeEliminado.innerText = "Eliminado";
    mensajeEliminado.style.backgroundColor = 'red';
    setTimeout(function() {
        mensajeEliminado.innerText = ""; 
    }, 1500);
}