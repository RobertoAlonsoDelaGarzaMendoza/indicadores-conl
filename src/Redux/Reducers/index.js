import tokenReducer from "./Token";
import loginReducer from "./LoginStatus";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import rondaReducer from "./rondaReducer";

const reducers = combineReducers({
  token: tokenReducer,
  isLogged: loginReducer,
  user: userReducer,
  ronda: rondaReducer,
});

export default reducers;
