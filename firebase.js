// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX0evsxmuqwKALF-fmVbkgIPCUVExHdgg",
  authDomain: "ratemyprofessor-3550a.firebaseapp.com",
  projectId: "ratemyprofessor-3550a",
  storageBucket: "ratemyprofessor-3550a.appspot.com",
  messagingSenderId: "866528488812",
  appId: "1:866528488812:web:98a838e7e4aaafd6255749",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  db,
};
