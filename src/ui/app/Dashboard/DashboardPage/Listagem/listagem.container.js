import component from './listagem.component';
import { connect } from 'react-redux';
import { getAll } from "service/actions/servico.action";

const mapStateToProps = (state, props) => {

    return {
        data: state.servico.data,
        loading: state.servico.loading,
        paramsSearch: state.servico.paramsSearch
    }
};

const mapDispatchToProps = (dispatch, props) => ({

    getAll(params = {}) {
        dispatch(getAll(params));
    }
});


export { mapStateToProps, mapDispatchToProps };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(component);