import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import postsSlice from "./postsSlice/postsSlice";
import profileSlice from "./profileSlice/profileSlice";

const store = configureStore({
  reducer: {
    authSlice,
    postsSlice,
    profileSlice,
  },
});

export default store;
