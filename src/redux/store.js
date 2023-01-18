import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'src/redux/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});
