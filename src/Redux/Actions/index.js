export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

export const deleteToken = () => {
  return {
    type: "DELETE_TOKEN",
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const deleteUser = () => {
  return {
    type: "DELETE_USER",
  };
};

export const setRonda = (ronda) => {
  return {
    type: "SET_RONDA",
    payload: ronda,
  };
};

export const deleteRonda = () => {
  return {
    type: "DELETE_RONDA",
  };
};

export const setRondas = (rondas) => {
  return {
    type: "SET_RONDAS",
    payload: rondas,
  };
};

export const deleteRondas = () => {
  return {
    type: "DELETE_RONDAS",
  };
};

export const loginIn = () => {
  return {
    type: "LOG_IN",
  };
};
export const loginOut = () => {
  return {
    type: "LOG_OUT",
  };
};

export const isAdmin = (bool) => {
  return{
    type:"ADMIN",
    payload:bool,
  }
}

