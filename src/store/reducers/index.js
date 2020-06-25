const { authReducer } = require("./authReducer");
import { movieReducer } from "./movieReducer";
import { genreReducer } from "./genreReducer";
import { favouriteReducer } from "./favouritesReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  genre: genreReducer,
  favourite: favouriteReducer,
});

export default rootReducer;
