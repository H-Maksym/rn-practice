import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserInfo } from './authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import app from 'src/firebase/config';

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, { dispatch }) => {
    try {
      await onAuthStateChanged(app.auth, user => {
        if (user) {
          dispatch(
            updateUserInfo({
              user: {
                email: user.email,
                userId: user.uid,
                userName: user.displayName,
                photoURL: user.photoURL,
              },
              isAuth: true,
              isVisibleTabBar: true,
            })
          );
        } else {
          dispatch(
            updateUserInfo({
              user: {
                email: '',
                userId: '',
                userName: '',
                photoURL: '',
              },
              isAuth: false,
              isVisibleTabBar: false,
            })
          );
        }
      });
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.request.status);
    }
  }
);

export const snapshotToArray = snapshot => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};
