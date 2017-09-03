import BaseApi from "./BaseApi";

const data = [
    {
        id: 1,
        amostra: 2,
        codigo: 32133,
        data: '02/09/2017 ás 18:39',
        produtor: 'Produtex',
        comprador: 'Empresa Compradora',
        classificador: 'João Antônio Silva',
        status: 'Pendente',
        peso: '127,40',
        status_id: 1,
        umidade: 45,
        ardido_grama: '0,31',
        ardido_porcentagem: '0,2',
        queimado_grama: '0,31',
        queimado_porcentagem: '0,2',
        total_ardidos_queimados_grama: '0,31',
        total_ardidos_queimados_porcentagem: '0,2',
        mofados_grama: '0,31',
        mofados_porcentagem: '0,2',
        fermentados_grama: '0,31',
        fermentados_porcentagem: '0,2',
        brotados_grama: '0,31',
        brotados_porcentagem: '0,2',
        imaturos_grama: '0,31',
        imaturos_porcentagem: '0,2',
        chochos_grama: '0,31',
        chochos_porcentagem: '0,2'
    },
    {
        id: 2,
        amostra: 1,
        codigo: 33233,
        data: '02/09/2017 ás 13:45',
        produtor: 'Hackathon de Teste',
        comprador: 'Compras de Grãos',
        classificador: 'Maria Silva',
        status: 'Analisado',
        peso: '127,40',
        status_id: 2,
        umidade: 33,
        ardido_grama: '0,31',
        ardido_porcentagem: '0,2',
        queimado_grama: '0,31',
        queimado_porcentagem: '0,2',
        total_ardidos_queimados_grama: '0,31',
        total_ardidos_queimados_porcentagem: '0,2',
        mofados_grama: '0,31',
        mofados_porcentagem: '0,2',
        fermentados_grama: '0,31',
        fermentados_porcentagem: '0,2',
        brotados_grama: '0,31',
        brotados_porcentagem: '0,2',
        imaturos_grama: '0,31',
        imaturos_porcentagem: '0,2',
        chochos_grama: '0,31',
        chochos_porcentagem: '0,2'
    },
    {
        id: 3,
        amostra: 2,
        codigo: 22133,
        data: '06/08/2017 ás 14:14',
        produtor: 'Produtor Hackathon',
        comprador: 'Produtora de Varejo S/A',
        classificador: 'Maria Silva',
        status: 'Analisado',
        peso: '127,40',
        status_id: 2,
        umidade: 20,
        ardido_grama: '0,31',
        ardido_porcentagem: '0,2',
        queimado_grama: '0,31',
        queimado_porcentagem: '0,2',
        total_ardidos_queimados_grama: '0,31',
        total_ardidos_queimados_porcentagem: '0,2',
        mofados_grama: '0,31',
        mofados_porcentagem: '0,2',
        fermentados_grama: '0,31',
        fermentados_porcentagem: '0,2',
        brotados_grama: '0,31',
        brotados_porcentagem: '0,2',
        imaturos_grama: '0,31',
        imaturos_porcentagem: '0,2',
        chochos_grama: '0,31',
        chochos_porcentagem: '0,2'
    },
    {
        id: 4,
        amostra: 1,
        codigo: 32623,
        data: '02/08/2017 ás 08:56',
        produtor: 'Horlando Produtor',
        comprador: 'Empresa de Compradora',
        classificador: 'Maria Silva',
        status: 'Analisado',
        peso: '127,40',
        status_id: 2,
        umidade: 78,
        ardido_grama: '0,31',
        ardido_porcentagem: '0,2',
        queimado_grama: '0,31',
        queimado_porcentagem: '0,2',
        total_ardidos_queimados_grama: '0,31',
        total_ardidos_queimados_porcentagem: '0,2',
        mofados_grama: '0,31',
        mofados_porcentagem: '0,2',
        fermentados_grama: '0,31',
        fermentados_porcentagem: '0,2',
        brotados_grama: '0,31',
        brotados_porcentagem: '0,2',
        imaturos_grama: '0,31',
        imaturos_porcentagem: '0,2',
        chochos_grama: '0,31',
        chochos_porcentagem: '0,2'
    }
];

export class AvaliacaoApi extends BaseApi {

    constructor() {
        super('avaliacao');
    }

    getAll(params = {}) {

        return new Promise((resolve, reject) => {

            resolve({
                data
            })
        });
    }

    get(id) {

        return new Promise((resolve, reject) => {

            let obj = data.filter(x => x.codigo == id)[0] || {};

            resolve(obj);
        });
    }
}

export default new AvaliacaoApi();