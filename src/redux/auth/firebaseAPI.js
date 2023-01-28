import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserInfo } from "./authSlice";
import { onAuthStateChanged } from "firebase/auth";
import app from "src/firebase/config";
// import { set, ref, push, onValue, runTransaction } from "firebase/database";

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { dispatch }) => {
    try {
      await onAuthStateChanged(app.auth, (user) => {
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
                email: "",
                userId: "",
                userName: "",
                photoURL: "",
              },
              isAuth: false,
              isVisibleTabBar: false,
            })
          );
        }
      });
      // console.log("meUSer", meUser);
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.request.status);
    }
  }
);

export const snapshotToArray = (snapshot) => {
  var returnArr = [];

  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
};

/*

import {
  set,
  ref,
  push,
  onValue,
  child,
  onChildAdded,
  update,
  runTransaction,
} from "firebase/database";

const sendCommentsToDB = async () => {
  const commentsRef = ref(db, "posts/" + "-NMk7C8tgJucWdx3t9o-" + "/comments");
  const newCommentsRef = push(commentsRef);
  set(newCommentsRef, {
    title: "My comments",
    user: "Mika2",
    email: "email@email.com",
  });
  const postRef = ref(db, "posts/-NMk7C8tgJucWdx3t9o-/postData");
  runTransaction(postRef, (post) => {
    post.comments++;
    return post;
  });
};

const getPostFromDB = async () => {
  const postListRef = ref(db, "posts/");
  onValue(postListRef, (snapshot) => {
    const newArray = snapshotToArray(snapshot).map((data) => {
      if (data.comments) {
        return {
          ...data,
          comments: Object.keys(data.comments).reduce((acc, id) => {
            acc.push({ id, ...data.comments[id] });
            return acc;
          }, []),
        };
      } else {
        return data;
      }
    });
    console.log(1111, newArray);
  });
};

const getCommentsFromDB = async () => {
  const postListRef = ref(db, "posts/" + "-NMk5b3G-Ic1eLhQ2Ori" + "/comments");
  onValue(postListRef, (snapshot) => {
    const commentsArray = snapshotToArray(snapshot);
  });
};
*/
