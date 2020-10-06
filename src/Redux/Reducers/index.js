import tokenReducer from "./Token";
import loginReducer from "./LoginStatus";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import rondaReducer from "./rondaReducer";
import rondasReducer from "./rondasReducer";
import adminReducer from "./adminReducer";

const reducers = combineReducers({
  token: tokenReducer,
  isLogged: loginReducer,
  user: userReducer,
  ronda: rondaReducer,
  rondas: rondasReducer,
  isAdmin: adminReducer,
});

export default reducers;
