const inicial = {
  dialog_introduccion: true,
  dialog_instruccion: true,
};

const dialogsReducer = (state = inicial, action) => {
  switch (action.type) {
    case "DIALOGS":
      return (state = action.payload);
    case "CHECK_INTRODUCCION":
      return (state = { ...state, dialog_introduccion: false });
    case "CHECK_INSTRUCCION":
      return (state = { ...state, dialog_instruccion: false });
    default:
      return state;
  }
};

export default dialogsReducer;
