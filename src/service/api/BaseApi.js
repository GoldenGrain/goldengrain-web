import Http from "../shared/http";

export default class BaseApi {

    constructor(entity) {
        this.http = new Http();
        this.entity = entity;
    }

    post(url, _entity) {
        return this.http.post("/api/" + url, _entity);
    }

    save(entity) {
        return this.http.post("/api/" + this.entity, entity);
    }
    

    getAll(params = {}) {
        return this.http.get("/api/" + this.entity, params);
    }

    get(url, params = {}) {

        let id = "";

        if (!!Number(url)) {
            id = url;
        }

        let complemento = id ? this.entity : url;

        return this.http.get(`/api/${complemento}/${id}`, params)
    }
}