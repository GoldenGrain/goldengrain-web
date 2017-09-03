import BaseApi from "./BaseApi";
 
export class ServicoApi extends BaseApi {

    constructor() {
        super('servico');
    }    
}

export default new ServicoApi();