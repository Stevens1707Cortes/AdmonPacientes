import { datosCita, nuevaCita } from "../funciones.js";

import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formularioNuevaCita
} from "../selectores.js";

import { crearDB } from "../db/db.js";

class App {
    constructor(){
        this.initApp();
    }

    initApp(){

        // Crear base de datos
        crearDB();
        
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
}

export default App;