import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  toggleLike,
  updateComment,
  updatePost,
} from "./thunk";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createPost.fulfilled, (state) => {
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(toggleLike.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(toggleLike.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default postsSlice.reducer;
