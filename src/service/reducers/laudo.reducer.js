
export default function laudo(state = {}, action) {

    var { type, error } = action;

    if (type.startsWith("LAUDO_")) {
        return get(state, action);
    }

    if (type.startsWith("LAUDOS_")) {
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

        case "LAUDOS_FETCHING":

            return { ...state, loading: true, error: null };
        case "LAUDOS_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "LAUDOS_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }

}
function get(state, action) {
    
    const { type, data, error } = action;

    switch (type) {

        case "LAUDO_FETCHING":

            return { ...state, loading: true, error: null };
        case "LAUDO_FETCH_SUCCESS":

            return { ...state, data, loading: false, error: null };
    
        case "LAUDO_FETCH_ERROR":
            return { ...state, loading: false, error };

        default:
            return state;
    }
}
