import BaseApi from "./BaseApi";
 
export class PacienteApi extends BaseApi {

    constructor() {
        super('paciente');
    }    
}

export default new PacienteApi();