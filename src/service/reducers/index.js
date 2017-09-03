import { combineReducers } from 'redux';
import login from "./login.reducer"; 
import avaliacao from "./avaliacao.reducer"; 

const appState = combineReducers({
    login,
    avaliacao
});

export default (state, action) => {
    if (action.type == "RESET_APP") {
        state = undefined;
    }
    return appState(state, action);
}; 