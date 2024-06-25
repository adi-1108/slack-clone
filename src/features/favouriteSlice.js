import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteChannels: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      state.favouriteChannels = [...state.favouriteChannels, action.payload];
    },
    removeFavourite: (state, action) => {
      state.favouriteChannels = state.favouriteChannels.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
const favouriteReducer = favouriteSlice.reducer;
export default favouriteReducer;
