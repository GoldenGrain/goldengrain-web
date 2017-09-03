import BaseApi from "./BaseApi";
 
export class DentistaApi extends BaseApi {

    constructor() {
        super('dentista');
    }    
}

export default new DentistaApi();