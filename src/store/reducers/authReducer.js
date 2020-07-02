const initialState = {
  token: "",
  admin: false,
  data: [],
  users: [],
  // user: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return {
        token: `Bearer ${action.payload.token}`,
        admin: action.payload.admin,
      };
    case "LOGOUT":
      return initialState;

    case "GETDETAILS":
      return {
        ...state,
        data: action.payload,
      };

    case "GETALLUSERS":
      return {
        ...state,
        users: action.payload,
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
