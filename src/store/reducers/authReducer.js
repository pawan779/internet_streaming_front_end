const initialState = {
  token: "",
  admin: false,
  data: [],
  // user: [],
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
    // case "GETUSERBYID":
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    default:
      return state;
  }
};
