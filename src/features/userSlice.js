import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
