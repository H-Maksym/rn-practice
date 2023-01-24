// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3uFIIqeQP5r11R6jymbrBD0Z7p0VX3yk",
  authDomain: "rn-practice-5f175.firebaseapp.com",
  projectId: "rn-practice-5f175",
  storageBucket: "rn-practice-5f175.appspot.com",
  messagingSenderId: "872115668894",
  appId: "1:872115668894:web:1427e454d5de356b4b388f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
