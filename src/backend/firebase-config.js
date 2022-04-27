// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFNxvXgsPrZocT-GeB1Sl0gK17sJ4trqc",
  authDomain: "duckexchange-sign-in.firebaseapp.com",
  projectId: "duckexchange-sign-in",
  storageBucket: "duckexchange-sign-in.appspot.com",
  messagingSenderId: "1078207475890",
  appId: "1:1078207475890:web:15374f286cc8a436cf59ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const authentication = getAuth(app);
export const storage = getStorage(app);