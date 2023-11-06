import { ui } from "../funciones.js";

export let DBCitas;

export function crearDB() {
    
    // Crear base de datos en version 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    // Si hay un error
    crearDB.onerror = function () {
        console.log('Error en la creacion de DB(citas)');

    }

    // Si todo sale bien
    crearDB.onsuccess = function () {
        console.log('Creacion de DB(citas) exitosa');

        DBCitas = crearDB.result; // ASignar el resultado de la creacion a la variable dbCitas

        // Mostrar citas al cargar pero indexDB ya esta listo
        ui.imprimirCitas();
    }

    // Definir esquema - Configurar la basde de datos

    crearDB.onupgradeneeded = function (e) {
        
        const db = e.target.result; // Instnacia de la base de datos
        
        // Definir el objetStore
        const objetcStore = db.createObjectStore('citas', {
                    keyPath: 'id', // indice de la tabla - Primary Key
                    autoIncrement: true
                });
        
        // Definir columnas
        objetcStore.createIndex('mascota', 'mascota', {unique: false});
        objetcStore.createIndex('propietario', 'propietario', {unique: false});
        objetcStore.createIndex('telefono', 'telefono', {unique: false});
        objetcStore.createIndex('fecha', 'fecha', {unique: false});
        objetcStore.createIndex('hora', 'hora', {unique: false});
        objetcStore.createIndex('sintomas', 'sintomas', {unique: false});
        objetcStore.createIndex('id', 'id', {unique: true});

        console.log('Database creada y lista');
    }
}

