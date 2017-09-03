import component from './cadastro.component';
import { connect } from 'react-redux';
import { get } from "service/actions/avaliacao.action";

const mapStateToProps = (state, props) => {

    return {
        data: state.avaliacao.data,
        loading: state.avaliacao.loading,
        paramsSearch: state.avaliacao.paramsSearch
    }
};
const mapDispatchToProps = (dispatch, props) => ({

    get(id, cb = null) {
        dispatch(get(id, cb));
    } 
});


export {mapStateToProps, mapDispatchToProps};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(component);