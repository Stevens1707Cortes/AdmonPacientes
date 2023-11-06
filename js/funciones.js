import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formularioNuevaCita
} from "./selectores.js";

import { DBCitas } from "./db/db.js";

// Instanciar 
export const ui = new UI();
const administrarCitas = new Citas();

// "Modo edicion"

let editando;

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

export function datosCita(e) {

    if (e.target.value === '') {
        console.log(`El campo ${e.target.name} esta vacio`);
    }

    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
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

         //Actualizar registro en IndexDB

         const transactionUpdate = DBCitas.transaction(['citas'], 'readwrite');

         const objectStore = transactionUpdate.objectStore('citas');
 
         objectStore.put(citaObj);
 
         transactionUpdate.oncomplete = function() {
             console.log('Cita actualizada');
         }

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
        administrarCitas.agregarCita({...citaObj}); 

        // Insertar Nueva cita en IndexedDB

        const transaction = DBCitas.transaction(['citas'], 'readwrite');

        // Habilitar el objectStore
        const objectStore = transaction.objectStore('citas');

        // Insertar registro en la base de datos
        objectStore.add(citaObj);

        transaction.oncomplete = function() {
                console.log('Cita agregada');
            }


        // Imprimir mensaje exitoso
        ui.imprimirAlerta('Cita agregada exitosamente', 'correcto');
    }

    // Imprimir nueva cita

    ui.imprimirCitas();

    // Reiniciar el formulario

    formularioNuevaCita.reset();

    // Reiniciar el objeto para la validacion
    reiniciarObjeto();
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

// Eliminar citas

export function eliminarCita(id) {

     // Eliminar cita de la base de datos

    const transactionDelete = DBCitas.transaction(['citas'], 'readwrite');
    const objectStore = transactionDelete.objectStore('citas');

    objectStore.delete(id);

    transactionDelete.oncomplete = function () {
        console.log(`Cita ${id} eliminada`);

         // Muestra un mensaje
        ui.imprimirAlerta('La cita se elimino exitosamente', 'correcto');
          // Eliminar del HTML
        ui.imprimirCitas();
    }

    transactionDelete.onerror = function () {
        console.log('Hubo un error');
    }

}

// Editar formulario

export function cargarEdicion(cita) {
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
