const { authReducer } = require("./authReducer");
import { movieReducer } from "./movieReducer";
import { genreReducer } from "./genreReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
  genre: genreReducer,
});

export default rootReducer;
