import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  updatePhotoAvatar,
  deletePhotoAvatar,
} from "./authOperations";

const initialState = {
  user: {
    userId: "",
    userName: "",
    email: "",
    photoURL: "",
  },
  isAuth: false,
  isVisibleTabBar: false,
  isLoading: false,
  error: false,
};

const pending = (state) => {
  state.isLoading = true;
  state.error = false;
};

const rejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setVisibleTabBar(state, { payload }) {
      state.isVisibleTabBar = payload;
    },
    //INFO getCurrentUser
    updateUserInfo(state, { payload }) {
      state.user = { ...payload.user };
      state.isAuth = payload.isAuth;
      state.isVisibleTabBar = payload.isVisibleTabBar;
      state.isLoading = false;
      state.error = false;
    },
  },

  extraReducers: (builder) => {
    //INFO register
    builder.addCase(register.pending, pending);
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = { ...payload };
      state.isAuth = true;
      state.isLoading = false;
      state.isVisibleTabBar = true;
    });
    builder.addCase(register.rejected, rejected);

    //INFO login
    builder.addCase(login.pending, pending);
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.isLoading = false;
      state.isVisibleTabBar = true;
      state.user = { ...payload };
    });
    builder.addCase(login.rejected, rejected);

    //INFO logout
    builder.addCase(logout.pending, pending);
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {
        userId: "",
        userName: "",
        email: "",
        photoURL: "",
      };
      state.isAuth = false;
      state.isVisibleTabBar = false;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(logout.rejected, rejected);

    //INFO add photo avatar
    builder.addCase(updatePhotoAvatar.pending, pending);
    builder.addCase(updatePhotoAvatar.fulfilled, (state, { payload }) => {
      state.user.photoURL = payload;
    });
    builder.addCase(updatePhotoAvatar.rejected, rejected);

    //INFO delete photo avatar
    builder.addCase(deletePhotoAvatar.pending, pending);
    builder.addCase(deletePhotoAvatar.fulfilled, (state, { payload }) => {
      state.user.photoURL = payload;
    });
    builder.addCase(deletePhotoAvatar.rejected, rejected);
  },
});

export const { setVisibleTabBar, updateUserInfo } = authSlice.actions;

export const authReducer = authSlice.reducer;
