import BaseApi from "./BaseApi";
 
export class DenteApi extends BaseApi {

    constructor() {
        super('dente');
    }    
}

export default new DenteApi();