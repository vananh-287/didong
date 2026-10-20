import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    initializing: true, // true trong lúc app đang kiểm tra auto-login
  },
  reducers: {
    loginSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    setInitializing(state, { payload }) {
      state.initializing = payload;
    },
  },
});

export const { loginSuccess, logout, setInitializing } = authSlice.actions;
export default authSlice.reducer;
