// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhdMekFYoC6XbfezjYMbM0JXvKysVic3U",
  authDomain: "workforcesynch.firebaseapp.com",
  projectId: "workforcesynch",
  storageBucket: "workforcesynch.appspot.com",
  messagingSenderId: "5209556600",
  appId: "1:5209556600:web:99b13b384cbc27d3dacf8d",
  measurementId: "G-1Z721YQKP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();