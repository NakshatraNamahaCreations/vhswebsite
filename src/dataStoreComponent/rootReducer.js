// rootReducer.js

import { combineReducers } from "redux";
import viewCartReducer from "./viewcartSlice";
import cityReducer from "./citySlice";

const rootReducer = combineReducers({
  viewCart: viewCartReducer,
  city: cityReducer,
});

export default rootReducer;
