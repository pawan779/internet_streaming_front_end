const initialState = {
  toke: "",
  admin: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return state;
    default:
      return state;
  }
};
