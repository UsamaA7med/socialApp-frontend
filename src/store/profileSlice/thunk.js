import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllPosts } from "../postsSlice/thunk";

export const getProfile = createAsyncThunk(
  "profileSlice/getProfile",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/getProfile/${id}`,
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

export const updateProfile = createAsyncThunk(
  "profileSlice/updateProfile",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/updateProfile`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleFollow = createAsyncThunk(
  "profileSlice/toggleFollow",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/toggleFollow/${id}`,
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

export const getFollowers = createAsyncThunk(
  "profileSlice/getFollowers",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/followers/${id}`,
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

export const getFollowing = createAsyncThunk(
  "profileSlice/getFollowing",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/following/${id}`,
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
