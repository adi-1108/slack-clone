import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../util";

const _initialState = {
  user: null,
  isAuthenticated: false,
};

const initialState = getInitialState("userSlice") || _initialState;

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action) => {
      const _user = action.payload;
      state.isAuthenticated = true;
      state.user = action.payload;
      const _userFromLocal = JSON.parse(localStorage.getItem("user") || "{}");

      const _updatedState = {
        user: { ..._userFromLocal, ..._user },
        isAuthenticated: _user?.uid?.length > 0,
      };

      localStorage.setItem("userSlice", JSON.stringify(_updatedState));
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
