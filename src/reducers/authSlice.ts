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
};

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload: { username: string; password: string; email: string }) => {
    const response = await API.post("/user/signup", payload);
    return response.data;
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
      })
      .addCase(signUp.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
