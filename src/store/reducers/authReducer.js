const initialState = {
  toke: "",
  admin: false,
  data: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        token: action.payload.token,
        admin: action.payload.admin,
      };
    case "LOGOUT":
      return initialState;

    case "GETDETAILS":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
