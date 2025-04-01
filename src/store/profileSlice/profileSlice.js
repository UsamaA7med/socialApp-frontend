import { createSlice } from "@reduxjs/toolkit";
import {
  getFollowers,
  getFollowing,
  getProfile,
  toggleFollow,
  updateProfile,
} from "./thunk";

const initialState = {
  profile: null,
  isLoading: false,
  followers: [],
  following: [],
  error: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.profile = null;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(toggleFollow.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(toggleFollow.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(toggleFollow.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getFollowers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.followers = action.payload;
      state.error = null;
    });
    builder.addCase(getFollowers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getFollowing.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFollowing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.following = action.payload;
      state.error = null;
    });
    builder.addCase(getFollowing.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice.reducer;
