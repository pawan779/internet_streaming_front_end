const initialState = {
  genre: [],
};
export const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETGENRE":
      return {
        genre: action.payload,
      };
    default:
      return state;
  }
};
