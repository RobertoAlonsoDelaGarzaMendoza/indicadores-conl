import tokenReducer from './Token';
import loginReducer from './LoginStatus';
import {combineReducers} from 'redux';
import userReducer from './userReducer';

const reducers = combineReducers({
    token:tokenReducer,
    isLogged:loginReducer,
    user:userReducer
});

export default reducers;