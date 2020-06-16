const { combineReducers } = require("redux");
const { authReducer } = require("./authReducer");

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
