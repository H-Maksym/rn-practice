// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC_TiJYJqKOl0cvUfnKOSoqOZo7VYTTd4",
  authDomain: "rn-practice-ea8ad.firebaseapp.com",
  databaseURL:
    "https://rn-practice-ea8ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-practice-ea8ad",
  storageBucket: "rn-practice-ea8ad.appspot.com",
  messagingSenderId: "386977854316",
  appId: "1:386977854316:web:40a02d3c04605ba689f949",
};

// Initialize Firebase before v9.0
// const app = initializeApp(firebaseConfig);

const firebase = (() => {
  let app;
  let auth;
  let storage;
  let db;

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    storage = getStorage(app);
    db = getDatabase(app);
  } else {
    app = getApp();
    auth = getAuth();
    storage = getStorage();
    db = getDatabase();
  }

  return {
    auth,
    storage,
    db,
  };
})();

export default firebase;

// Create a reference to the file to delete
const desertRef = ref(firebase.storage, "posts/");

const delStorage = (() => {
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
})();
