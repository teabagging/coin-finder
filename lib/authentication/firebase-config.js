import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP6OAlKKPmC_TZezYEdX-K3eksBJ0GWf4",
  authDomain: "coin-finder-ce70c.firebaseapp.com",
  projectId: "coin-finder-ce70c",
  storageBucket: "coin-finder-ce70c.appspot.com",
  messagingSenderId: "1070234067111",
  appId: "1:1070234067111:web:9367fc20fd39dd2694fb82",
  measurementId: "G-CYN4Y3L85X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);



// Create User Document
