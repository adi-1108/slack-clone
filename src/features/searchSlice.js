import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    currentChannels: [],
    searchAvailable: false,
    searchResults: [],
  },
  reducers: {
    addChannels: (state, action) => {
      state.currentChannels = action.payload;
      state.searchAvailable = false;
    },
    addSearchChannels: (state, action) => {
      state.searchResults = action.payload;
      state.searchAvailable = true;
    },
    resetChannels: (state, action) => {
      state.searchResults = [];
      state.searchAvailable = false;
    },
  },
});

export const { addChannels, resetChannels, addSearchChannels } =
  searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;
