import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//データベース（cloud firestore）をインポート
import { getFirestore } from "firebase/firestore";
//データベース（realtime database）をインポート
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";
import firebaseConfigDev from "./firebaseConfig.dev";
import firebaseConfigProd from "./firebaseConfig.prod";

let firebaseConfig;

if(process.env.NODE_ENV === "production") {
  firebaseConfig = firebaseConfigProd
} else {
  firebaseConfig = firebaseConfigDev;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, analytics, database };
