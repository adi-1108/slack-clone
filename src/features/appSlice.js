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
  },
});

export const { enterRoom } = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
