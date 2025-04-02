import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  deleteProfile,
  getsearchUsers,
  getUser,
  login,
  logout,
  signup,
  suggestedPeople,
} from "./thunk";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  followers: [],
  suggestedUsers: [],
  searchUsers: [],
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProfile.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestedPeople.pending, (state) => {
      state.error = null;
    });
    builder.addCase(suggestedPeople.fulfilled, (state, action) => {
      state.isLoading = false;
      state.suggestedUsers = action.payload;
      state.error = null;
    });
    builder.addCase(suggestedPeople.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getsearchUsers.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getsearchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchUsers = action.payload;
      state.error = null;
    });
    builder.addCase(getsearchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
