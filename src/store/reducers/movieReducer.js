const initialState = {
  data: [],
  movie: [],
  add: [],
  edit:[]
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
return{
  ...state,
edit:action.payload
}
    default:
      return state;
  }
};
