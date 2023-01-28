import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  isLoading: false,
  error: false,
  isVisibleTabBar: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setVisibleTabBar(state, { payload }) {
      state.isVisibleTabBar = payload;
    },

    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const { setVisibleTabBar, login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
