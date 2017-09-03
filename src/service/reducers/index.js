import { combineReducers } from 'redux';
import login from "./login.reducer";
import laudo from "./laudo.reducer";
import avaliacao from "./avaliacao.reducer";
import paciente from "./paciente.reducer";
import servico from "./servico.reducer";

const appState = combineReducers({
    login,
    avaliacao,
    paciente,
    servico,
    laudo
});

export default (state, action) => {
    if (action.type == "RESET_APP") {
        state = undefined;
    }
    return appState(state, action);
}; 