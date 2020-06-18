const initialState = {
  data: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETMOVIE":
      return {
        data: action.payload,
      };
      default:
          return state
  }
};
