import LoginApi from '../api/login.api';
import { browserHistory } from 'react-router';

export function logoff() {
    return function (dispatch, getState) {
        var state = getState();

        dispatch({
            type: "LOGOUT_SUCCESS"
        });

        dispatch({
            type: "RESET_APP"
        });
        localStorage.clear();
        browserHistory.replace("/");
    }
}

export function logar() {

    var api = new LoginApi();

    return function (dispatch, getState) {
        const state = getState();

        var cpf = state.login.cpf;
        var password = state.login.password;

        var cpfErro = null;
        var passwordErro = null;


        var haveError = false;
        if (!cpf) {
            cpfErro = "Preencha o campo de cpf"

            dispatch({
                type: "LOGIN_SET_CPF",
                cpf,
                cpfErro
            })
            haveError = true;
        }

        if (!password) {
            passwordErro = "Favor inserir senha/password"

            dispatch({
                type: "LOGIN_SET_PASSWORD",
                password,
                passwordErro
            })
            haveError = true;
        }

        if (haveError) {
            return;
        }


        dispatch({
            type: "LOGIN_FETCHING"
        });


        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        api.logar(cpf, password).then(authData => {
            dispatch({
                type: "LOGIN_FETCH_SUCCESS",
                data: authData
            });

            localStorage.setItem("access_token", authData.access_token);
            localStorage.setItem("refresh_token", authData.refresh_token);
            localStorage.setItem("userName", authData.userName);

            browserHistory.replace("/");

            var retry = function () {
                api.userInfo()
                    .then(userinfo => {
                        dispatch({
                            type: "LOGIN_USER_INFO_FETCH_SUCCESS",
                            userinfo
                        });
                    })
                    .catch(error => {
                        retry();
                    });
            };
            retry();

        })
            .catch(error => dispatch({
                type: "LOGIN_FETCH_ERROR",
                error
            }));

    }

}

