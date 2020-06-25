export const favouriteReducer = (state="", action) => {
  switch (action.type) {
    case "GETFAVOURITEMOVIE":
      return action.payload;
    default:
      return state;
  }
};
