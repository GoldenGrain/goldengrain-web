import BaseApi from "./BaseApi";
 
export class ServicoDentarioApi extends BaseApi {

    constructor() {
        super('servico-dentario');
    }    
}

export default new ServicoDentarioApi();