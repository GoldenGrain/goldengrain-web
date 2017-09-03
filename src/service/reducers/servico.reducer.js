
export default function servico(state = {}, action) {

    var { type, error } = action;

    if (type.startsWith("SERVICO_")) {
        return get(state, action);
    }

    if (type.startsWith("SERVICOS_")) {
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

        case "SERVICOS_FETCHING":

            return { ...state, loading: true, error: null };
        case "SERVICOS_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "SERVICOS_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }

}
function get(state, action) {
    
    const { type, data, error } = action;

    switch (type) {

        case "SERVICO_FETCHING":

            return { ...state, loading: true, error: null };
        case "SERVICO_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "SERVICO_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }
}
