import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//データベース（cloud firestore）をインポート
import { getFirestore } from "firebase/firestore";
//データベース（realtime database）をインポート
import { getDatabase } from "firebase/database";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxjtYQYgmUzgDZVNlX7dWOb3Fq0Z690zI",
  authDomain: "attendance-dev-20798.firebaseapp.com",
  projectId: "attendance-dev-20798",
  storageBucket: "attendance-dev-20798.appspot.com",
  messagingSenderId: "289901762448",
  appId: "1:289901762448:web:af05020be4a935b7480515",
  measurementId: "G-3MBN5WPN9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, analytics, database };