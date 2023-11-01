
// Variables - Canpos de formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Variable - UI

const formularioNuevaCita = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// "Modo edicion"

let editando;

// Clases

class Citas{
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id ); // Nos entrega las diferentes al parametro que estamos pasando
    }

    actualizarCita(citaActualizada){
        //                                                                  IF               ELSE
        this.citas = this.citas.map((cita)=> cita.id === citaActualizada.id ? citaActualizada : cita);

        // Forma larga
        // this.citas = this.citas.map((cita) => {
        //     if (cita.id === citaActualizada.id) {
        //         return cita = citaActualizada;
        //     }else{
        //         return cita;
        //     }
        // });
    }
}


class UI{
    imprimirAlerta(mensaje, tipo){

        this.limpiarAlerta();

        // crear HTML
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'col-12', 'd-block');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success')
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar HTML
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitarlo
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    // Tambien se puede hacer destructuring desde los parametros para acceder a una variable o variables, en este caso, al arreglo citas del objeto que pasamos como parametro
    imprimirCitas({citas}){
        
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;
            
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //Boton borrar cita

            const btnBorrarCita = document.createElement('button');
            btnBorrarCita.classList.add('btn','btn-danger','borrar-cita');
            btnBorrarCita.innerHTML = `Borrar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`;

            btnBorrarCita.onclick = () => {
                eliminarCita(id);
            }
            
            // Boton editar cita
            const btnEditarCita = document.createElement('button');
            btnEditarCita.classList.add('btn','btn-info','editar-cita', 'ml-2');
            btnEditarCita.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>`;

            btnEditarCita.onclick = () => {
                cargarEdicion(cita);
            }

            // Agregar parrafos a divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnBorrarCita);
            divCita.appendChild(btnEditarCita);

            // Agregar al HTML
            contenedorCitas.appendChild(divCita);

        });
    }


    limpiarAlerta(){
        const alertaMensaje =  document.querySelector('#contenido .alert');
        if (alertaMensaje) {
            alertaMensaje.remove();
        }
    }

    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.firstChild.remove();
        }
    }


}

// Instanciar 

const ui = new UI();
const administrarCitas = new Citas();


// EventListeners

cargarEventListeners();
function cargarEventListeners() {
    // Al cargar el documento
    
    // Para los inputs
    mascotaInput.addEventListener('change', datosCita);

    propietarioInput.addEventListener('change', datosCita);

    telefonoInput.addEventListener('change', datosCita);

    fechaInput.addEventListener('change', datosCita);

    horaInput.addEventListener('change', datosCita);

    sintomasInput.addEventListener('change', datosCita);

    // Para el formulario

    formularioNuevaCita.addEventListener('submit', nuevaCita);

}

// Objeto con la informacion de la cita

const citaObj = {
    mascota: '',
    propietario: '',
    telefono:'',
    fecha: '',
    hora: '',
    sintomas: ''
}


// Funciones

// Agregar los objetos de cita

function datosCita(e) {

    if (e.target.value === '') {
        console.log(`El campo ${e.target.name} esta vacio`);
    }

    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion del ObjCita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Error en la validacion. Todos los campos deben estar llenos', 'error');

        return;
    }

    // Modo nueva cita o modo edicion
    
    if (editando) {
        console.log('Modo edicion');

        // Pasar el objeto de la cita a edicion
        administrarCitas.actualizarCita({...citaObj});

        // Imprimir mensaje exitoso
        ui.imprimirAlerta('Cita editada exitosamente', 'correcto');

        // Cambiar texto de boton a estado ORIGINAL
        formularioNuevaCita.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar Modo edicion
        editando = false;

    }else{
        console.log('Modo nueva Cita');

        // Generar un id unico para cada cita

        citaObj.id = Date.now();

        // Agregar nueva cita al arreglo de citas
        administrarCitas.agregarCita({...citaObj}); // Pasamos una copia del objeto global, para que no se reescriban los nuevos objetos

        // Imprimir mensaje exitoso
        ui.imprimirAlerta('Cita agregada exitosamente', 'correcto');
    }

    // Imprimir nueva cita

    ui.imprimirCitas(administrarCitas);

    // Reiniciar el formulario

    formularioNuevaCita.reset();

    // Reiniciar el objeto para la validacion
    reiniciarObjeto();
}

// Reiniciar objeto global para la validacion
function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

// Eliminar citas

function eliminarCita(id) {
    // Eliminar cita del arreglo de citas
    administrarCitas.eliminarCita(id);

    // Muestra un mensaje
    ui.imprimirAlerta('La cita se elimino exitosamente', 'correcto');

    // Eliminar del HTML
    ui.imprimirCitas(administrarCitas);
}

// Editar formulario

function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar texto de boton
    formularioNuevaCita.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    // Modo edicion
    editando = true;
}   
