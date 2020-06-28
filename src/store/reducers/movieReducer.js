const initialState = {
  data: [],
  movie: [],
  add: [],
  edit: [],
  genre: [],
  watched: [],
  trending: [],
  latest: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDMOVIE":
      return {
        ...state,
        add: action.payload,
      };
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
    case "EDITMOVIE":
      return {
        ...state,
        edit: action.payload,
      };
    case "GETMOVIEBYGENRE":
      return {
        ...state,
        genre: action.payload,
      };
    case "RECENTLYWATCHED":
      return {
        ...state,
        watched: action.payload,
      };
    case "TRENDINGMOVIE":
      return {
        ...state,
        trending: action.payload,
      };
    case "LATESTMOVIE":
      return {
        ...state,
        latest: action.payload,
      };
    default:
      return state;
  }
};
