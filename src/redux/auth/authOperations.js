<<<<<<< HEAD
import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import gravatar from "gravatar";
import app from "src/firebase/config";

const { auth, storage } = app;
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { Alert } from "react-native";

const metadata = {
  contentType: "image/jpeg",
};

export const uploadPhoto = async (image, imgStore) => {
  //INFO upload image from telephone
  const response = await fetch(image);
  const file = await response.blob();
  //INFO upload image to storage
  const pathFile = `${imgStore}/` + Date.now() + `-${nanoid()}` + ".jpg";
  const photoRef = ref(storage, pathFile);
  const uploadTask = await uploadBytes(photoRef, file, metadata);
  const url = await getDownloadURL(uploadTask.ref);
  return url;
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, image }, { rejectWithValue }) => {
    let photoURL;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!image) {
        photoURL = gravatar.url(email, { protocol: "http", s: "120" });
      } else {
        photoURL = await uploadPhoto(image, "avatar");
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      Alert.alert(`User ${name} registered successfully`);

      return {
        email: user.email,
        userId: user.uid,
        userName: name,
        photoURL,
      };
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Email in use");
        return rejectWithValue(error.code);
      }
      Alert.alert("Oops, something went wrong");
      return rejectWithValue(error.code);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert(`You have successfully logged into your account`);
      return {
        userId: user.uid,
        email: user.email,
        userName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        Alert.alert(`"Email or password invalid"`);
        return rejectWithValue(error.code);
      }
      return rejectWithValue(error.code);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { fulfillWithValue }) => {
    try {
      signOut(auth);
    } catch (error) {
      Alert.alert("Oops, something went wrong");
      fulfillWithValue(error.code);
    }
  }
);

//firebasestorage.googleapis.com/v0/b/rn-practice-5f175.appspot.com/o/avatar%2F1674660613951-Hco-Mw27OItmg_lo1QUhd.jpg?alt=media&token=9a14cfd9-9b64-4045-9bd2-40fd86705c3d

export const updatePhotoAvatar = createAsyncThunk(
  "auth/updatePhotoAvatar",
  async ({ oldAvatar, newAvatar }, { fulfillWithValue }) => {
    try {
      if (oldAvatar.includes("https://firebasestorage.googleapis.com")) {
        const fileName =
          oldAvatar.split("avatar%2F")[1].split(".jpg")[0] + ".jpg";
        const desertRef = ref(storage, `avatar/${fileName}`);
        await deleteObject(desertRef);
      }
      const photoURL = await uploadPhoto(newAvatar, "avatar");
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      return photoURL;
    } catch (error) {
      console.log(error);
      Alert.alert("Oops, something went wrong gagag");
      fulfillWithValue(error.code);
    }
  }
);

export const deletePhotoAvatar = createAsyncThunk(
  "auth/deletePhotoAvatar",
  async (email, { fulfillWithValue }) => {
    try {
      const photoURL = gravatar.url(email, { protocol: "http", s: "120" });
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      return photoURL;
    } catch (error) {
      console.log(error.message);
      Alert.alert("Oops, something went wrong fffff");
      fulfillWithValue(error.code);
    }
  }
);

//INFO firebaseAPI
// export const getUserInfo = createAsyncThunk(
//   "auth/getUserInfo",
//   async (_, { dispatch }) => {
//     try {
//       await onAuthStateChanged(auth, (user) => {
//         if (user) {
//           dispatch(
//             updateUserInfo({
//               user: {
//                 email: user.email,
//                 userId: user.uid,
//                 userName: user.displayName,
//                 photoURL: user.photoURL,
//               },
//               isAuth: true,
//               isVisibleTabBar: true,
//             })
//           );
//         } else {
//           dispatch(
//             updateUserInfo({
//               user: {
//                 email: "",
//                 userId: "",
//                 userName: "",
//                 photoURL: "",
//               },
//               isAuth: false,
//               isVisibleTabBar: false,
//             })
//           );
//         }
//       });
//     } catch (error) {
//       console.log(error.message);
//       return thunkAPI.rejectWithValue(error.request.status);
=======
// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import { IoMdLogIn } from 'react-icons/io';
// import { store } from 'redux/store';

// axios.defaults.baseURL = 'https://petly-back.onrender.com/api';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

// axios.interceptors.response.use(
//   async res => {
//     return res;
//   },
//   async error => {
//     const { response, config } = error;
//     if (response.status === 401) {
//       const state = store.getState();
//       const token = state.auth.accessToken;

//       if (token) {
//         const { accessToken, refreshToken } = await refreshTokens();

//         store.dispatch(
//           setTokens({
//             accessToken,
//             refreshToken,
//           })
//         );

//         config.headers['Authorization'] = 'Bearer ' + accessToken;
//         return axios(config);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const refreshTokens = async () => {
//   const state = store.getState();
//   const refreshToken = state.auth.refreshToken;

//   try {
//     const { data } = await axios.post('/auth/refresh', { refreshToken });
//     token.set(data.accessToken);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const setTokens = createAsyncThunk(
//   'auth/set-tokens',
//   async (tokens, { rejectWithValue }) => {
//     try {
//       token.set(tokens.accessToken);

//       return tokens;
//     } catch (error) {
//       return rejectWithValue(error);
>>>>>>> main
//     }
//   }
// );

<<<<<<< HEAD
=======
// export const register = createAsyncThunk(
//   'auth/register',
//   async (user, { rejectWithValue }) => {
//     try {
//       await axios.post('/auth/register', user);
//       toast.success(`User ${user.name} registered successfully`);
//     } catch (error) {
//       if (error.response.status === 409) {
//         toast.error('Email in use');
//         return rejectWithValue(error.request.status);
//       }
//       toast.error('Oops, something went wrong');
//       return rejectWithValue(error.request.status);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (user, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post('/auth/login', user);
//       token.set(data.user.accessToken);
//       toast(`You have successfully logged into your account`, {
//         icon: <IoMdLogIn size={25} color="green" />,
//       });

//       return data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         toast.error('Email or password invalid');
//         return rejectWithValue(error.request.message);
//       }
//       toast.error('Oops, something went wrong');
//       return rejectWithValue(error.request.status);
//     }
//   }
// );
>>>>>>> main
// export const restore = createAsyncThunk(
//   'auth/restore',
//   async (email, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.patch('/auth/restore', email);
//       toast(`Password was sent to Your email`, {
//         icon: <IoMdLogIn size={25} color="green" />,
//       });
//       return data;
//     } catch (error) {
//       if (error.response.status === 400) {
//         toast.error('Something went wrong');
//         return rejectWithValue(error.request.message);
//       }
//       toast.error('Oops, something went wrong');
//       return rejectWithValue(error.request.status);
//     }
//   }
// );

<<<<<<< HEAD
=======
// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { fulfillWithValue }) => {
//     try {
//       await axios.get('/auth/logout');
//       token.unset();
//     } catch (error) {
//       // toast.error('Oops, something went wrong');
//       fulfillWithValue(error.request.status);
//     }
//   }
// );

// export const getUserInfo = createAsyncThunk(
//   'userInfo/getUserInfo',
//   async (query, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       const res = await axios.get('/user/userInfo');
//       return res.data;
//     } catch (error) {
//       // toast.error('Oops, something went wrong');
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

>>>>>>> main
// export const updateUserInfo = createAsyncThunk(
//   'userInfo/updateUserInfo',
//   async (payload, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       const { data } = await axios.patch(`/user/update`, payload);
//       return data;
//     } catch (error) {
//       toast.error("Sorry, can't update user, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const addPet = createAsyncThunk(
//   'pet/addPet',
//   async (payload, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       const { data } = await axios.post('/user/pets', payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return data;
//     } catch (error) {
//       toast.error("Sorry, can't add pet, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const deletePet = createAsyncThunk(
//   'pet/deletePet',
//   async (_id, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       await axios.delete(`/user/pets/${_id}`);
//       return { _id };
//     } catch (error) {
//       toast.error("Sorry, can't delete pet, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// //INFO Notices operations
// export const addFavoriteNotice = createAsyncThunk(
//   'notices/addFavorite',
//   async (_id, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       await axios.patch(`/notices/user/${_id}/favorites`);
//       return _id;
//     } catch (error) {
//       toast.error("Sorry, can't add favorite notices, something went wrong!");
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );

// export const deleteFavoriteNotice = createAsyncThunk(
//   'notices/deleteFavorite',
//   async (_id, thunkAPI) => {
//     try {
//       const tokenLS = thunkAPI.getState().auth.accessToken;
//       token.set(tokenLS);
//       await axios.delete(`/notices/user/${_id}/favorites`);
//       return _id;
//     } catch (error) {
//       toast.error(
//         "Sorry, can't delete favorite notices, something went wrong!"
//       );
//       return thunkAPI.rejectWithValue(error.request.status);
//     }
//   }
// );
