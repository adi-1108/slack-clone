import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appReducer from "../features/appSlice";
import userReducer from "../features/userSlice";
const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
