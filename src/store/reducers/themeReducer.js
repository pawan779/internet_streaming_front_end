const initialState = {
  dark: false,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGETHEME":
      return !state;
    default:
      return state;
  }
};
