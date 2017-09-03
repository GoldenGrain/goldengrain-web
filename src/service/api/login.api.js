import Http from "../shared/http";
import moment from "moment";


export class LoginApi {

    constructor(http) {
        this.http = http || new Http();
    }   

    logar(cpf, password) {
        
        var body = {};
        body["userName"] = cpf;
        body["grant_type"] = "password";
        body["password"] = password;
        body["client_id"] ="26401E3A-1434-4D78-900A-E36A4ADDCD8F";
        return this.http.postEncoded(`/token`, body, true);
    }

    userInfo(){
        return this.http.getJson('/userinfo');
    }

}




export default new LoginApi();