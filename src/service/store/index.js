import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';


const logger = createLogger();

export default createStore(
    reducers,
    applyMiddleware(logger, thunk)
);