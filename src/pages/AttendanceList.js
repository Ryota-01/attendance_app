import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export default function AttendanceList() {
  const [attendanceLists, setAttendanceLists] = useState([]);

  useEffect(() => {
    const attendanceCollctionRef = collection(db, "attendance");
    getDocs(attendanceCollctionRef).then((querySnapshot) => {
      const formattedData = querySnapshot.docs.map((doc) => {
        const attendance = doc.data();
        return {
          ...attendance,
          serverTimestamp : "estimate",
          date: attendance.date.toDate().toLocaleString(),
          ClockingIn: attendance.ClockingIn.toDate().toLocaleString(),
          ClockingOut: attendance.ClockingOut.toDate().toLocaleString(),
        };
      });
      console.log(formattedData);
      setAttendanceLists(formattedData);
    });
  }, []);

  return (
    <div>
      <h2>AttendanceList</h2>
      <div>
        {attendanceLists.map((attendance, index) => (
          <ul key={index}>
            <li>日付：{attendance.date}</li>
            <li>出勤：{attendance.ClockingIn}</li>
            <li>退勤：{attendance.ClockingOut}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
