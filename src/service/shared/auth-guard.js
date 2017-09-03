
class AuthGuard {

    constructor(localStorage) {
        this.localStorage = localStorage || window.localStorage;
    }

    getAccessToken() {
        return this.localStorage.getItem("access_token");
    }

    hasToken() {
        return !!this.getAccessToken();
    }

    handleEnter(nextState, replace) {
       this.handleChange(nextState, null, replace);
    }

    handleChange(nextState, _, replace) {

        if (!this.hasToken()) {
            replace({
                pathname: '/login'
            })
        }
    }

    handleNoAuth(nextState, replace) {
        if (this.hasToken()) {
            replace({
                pathname: '/'
            })
        }
    }
}



const authGuard = new AuthGuard();

authGuard.handleChange = authGuard.handleChange.bind(authGuard);
authGuard.handleEnter = authGuard.handleEnter.bind(authGuard);
authGuard.handleNoAuth = authGuard.handleNoAuth.bind(authGuard);

export default authGuard;