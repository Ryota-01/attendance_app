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
          date: attendance.date?.toDate()?.toLocaleString(),
          clockingIn: attendance.clockingIn?.toDate()?.toLocaleString(),
          clockingOut: attendance.clockingOut?.toDate()?.toLocaleString(),
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
            <li>出勤：{attendance.clockingIn}</li>
            <li>退勤：{attendance.clockingOut}</li>
            <li>氏名：{attendance.clockingOut}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
