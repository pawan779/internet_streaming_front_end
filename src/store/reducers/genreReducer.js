const initialState = {
  genre: [],
  updated: [],
};
export const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETGENRE":
      return {
        ...state,
        genre: action.payload,
      };
    case "UPDATEGENRE":
      return {
        ...state,
        updated: action.payload,
      };
    default:
      return state;
  }
};
