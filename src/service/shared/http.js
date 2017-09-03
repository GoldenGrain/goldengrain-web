
// const baseUrl = "http://192.168.10.178:8054";
//const baseUrl = "http://192.168.10.11:8016";
//window.BASE_URL_API = "http://controleaqui.com/teste/public";

const baseUrl = window.BASE_URL_API || "http://localhost:8000";
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdjNzBkZmM1N2FiNDQ4MTk3NzU2ZWNiZDAwMThiNjc5NDRmYzhjZjA5N2Y1OWY5MzY3NTk5OGI2NjQ2NWMwZDA5YmVmMTBmYjAxNzY1NDY1In0.eyJhdWQiOiI0IiwianRpIjoiN2M3MGRmYzU3YWI0NDgxOTc3NTZlY2JkMDAxOGI2Nzk0NGZjOGNmMDk3ZjU5ZjkzNjc1OTk4YjY2NDY1YzBkMDliZWYxMGZiMDE3NjU0NjUiLCJpYXQiOjE0OTYxNzc3ODksIm5iZiI6MTQ5NjE3Nzc4OSwiZXhwIjoxNTI3NzEzNzg5LCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.mygQr_QZkSN0S3IbgOtcezRe2EXIsUAJyaJCHXTYgOadP4AG8GFUzlTHiGFOxEIVD9FURB6ptTK7VBSFoRsKqeIdbCWEooU2yHH8lTX4dNuVfoEipaq-VU8JsiroLMmt2ru2WfIP87ydTszxF0C79N7Dxc98cAIg_XDAw2R2j6iD0gP-IV9H0xJ1AV5mb27AVTRvhXWBg_mxG1ECuPsTtPXiYM5B19gNTGF0ZzMI5UbQHohUDBjnD92Yxwf7NFwE7iwckPdCbrUMRl5IADnCOe6mUhSbtZlR4E1NTsGKh97RhPEe5ndgvANU8Z9KVaYwPcbxoxHvijXezQA4z0pn8tWwIlBJpvXobLLwV-78341a0GViKAWo-ps7RLnq3tAkqjDTXejPn0zJOZ24xU4YdLHQm2_FXhrLeYEP0fLmKvb1gJ94YhpLqSR_vyyZE5zgtg-sWz1Tzd3XmCA-k1k-rUwIpsYpjSDE4dun7Yr4rw9RWtfPp4u1HwovS6Jf-BwTXOsSAzd58o45WlO25LE7TTvMtVi-3P6idvQDfWc7NO0m7bRkzhpy34cypdieM7uUvcPlptbuEIPmVXfNLhhzIIoC6vG680OICa3HIj-jzJ1UkmcNUFloNCE3pd5MYXCOeHLDlMYDKXb09CZbpwAQMPkOyJKkoc4-snPzM1qSZpU";
token = window.localStorage.getItem('diagnosis_api');

let isDebug = false;

isDebug = window.location.host == "localhost:3000";

window.Auth = window.Auth || {};

export default class Http {

    request(url, method, opts) {

        var headers = new Headers();
 
        headers.append('Accept', 'application/json');
        //}

        if (method && method.toLowerCase() == "post") {
            //headers.append('Content-Type', 'multipart/form-data');
        } else { 
            headers.append('Content-Type', 'application/json');
        }

        headers.append('Authorization', 'Bearer ' + token);
        
        let body = opts && opts.body;

        var options = { method, headers, mode: 'cors', body };

        //if (opts && typeof opts === "object") options = { ...opts, ...options };

        var promise = fetch(`${baseUrl}${url}`, options);

        return promise.then((data) => {

            // Não Autenticado
            if(data.status == 401) {

                //window.document.body.innerHTML = "";

                if(!baseUrl) window.location.reload();

                localStorage.controle_aqui_api = "";

                return data.json();
            }

            if (data.body == null && data.status == 0) {

                //alert('erro')
                //window.location.href = window.BASE_URL_API + "/logout";
                return data.json();
            } else {
                ///console.error(data.status);
                return data.json();
            }
        });
    }

    requestOut(url, method, opts) {

        var headers = new Headers();

        // headers.append('Accept', 'application/json');

        // if (method && method.toLowerCase() == "post") {
        //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // } else {
        //     headers.append('Content-Type', 'application/json');
        // }

        // headers.append('Authorization', 'Bearer ' + token);

        var options = { method, headers };

        if (opts && opts.body) {
            opts.body.user_id = window.Auth.id;
            options.body = opts.body;
        }

        // if (opts && typeof opts === "object") options = { ...opts, ...options };


        return fetch(`${url}`, options).then(r => r.json()).then(res => {
            if (res && typeof res.success !== "undefined") {
                if (!res.success) {
                    throw res.message || "erro na comunicação com o servidor";
                } else {
                    return res.data;
                }
            }
            return res;
        }, (err) => {

            console.log(err);
            if (err.error == "Unauthenticated") {
                window.location.href = window.BASE_URL_API + "/logout";
            }

        });
    }

    serialize(obj, prefix) {
        var str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    this.serialize(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    get(url, params = {}) {

        params = params || {};

        params.userId = window.Auth.id;

        let _query = this.serialize(params);

        var request = this.request(url + '?' + _query, "GET");

        return request
            .then(res => {
                if (res && typeof res.success !== "undefined") {
                    if (!res.success) {
                        throw res.message || "erro na comunicação com o servidor";
                    } else {
                        return res.data;
                    }
                }
                return res;
            }, (err) => {

                //console.log(err);
                if (err.error == "Unauthenticated") {
                    window.location.href = window.BASE_URL_API + "/logout";
                }

            });
    }

    getJson(url) {

        const headers = {
            headers: new Headers({
                "Content-Type": "application/json"
            })
        };

        var request = this.request(url, "GET", headers);

        return request
            .then(res => {
                if (res && typeof res.success !== "undefined") {
                    if (!res.success) {
                        throw res.message || "erro na comunicação com o servidor";
                    } else {
                        return res.data;
                    }
                }
                return res;
            }, (err) => {

                console.log(err);
                if (err.error == "Unauthenticated") {
                    window.location.href = window.BASE_URL_API + "/logout";
                }

            });


    }

    post(url, body) {

        var form = new FormData();

        for (let prop in body) {
            if (body[prop] === null || body[prop] === 'null') {
                body[prop] = "";
            }
            form.append(prop, body[prop]);
        }

        form.append('userId', window.Auth.id);

        var request = this.request(url, "POST", {
            body: form
        });

        return request 
            .then(res => {
                if (res && typeof res.success !== "undefined") {
                    if (!res.success) {
                        throw res.message || "erro na comunicação com o servidor";
                    } else {
                        return res.data;
                    }
                }
                return res;
            }, (err) => {

                console.log(err);
                if (err.error == "Unauthenticated") {
                    window.location.href = window.BASE_URL_API + "/logout";
                }

            });

    }

    postJson(url, body) {

        body.userId = window.Auth.id;

        var request = this.request(url, "POST", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body)
        });

        return request 
            .then(res => {
                if (res && typeof res.success !== "undefined") {
                    if (!res.success) {
                        throw res.message || "erro na comunicação com o servidor";
                    } else {
                        return res.data;
                    }
                }
                return res;
            }, (err) => {

                console.log(err);
                if (err.error == "Unauthenticated") {
                    window.location.href = window.BASE_URL_API + "/logout";
                }

            });

    }

    putJson(url, body) {

        var request = this.request(url, "PUT", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body)
        });

        return request 
            .then(res => {
                if (res && typeof res.success !== "undefined") {
                    if (!res.success) {
                        throw res.message || "erro na comunicação com o servidor";
                    } else {
                        return res.data;
                    }
                }
                return res;
            }, (err) => {

                console.log(err);
                if (err.error == "Unauthenticated") {
                    window.location.href = window.BASE_URL_API + "/logout";
                }

            });

    }

    postForm(url, body) {

        var request = this.request(url, "POST", {
            body
        });

        return request 
            .then(res => {
                if (res && typeof res.success !== "undefined") {
                    if (!res.success) {
                        throw res.message || "erro na comunicação com o servidor";
                    } else {
                        return res.data;
                    }
                }
                return res;
            }, (err) => {

                console.log(err);
                if (err.error == "Unauthenticated") {
                    window.location.href = window.BASE_URL_API + "/logout";
                }

            });

    }
}

export class HttpUtils {

    static TIME_TO_INVALIDATE = 60000; //1 min

    static needsFetch(state) {

        var fetchedAt = state.fetchedAt;
        if (new Date() - fetchedAt < HttpUtils.TIME_TO_INVALIDATE) {
            return false;
        }

        return true;

    }

    static stampFetchDate(state) {
        return { ...state, fetchedAt: new Date() };
    }

}