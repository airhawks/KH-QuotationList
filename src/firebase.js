import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwKnWWyWHPOYwehaL-paX7KPOLHdomH6s",
  authDomain: "kh-curtains.firebaseapp.com",
  projectId: "kh-curtains",
  storageBucket: "kh-curtains.appspot.com",
  messagingSenderId: "88547459846",
  appId: "1:88547459846:web:99c15fd9dfa6c44ef19487",
  databaseURL:
    "https://kh-curtains-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth();

export const logout = () => {
  signOut(auth);
};

export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error.message, error);
    });
};
