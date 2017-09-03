
export default function avaliacao(state = {}, action) {

    var { type, error } = action;

    if (type.startsWith("AVALIACAO_")) {
        return get(state, action);
    }

    if (type.startsWith("AVALIACOES")) {
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

        case "AVALIACOES_FETCHING":

            return { ...state, loading: true, error: null };
        case "AVALIACOES_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "AVALIACOES_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }

}
function get(state, action) {
    
    const { type, data, error } = action;

    switch (type) {

        case "AVALIACAO_FETCHING":

            return { ...state, loading: true, error: null };
        case "AVALIACAO_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "AVALIACAO_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }
}
