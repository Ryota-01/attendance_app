import React, { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function AttendanceList() {
  const [attendanceList, setAttendanceList] = useState([]);
  useEffect(() => {
    const attendanceCollctionRef = collection(db, "attendance");
    getDocs(attendanceCollctionRef)
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.data().date);
      })
    },[])
  })

  return (
    <div>
      <h2>AttendanceList</h2>
    </div>
  );
}
