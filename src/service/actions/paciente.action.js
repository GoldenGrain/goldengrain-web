import PacienteApi from '../api/paciente.api';
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

export function get(id) {

    return function (dispatch, getState) {

        const state = getState();

        let haveError = false;

        if (haveError) {
            return;
        }

        dispatch({
            type: "PACIENTE_FETCHING"
        });
  
        AtendimentoApi.get(id).then(data => {

            dispatch({
                type: "PACIENTE_FETCH_SUCCESS",
                data
            });

        }).catch(error => dispatch({
            type: "PACIENTE_FETCH_ERROR",
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
            type: "PACIENTES_FETCHING"
        });

        params.paginate = params.paginate || true;

        AtendimentoApi.getAll(params).then(data => {

            dispatch({
                type: "PACIENTES_FETCH_SUCCESS",
                data
            });

        }).catch(error => dispatch({
            type: "PACIENTES_FETCH_ERROR",
            error
        }));
    }
}

