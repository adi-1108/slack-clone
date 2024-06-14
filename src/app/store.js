import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
