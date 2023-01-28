import { configureStore } from '@reduxjs/toolkit';
import { authSlice, authReducer } from 'src/redux/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authReducer,
  },
  devTools: true,
});
