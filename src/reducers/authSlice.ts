import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: User;
  error: string | null;
}

const initialUser: User = {
  id: 0,
  username: "",
  password: "",
  email: "",
};
const initialState: AuthState = {
  isAuthenticated: false,
  user: initialUser,
  error: null,
};

const API = axios.create({
  baseURL: "http://20.117.92.31:4798/api",
});

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: { username: string; password: string; email: string }) => {
    try {
      const response = await API.post("/user/signup", payload);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: { username: string; password: string }) => {
    const response = await API.post("/user/signin", payload);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false;
        console.log(state.error);
        state.error = action.error.message || "Failed to sign up";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        console.log(state.error);
        state.error = action.error.message || "Failed to sign in";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
