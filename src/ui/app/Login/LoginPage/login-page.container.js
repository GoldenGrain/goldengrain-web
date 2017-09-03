import component from './login-page.component';
import { connect } from 'react-redux';
import { logar } from "service/actions/login.action";


const mapStateToProps = (state, props) => ({
    loading: state.login.loading,
    cpfErro: state.login.cpfErro,
    passwordErro: state.login.passwordErro
   
});

const mapDispatchToProps = (dispatch, props) => ({
     setCPF(cpf) {
        dispatch({
            type: "LOGIN_SET_CPF",
            cpf
        })
    },

    setPassword(password) {
        dispatch({
            type: "LOGIN_SET_PASSWORD",
            password
        })
    },
     entrar() {
        dispatch(logar());
    }
  
});


export {mapStateToProps, mapDispatchToProps};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(component);