import { movieReducer } from "./movieReducer";

const { combineReducers } = require("redux");
const { authReducer } = require("./authReducer");

const rootReducer = combineReducers({
  auth: authReducer,
  movies: movieReducer,
});

export default rootReducer;
