const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return (state = action.payload);
    case "DELETE_TOKEN":
      return (state = "");
    default:
      return state;
  }
};

export default tokenReducer;
