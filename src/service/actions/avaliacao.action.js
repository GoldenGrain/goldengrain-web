import AvaliacaoApi from '../api/avaliacao.api';
import { browserHistory } from 'react-router';

// export function updateField(field, value, error) {

//     console.log('arguments', arguments);

//     return {
//         type: "UPDATE_FIELD",
//         data: "novo_atendimento",
//         field,
//         value,
//         error
//     };
// }

export function get(id, cb = null) {

    return function (dispatch, getState) {

        const state = getState();

        let haveError = false;

        if (haveError) {
            return;
        }

        dispatch({
            type: "AVALIACAO_FETCHING"
        });
  
        AvaliacaoApi.get(id).then(data => {

            dispatch({
                type: "AVALIACAO_FETCH_SUCCESS",
                data
            });

            if(cb) {
                cb();
            }

        }).catch(error => dispatch({
            type: "AVALIACAO_FETCH_ERROR",
            error
        }));

    }

}

export function getAll(params = {}) {

    return function (dispatch, getState) {

        const state = getState();

        let haveError = false;

        if (haveError) {
            return;
        }

        dispatch({
            type: "AVALIACOES_FETCHING"
        });

        params.paginate = params.paginate || true;

        AvaliacaoApi.getAll(params).then(data => {

            dispatch({
                type: "AVALIACOES_FETCH_SUCCESS",
                data
            });

            //browserHistory.replace("/");

        }).catch(error => dispatch({
            type: "AVALIACOES_FETCH_ERROR",
            error
        }));

    }

}

