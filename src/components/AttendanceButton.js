import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function AttendanceButton() {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [userName, setUserName] = useState("");
  const { user } = useAuthContext();

  //時計
  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const timer = setInterval(() => {
      const now = new Date();
      //日付が変わった瞬間にリセット
      if (now >= midnight && now < midnight + 1000) {
        if (now.getDate() !== new Date(currentDate).getDate()) {
          // setClockInDisabled(false);
          // setClockOutDisabled(true);
          setCurrentDate(getFormattedDate());
        }
      }
    }, 1000);
    // コンポーネントがアンマウントされた時にタイマーをクリア
    return () => clearInterval(timer);
  }, []);

  //日付のフォーマット
  function getFormattedDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        //usersコレクションから、認証（ログイン）中のIDと一致するドキュメントを取得。
        const userDocumentRef = doc(db, "users", user.uid);
        //ドキュメントの存在確認。
        const userDocumentSnapshot = await getDoc(userDocumentRef);
        if (userDocumentSnapshot.exists()) {
          const userData = userDocumentSnapshot.data();
          setUserName(userData.name);
        } else {
          console.log("ドキュメントが存在しません");
        }
      } catch (e) {
        console.log("Error", e.message);
      }
    };

    if (user) {
      fetchUserName();
    }
  }, [user]);

  //出勤ボタンを押した時の処理
  const handleClockIn = async (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentYearAndMonth = `${currentYear}-${currentMonth}`;
    try {
      // コレクション参照を取得
      const userDocumentRef = doc(
        db,
        "attendance",
        user.uid,
        currentYearAndMonth,
        "clockingIn"
      );
      // ドキュメントにデータを追加
      await setDoc(userDocumentRef, {
        name: userName,
        date: serverTimestamp(),
        clockingIn: serverTimestamp(),
      });
      console.log("Success! ドキュメントID：");
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  //退勤ボタンを押した時の処理
  const handleClockOut = async (e) => {
    e.preventDefault();
    const attendanceCollectionRef = collection(db, "attendance");
    try {
      const documentRef = await addDoc(attendanceCollectionRef, {
        date: new Date(),
        clockingOut: new Date(),
      });
      console.log("Success! ドキュメントID：", documentRef.id);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <div>
        <form action="">
          <button onClick={handleClockIn}>出勤</button>
          <button onClick={handleClockOut}>退勤</button>
        </form>
      </div>
    </div>
  );
}
