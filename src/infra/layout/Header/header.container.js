import {connect} from 'react-redux'
import { logoff } from 'service/actions/login.action';
import component from './header.component'

const mapStateToProps = (state, props) => ({
    userinfo: state.login.userinfo
});

const mapDispatchToProps = (dispatch, props) => ({
    deslogar() {
        dispatch(logoff());
    }
})

export {mapStateToProps, mapDispatchToProps};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(component);