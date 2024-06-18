import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search_channels: [],
    searchAvailable: false,
  },
  reducers: {
    addChannels: (state, action) => {
      state.search_channels = [...state.search_channels, action.payload];
      state.searchAvailable = true;
    },
    resetChannels: (state, action) => {
      state.search_channels = [];
      state.searchAvailable = false;
    },
  },
});

export const { addChannels, resetChannels } = searchSlice.actions;
const searchReducer = searchSlice.reducer;
export default searchReducer;
