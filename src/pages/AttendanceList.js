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
  const convertTimestampToJapanTime = (timestamp) => {
    if (timestamp && timestamp.toDate()) {
      const date = timestamp.toDate();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Tokyo", //日本時間に設定
        weekday : 'short'
      };
      return new Intl.DateTimeFormat("ja-JP", options).format(date);
    } else {
      return "打刻なし";
    }
  };

  const d = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();
  const dayOfWeek = d.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const currentYearAndMonth = `${currentYear}-${currentMonth}`;
  const currentMonthAndDate = `${currentMonth}-${currentDate}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // attendanceコレクションを取得
        const attendanceRef = collection(db, "attendance");
        //ユーザードキュメントを取得
        const userDocumentRef = doc(attendanceRef, user.uid);
        // 年月のサブコレクションを取得
        const yearAndMonthSubCollectionRef = collection(
          userDocumentRef,
          currentYearAndMonth
        );
        // 月日のドキュメントを取得
        const monthAndDateDocumentRef = doc(
          yearAndMonthSubCollectionRef,
          currentMonthAndDate
        );
        const docSnapShot = await getDoc(monthAndDateDocumentRef);
        if (docSnapShot.exists()) {
          const data = docSnapShot.data();
          const convertedData = {
            date: convertTimestampToJapanTime(data.date),
            clockingIn: convertTimestampToJapanTime(data.clockingIn),
            clockingOut: convertTimestampToJapanTime(data.clockingOut),
            name: data.name,
            weekday : convertTimestampToJapanTime(data.data, { weekday : 'short' }),
          };
          setAttendanceLists([convertedData]);
        } else {
          setAttendanceLists([]);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [db, user.uid]);

  return (
    <div>
      <h2>AttendanceList</h2>
      <h3>{`${currentYear}年${currentMonth}月`}</h3>
      <div>
        <button>前月</button>
        <button>次月</button>
      </div>
      <div>
        {attendanceLists.map((attendance, index) => (
          <ul key={index}>
            <li>日付：{attendance.date}</li>
            <li>出勤：{attendance.clockingIn}</li>
            <li>退勤：{attendance.clockingOut}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
