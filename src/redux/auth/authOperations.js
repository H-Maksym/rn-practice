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
//     }
//   }
// );

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
