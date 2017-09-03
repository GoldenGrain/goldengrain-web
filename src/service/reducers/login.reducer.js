
export default function login(state = {}, action) {

    var { type, cpf, password, error } = action;

    if (type.startsWith("LOGIN_")) {
        return logar(state, action);
    }

    if (type == "LOGOUT_SUCCESS") {
        return {};
    }


    if (type == "DIALOG_DISMISS_ERROR") {
        return { ...state, error: null };
    }


    return state;

}

function logar(state, action) {
    const { type, cpf, authData, password, userinfo, error, cpfErro, passwordErro } = action;
    switch (type) {
        case "LOGIN_SET_CPF":
            return { ...state, cpf, cpfErro };
        case "LOGIN_SET_PASSWORD":
            return { ...state, password, passwordErro };
        case "LOGIN_FETCHING":
            return { ...state, loading: true, error: null };
        case "LOGIN_FETCH_SUCCESS":
            return { ...state, data: authData, loading: false, error: null };
        case "LOGIN_FETCH_ERROR":
            return { ...state, loading: false, error };

        case "LOGIN_USER_INFO_FETCH_SUCCESS":
            return { ...state, userinfo };

        default:
            return state;
    }
}
