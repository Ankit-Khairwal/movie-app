// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLK78x-fsrNgVYw7ps4HGso5KIKBFM1SY",
  authDomain: "movie-6b94e.firebaseapp.com",
  projectId: "movie-6b94e",
  storageBucket: "movie-6b94e.firebasestorage.app",
  messagingSenderId: "894711622302",
  appId: "1:894711622302:web:17962bf9b6704d831e298f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
