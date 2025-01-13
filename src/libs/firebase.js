// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVTcL7oqtf27A4eQh5Vke1ptP8u7EXl6E",
  authDomain: "news-project-aa768.firebaseapp.com",
  projectId: "news-project-aa768",
  storageBucket: "news-project-aa768.appspot.com",
  messagingSenderId: "205111506884",
  appId: "1:205111506884:web:68decbf3b068227b1d1691",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc };
