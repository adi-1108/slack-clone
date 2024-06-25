import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import appReducer from "../features/appSlice";
import searchReducer from "../features/searchSlice";
import favouriteReducer from "@/features/favouriteSlice";

const userPersistConfig = {
  key: "root",
  storage,
};

const favouritePersistConfig = {
  key: "fav",
  storage,
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);
const persistedReducerFavourite = persistReducer(
  favouritePersistConfig,
  favouriteReducer,
);
const rootReducer = combineReducers({
  user: persistedReducer,
  app: appReducer,
  search: searchReducer,
  favourite: persistedReducerFavourite,
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
