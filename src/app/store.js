import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import appReducer from "../features/appSlice";

const userPersistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: persistedReducer,
  app: appReducer,
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
