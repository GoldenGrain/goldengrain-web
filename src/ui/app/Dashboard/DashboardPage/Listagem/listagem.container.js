import component from './listagem.component';
import { connect } from 'react-redux';
import { getAll } from "service/actions/avaliacao.action";

const mapStateToProps = (state, props) => {

    return {
        data: state.avaliacao.data,
        loading: state.avaliacao.loading,
        paramsSearch: state.avaliacao.paramsSearch
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