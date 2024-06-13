import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.userId = action.payload.id;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;


