import tokenReducer from "./Token";
import loginReducer from "./LoginStatus";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import rondaReducer from "./rondaReducer";
import rondasReducer from "./rondasReducer";
import adminReducer from "./adminReducer";
import dialogsReducer from "./dialogsReducers";

const reducers = combineReducers({
  token: tokenReducer,
  isLogged: loginReducer,
  user: userReducer,
  ronda: rondaReducer,
  rondas: rondasReducer,
  isAdmin: adminReducer,
  checkDialogs:dialogsReducer,
});

export default reducers;
