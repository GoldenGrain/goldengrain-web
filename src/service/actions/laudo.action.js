import LaudoApi from '../api/laudo.api';
import { browserHistory } from 'react-router';

export function get(id, cb) {

    return function (dispatch, getState) {

        const state = getState();

        let haveError = false;

        if (haveError) {
            return;
        }

        dispatch({
            type: "LAUDO_FETCHING"
        });
  
        LaudoApi.get(id).then(data => {

            dispatch({
                type: "LAUDO_FETCH_SUCCESS",
                data
            });

            if(cb) {
                cb(data);
            }

        }).catch(error => dispatch({
            type: "LAUDO_FETCH_ERROR",
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
            type: "LAUDOS_FETCHING"
        });

        params.paginate = params.paginate || true;

        LaudoApi.getAll(params).then(data => {

            dispatch({
                type: "LAUDOS_FETCH_SUCCESS",
                data
            });

            //browserHistory.replace("/");

        }).catch(error => dispatch({
            type: "LAUDOS_FETCH_ERROR",
            error
        }));

    }

}

