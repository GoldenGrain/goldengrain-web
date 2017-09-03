import BaseApi from "./BaseApi";
 
export class LaudoApi extends BaseApi {

    constructor() {
        super('laudo');
    }    
}

export default new LaudoApi();