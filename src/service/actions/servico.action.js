import ServicoApi from '../api/servico.api';
import { browserHistory } from 'react-router';

export function get(id) {

    return function (dispatch, getState) {

        const state = getState();

        let haveError = false;

        if (haveError) {
            return;
        }

        dispatch({
            type: "SERVICO_FETCHING"
        });
  
        ServicoApi.get(id).then(data => {

            dispatch({
                type: "SERVICO_FETCH_SUCCESS",
                data
            });

        }).catch(error => dispatch({
            type: "SERVICO_FETCH_ERROR",
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
            type: "SERVICOS_FETCHING"
        });

        params.paginate = params.paginate || true;

        ServicoApi.getAll(params).then(data => {

            dispatch({
                type: "SERVICOS_FETCH_SUCCESS",
                data
            });

        }).catch(error => dispatch({
            type: "SERVICOS_FETCH_ERROR",
            error
        }));
    }
}

