import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomID: null,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomID = action.payload.roomID;
    },
    resetRoom: (state, action) => {
      state.roomID = null;
    },
  },
});

export const { enterRoom, resetRoom } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
