import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA29Q4D-vGnmQ9ve526b48fXTslQtZ82UM",
    authDomain: "todo-app-49518.firebaseapp.com",
    projectId: "todo-app-49518",
    storageBucket: "todo-app-49518.appspot.com",
    messagingSenderId: "407869050361",
    appId: "1:407869050361:web:cf0b741ccae0f0d7038128",
    measurementId: "G-9TV30LLYHG"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
