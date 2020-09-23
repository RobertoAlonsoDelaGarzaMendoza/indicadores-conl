const rondasReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RONDAS":
      return (state = action.payload);
    case "DELETE_RONDAS":
      return (state = []);
    default:
      return state;
  }
};

export default rondasReducer;
