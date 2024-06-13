import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUserID: null,
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserID = action.payload.currentUserID;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
