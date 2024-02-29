import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function AttendanceList() {
  const [attendanceLists, setAttendanceLists] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    // attendanceコレクションを取得
    const attendanceCollctionRef =  db.collection("attendance").doc(user.uid);
    const fetchAttendanceCollection = async () => {
      try {
        const attendanceCollctionDoc = await attendanceCollctionRef.get();
        console.log(attendanceCollctionDoc.data());
      } catch(e) {
        console.error("error");
      }
    }
    fetchAttendanceCollection();
  }, [db, user.uid]);

  return (
    <div>
      <h2>AttendanceList</h2>
      <div>
        {attendanceLists.map((attendance, index) => (
          <ul key={index}>
            <li>日付：{attendance.date}</li>
            <li>出勤：{attendance.clockingIn}</li>
            <li>退勤：{attendance.clockingOut}</li>
            <li>氏名：{attendance.clockingOut}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
