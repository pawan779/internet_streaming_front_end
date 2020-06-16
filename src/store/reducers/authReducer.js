const initialState = {
  toke: "",
  admin: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        token: action.payload.token,
        admin: action.payload.admin
      };
    default:
      return state;
  }
};