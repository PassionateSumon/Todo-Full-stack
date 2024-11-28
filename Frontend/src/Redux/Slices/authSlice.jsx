import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API = "http://localhost:3000/api";

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ username, password }, thunkApi) => {
    // console.log(username, password)
    try {
      const response = await axios.post(
        `${BASE_API}/signup`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ username, password }, thunkApi) => {
    try {
      const response = await axios.post(
        `${BASE_API}/signin`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      alert("Wrong credintials!!");
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(signupUser.rejected, signinUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
