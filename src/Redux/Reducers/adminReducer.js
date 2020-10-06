const isAdmin = (state = false, action) => {
  switch (action.type) {
    case "ADMIN":
      return (state = action.payload);
    default:
      return state;
  }
};

export default isAdmin;