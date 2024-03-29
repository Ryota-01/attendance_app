import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext.jsx";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../css/AttendanceButton.css";
import Snackbar from "./Snackbar/Snackbar";

export default function AttendanceButton() {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [isClockInDisabled, setIsClockInDisabled] = useState();
  const [isClockOutDisabled, setIsClockOutDisabled] = useState(true);
  const [isPopupMessage, setIsPopupMessage] = useState(false);
  const [popupMessage, setPopupMessage] = useState(false);
  const { user } = useAuthContext();

  //日付のフォーマット
  function getFormattedDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  }

  // 現在の年月日と時間を取得
  const d = new Date();
  const currentYear = d.getFullYear();
  const currentMonth = (d.getMonth() + 1).toString().padStart(2, 0);
  const today = d.getDate().toString().padStart(2, 0);
  const dayOfWeek = d.getDay();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // userコレクションを参照
        const userCollectionRef = collection(db, user.uid);
        // attendanceドキュメントを作成
        const attendanceDocRef = doc(userCollectionRef, "attendance");
        // 年月で分けるサブコレクションを参照
        const attendanceSubCollectionRef = collection(
          attendanceDocRef,
          `${currentYear}-${currentMonth}`
        );
        // 日毎に分けるドキュメントを作成
        const attendanceDataDocRef = doc(
          attendanceSubCollectionRef,
          `${currentMonth}-${today}`
        );
        const snapShot = await getDoc(attendanceDataDocRef);
        if (snapShot.exists()) {
          const userData = snapShot.data();
          setIsClockInDisabled(userData.isClockInDisabled);
          setIsClockOutDisabled(userData.isClockOutDisabled);
        }
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchData();
  }, []);

  const getAttendanceCollection = async () => {
    // userコレクションを参照
    const userCollectionRef = collection(db, user.uid);
    // userコレクション内のattendanceドキュメントを参照
    const attendanceDocRef = doc(userCollectionRef, "attendance");
    // 年月で分けるサブコレクションを参照
    const attendanceSubCollectionRef = collection(
      attendanceDocRef,
      `${currentYear}-${currentMonth}`
    );
    // 日毎に分けるドキュメントを作成
    const attendanceDataDocRef = doc(
      attendanceSubCollectionRef,
      `${currentMonth}-${today}`
    );
    return { attendanceDataDocRef };
    // 補足
    //（setDocを使う場合）ドキュメントのIDを指定
    // docメソッドは指定されたコレクション内のドキュメント参照するメソッド。
    // ドキュメントが存在しない場合でも参照を取得する。この参照を使用して新しいドキュメントを作成することができる。getDocでも参照ができる。
  };

  // 出勤ボタンを押した時の処理
  const handleClockIn = async (e) => {
    e.preventDefault();
    try {
      const value = {
        userID: user.uid,
        // date: `${currentYear}年${currentMonth}月${today}日(${dayNames[dayOfWeek]})`,
        date: serverTimestamp(),
        startTime: serverTimestamp(),
        isClockInDisabled: true,
        remarks: "",
      };
      const { attendanceDataDocRef } = await getAttendanceCollection();
      await setDoc(attendanceDataDocRef, value); // setDocはdocメソッドとセットで使う
      const popupMessage = () => {
        if (dayOfWeek === 5) {
          return "おはようございます！今週も残り1日頑張りましょう！";
        } else {
          return "おはようございます！今日も１日頑張りましょう！";
        }
      };
      setIsPopupMessage(true);
      setPopupMessage(popupMessage);
      setIsClockInDisabled(value.isClockInDisabled);
    } catch (e) {
      console.log("error", e.message);
    }
  };
  // 退勤ボタンを押した時の処理
  const handleClockOut = async (e) => {
    e.preventDefault();
    try {
      const { attendanceDataDocRef } = await getAttendanceCollection();
      if (!attendanceDataDocRef.empty) {
        const value = {
          endTime: serverTimestamp(),
          isClockOutDisabled: true,
        };
        await setDoc(attendanceDataDocRef, value, { merge: true });
        const popupMessage = () => {
          if (dayOfWeek === 5) {
            return "お疲れさまでした！良い週末を！";
          } else {
            return "お疲れさまでした！";
          }
        };
        setIsClockOutDisabled(value.isClockOutDisabled);
        setIsPopupMessage(true);
        setPopupMessage(popupMessage);
      } else {
        console.log("対象のドキュメントが存在しません");
      }
    } catch (e) {
      console.log("退勤処理が実行できませんでした", e.message);
    }
  };

  const buttonStyle = (buttonColor) => ({
    variant: "contained",
    color: buttonColor,
    style: {
      fontSize: "1.3rem",
      padding: "4px 60px",
    },
  });

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        justifyContent={"center"}
        spacing={3}
        sx={{
          marginTop: "28px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleClockIn}
          color="primary"
          disabled={isClockInDisabled}
          style={{
            fontSize: "1.3rem",
            padding: "4px 60px",
          }}
          {...buttonStyle("primary")}
        >
          出 勤
        </Button>
        <Button
          variant="contained"
          onClick={handleClockOut}
          color="secondary"
          disabled={isClockOutDisabled}
          style={{
            fontSize: "1.3rem",
            padding: "4px 60px",
          }}
        >
          退 勤
        </Button>
      </Stack>
      {isPopupMessage ? <Snackbar popupMessage={popupMessage} /> : <></>}
    </>
  );
}
