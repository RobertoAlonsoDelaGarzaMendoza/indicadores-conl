const rondaReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_RONDA":
      return (state = action.payload);
    case "DELETE_RONDA":
      return (state = {});
    default:
      return state;
  }
};

export default rondaReducer;
