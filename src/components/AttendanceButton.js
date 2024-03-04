import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { collection, setDoc, doc, getDocs, getDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../css/AttendanceButton.css";

export default function AttendanceButton() {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [disabled, setDisabled] = useState(true);
  const { user } = useAuthContext();

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
    setDisabled(true);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendanceCollectionRef = collection(db, "attendance");
        const userDocRef = doc(attendanceCollectionRef, user.uid);
        const subCollectionRef = collection(userDocRef, currentYearAndMonth);
        const userDoc = doc(subCollectionRef, currentMonthAndDate);
        const userDocSnapshot = await getDoc(userDoc);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setDisabled(userData.isDisabled);
        }
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  },[]);

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
        isDisabled: false,
      };
      //ドキュメントを作成または更新
      const userDoc = doc(subCollectionRef, currentMonthAndDate);
      await setDoc(userDoc, value); // setDocはdocメソッドとセットで使う
      setDisabled(value.isDisabled);
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
          isDisabled: true,
        };
        await setDoc(userDoc, value, { merge: true });
        setDisabled(true);
        console.log("退勤しました");
      } else {
        console.log("対象のドキュメントが存在しません");
      }
    } catch (e) {
      console.log("退勤処理が実行できませんでした", e.message);
    }
  };
  return (
    <div className="attendanceBtnWrapper">
      <Stack direction="row" spacing={4}>
        <Button
          variant="contained"
          onClick={handleClockIn}
          color="primary"
          disabled={!disabled}
          style={{
            fontSize: "1.3rem",
            padding: "4px 60px",
          }}
        >
          出 勤
        </Button>
        <Button
          variant="contained"
          onClick={handleClockOut}
          color="secondary"
          disabled={disabled}
          style={{
            fontSize: "1.3rem",
            padding: "4px 60px",
          }}
        >
          退 勤
        </Button>
      </Stack>
    </div>
  );
}
