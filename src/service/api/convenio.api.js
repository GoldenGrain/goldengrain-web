import BaseApi from "./BaseApi";
 
export class ConvenioApi extends BaseApi {

    constructor() {
        super('convenio');
    }    
}

export default new ConvenioApi();