const initialState = {
  data: [],
  movie: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETMOVIE":
      return {
        ...state,
        data: action.payload,
      };
    case "GETMOVIESBYID":
      return {
        ...state,
        movie: action.payload,
      };
    default:
      return state;
  }
};
