import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKA4AqTuXvfmTsJg13bVXzEM_jH1ne7PQ",
  authDomain: "attendance-b65d7.firebaseapp.com",
  projectId: "attendance-b65d7",
  storageBucket: "attendance-b65d7.appspot.com",
  messagingSenderId: "479172396895",
  appId: "1:479172396895:web:bc23fdfa171470fae698ea",
  measurementId: "G-T4Q3QWW22E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

export { auth, fireStore, analytics };