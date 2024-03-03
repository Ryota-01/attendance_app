import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import Button from "@mui/material/Button";

export default function AttendanceButton() {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
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

  // 現在の年と月を取得
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();
  const currentYearAndMonth = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, 0)}`;
  const currentMonthAndDate = `${currentMonth.toString().padStart(2, 0)}-${today
    .toString()
    .padStart(2, 0)}`;

  //出勤ボタンを押した時の処理
  const handleClockIn = async (e) => {
    e.preventDefault();
    try {
      // attendanceコレクションを参照（基本）
      const attendanceCollectionRef = collection(db, "attendance");
      //（setDocを使う場合）ドキュメントのIDを指定
      // docメソッドは指定されたコレクション内のドキュメント参照するメソッド。
      // ドキュメントが存在しない場合でも参照を取得する。この参照を使用して新しいドキュメントを作成することができる。getDocでも参照ができる。
      const userDocRef = doc(attendanceCollectionRef, user.uid);
      //サブコレクションが存在しているかチェック。
      const subCollectionRef = collection(userDocRef, currentYearAndMonth);
      const subCollectionDoc = await getDocs(subCollectionRef);
      const value = {
        userID: user.uid,
        date: new Date(),
        startTime: new Date(),
      };
      //ドキュメントを作成または更新
      const userDoc = doc(subCollectionRef, currentMonthAndDate);
      await setDoc(userDoc, value); // setDocはdocメソッドとセットで使う
      console.log("success");
    } catch (e) {
      console.log("error", e.message);
    }
  };

  //退勤ボタンを押した時の処理
  const handleClockOut = async (e) => {
    e.preventDefault();
    try {
      // attendanceコレクションを参照
      const attendanceCollectionRef = collection(db, "attendance");
      // attendanceコレクション内のuserドキュメントを参照
      const userDocRef = doc(attendanceCollectionRef, user.uid);
      // userドキュメント内のcurrentYearAndMonthコレクションを参照
      const subCollectionRef = collection(userDocRef, currentYearAndMonth);
      // currentYearAndMonth内のドキュメントを取得
      const subCollectionDoc = await getDocs(subCollectionRef);
      if (!subCollectionDoc.empty) {
        const userDoc = doc(subCollectionRef, currentMonthAndDate);
        const value = {
          endTime: new Date(),
        };
        await setDoc(userDoc, value, { merge: true });
        console.log("退勤しました");
      } else {
        console.log("対象のドキュメントが存在しません");
      }
    } catch (e) {
      console.log("退勤処理が実行できませんでした", e.message);
    }
  };
  return (
    <div>
      <form action="">
        <Button variant="contained" onClick={handleClockIn}>
          出勤
        </Button>
        <Button variant="contained" disabled onClick={handleClockOut}>
          退勤
        </Button>
      </form>
    </div>
  );
}
