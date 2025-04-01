import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/checkAuth`,
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

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verifyOTP/${data.email}`,
        {
          otp: data.otp,
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
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/resSendOTP/${email}`,
        {
          withCredentials: true,
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/getUser`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.errors);
  }
});

export const deleteProfile = createAsyncThunk(
  "auth/deleteProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/auth/deleteProfile`,
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

export const suggestedPeople = createAsyncThunk(
  "auth/suggestedPeople",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/suggestedUsers`,
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

export const getsearchUsers = createAsyncThunk(
  "auth/getsearchUsers",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/search`,
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
