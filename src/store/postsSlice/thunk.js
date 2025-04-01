import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createPost = createAsyncThunk(
  "postsSlice/createPost",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/create`,
        data,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllPosts());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const getAllPosts = createAsyncThunk(
  "postsSlice/getAllPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/getAllPosts`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const toggleLike = createAsyncThunk(
  "postsSlice/toggleLike",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/toggleLike/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const createComment = createAsyncThunk(
  "postsSlice/createComment",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/createComment/${data.id}`,
        {
          content: data.content,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const deletePost = createAsyncThunk(
  "postsSlice/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/deletePost/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const deleteComment = createAsyncThunk(
  "postsSlice/deleteComment",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/deleteComment/${data.postId}/${
          data.commentId
        }`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const updateComment = createAsyncThunk(
  "postsSlice/updateComment",
  async (data, thunkAPI) => {
    console.log(data);
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/updateComment/${data.postId}/${
          data.commentId
        }`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const updatePost = createAsyncThunk(
  "postsSlice/updatePost",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/updatePost/${data.postId}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export {
  createPost,
  getAllPosts,
  updatePost,
  toggleLike,
  createComment,
  deletePost,
  deleteComment,
  updateComment,
};
