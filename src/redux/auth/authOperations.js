import { createAsyncThunk } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import gravatar from 'gravatar';
import app from 'src/firebase/config';

const { auth, storage } = app;
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { Alert } from 'react-native';

const metadata = {
  contentType: 'image/jpeg',
};

export const uploadPhoto = async (image, imgStore) => {
  //INFO upload image from telephone
  const response = await fetch(image);
  const file = await response.blob();
  //INFO upload image to storage
  const pathFile = `${imgStore}/` + Date.now() + `-${nanoid()}` + '.jpg';
  const photoRef = ref(storage, pathFile);
  const uploadTask = await uploadBytes(photoRef, file, metadata);
  const url = await getDownloadURL(uploadTask.ref);
  return url;
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, image }, { rejectWithValue }) => {
    let photoURL;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!image) {
        photoURL = gravatar.url(email, { protocol: 'http', s: '120' });
      } else {
        photoURL = await uploadPhoto(image, 'avatar');
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

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email in use');
        return rejectWithValue(error.code);
      }
      Alert.alert('Oops, something went wrong');
      return rejectWithValue(error.code);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
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
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(`"Email or password invalid"`);
        return rejectWithValue(error.code);
      }
      return rejectWithValue(error.code);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { fulfillWithValue }) => {
    try {
      signOut(auth);
    } catch (error) {
      Alert.alert('Oops, something went wrong');
      fulfillWithValue(error.code);
    }
  }
);

export const updatePhotoAvatar = createAsyncThunk(
  'auth/updatePhotoAvatar',
  async ({ oldAvatar, newAvatar }, { fulfillWithValue }) => {
    try {
      if (oldAvatar.includes('https://firebasestorage.googleapis.com')) {
        const fileName =
          oldAvatar.split('avatar%2F')[1].split('.jpg')[0] + '.jpg';
        const desertRef = ref(storage, `avatar/${fileName}`);
        await deleteObject(desertRef);
      }
      const photoURL = await uploadPhoto(newAvatar, 'avatar');
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      return photoURL;
    } catch (error) {
      console.log(error);
      Alert.alert('Oops, something went wrong gagag');
      fulfillWithValue(error.code);
    }
  }
);

export const deletePhotoAvatar = createAsyncThunk(
  'auth/deletePhotoAvatar',
  async (email, { fulfillWithValue }) => {
    try {
      const photoURL = gravatar.url(email, { protocol: 'http', s: '120' });
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      return photoURL;
    } catch (error) {
      console.log(error.message);
      Alert.alert('Oops, something went wrong fffff');
      fulfillWithValue(error.code);
    }
  }
);
