//This slice manages login/logout and helps your app remember the current user.

//Redux helps to store user info in one central place and access it anywhere in website,
//Redux holds the user info temporarily
import { createSlice } from "@reduxjs/toolkit";

//Starts with no user logged in
const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("fittrack-app-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("fitttrack-app-token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
