<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import { authSlice, authReducer } from "src/redux/auth/authSlice";
=======
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, authReducer } from 'src/redux/auth/authSlice';
>>>>>>> main

export const store = configureStore({
  reducer: {
    [authSlice.name]: authReducer,
  },
  devTools: true,
});
