
export default function atendimento(state = {}, action) {

    var { type, error } = action;

    if (type.startsWith("PACIENTE_")) {
        return get(state, action);
    }

    if (type.startsWith("PACIENTES_")) {
        return getAll(state, action);
    }


    if (type == "DIALOG_DISMISS_ERROR") {
        return { ...state, error: null };
    }


    return state;

}

function getAll(state, action) {
    
    const { type, data, error } = action;

    switch (type) {

        case "PACIENTES_FETCHING":

            return { ...state, loading: true, error: null };
        case "PACIENTES_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "PACIENTES_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }

}
function get(state, action) {
    
    const { type, data, error } = action;

    switch (type) {

        case "PACIENTE_FETCHING":

            return { ...state, loading: true, error: null };
        case "PACIENTE_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "PACIENTE_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }
}
