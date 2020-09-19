import tokenReducer from './Token';
import loginReducer from './LoginStatus';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    token:tokenReducer,
    isLogged:loginReducer
});

export default reducers;