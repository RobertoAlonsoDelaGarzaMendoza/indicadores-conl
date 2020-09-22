export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setRonda = (ronda) => {
  return {
    type: "SET_RONDA",
    payload: ronda,
  };
};
