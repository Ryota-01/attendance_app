import { useAuthContext } from "./context/AuthContext";
import { collection, doc } from "firebase/firestore";

import React from "react";

export default function createTestData() {
  var admin = require("firebase-admin");
  var serviceAccount = require("path/to/serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();
  const { user } = useAuthContext("");

  for (let i = 1; i < 5; i++) {
    async function addTestData() {
      try {
        const userCollectionRef = collection(db, user.uid);
        const attendanceDocRef = doc(userCollectionRef, "attendance");
        const attendanceSubCollection = collection(attendanceDocRef, "2024-2");
        const snapShot = await attendanceSubCollection.getDoc();
        console.log(snapShot);
        await db.collection("user.uid").doc("attendance");
      } catch (e) {}
    }
  
  }
  return <div>createTestData</div>;
}
