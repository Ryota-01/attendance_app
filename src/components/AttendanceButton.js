import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { collection, setDoc, doc, getDocs, getDoc, serverTimestamp } from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../css/AttendanceButton.css";
import Snackbar from "./Snackbar/Snackbar.js";

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
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();
  const currentYearAndMonth = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, 0)}`;
  const currentMonthAndDate = `${currentMonth.toString().padStart(2, 0)}-${today
    .toString()
    .padStart(2, 0)}`;
  const dayOfWeek = d.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const getHours = d.getHours();
  const getMinutes = d.getMinutes();

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
        const attendanceCollectionRef = collection(db, "attendance");
        const userDocRef = doc(attendanceCollectionRef, user.uid);
        const subCollectionRef = collection(userDocRef, currentYearAndMonth);
        const userDoc = doc(subCollectionRef, currentMonthAndDate);
        const userDocSnapshot = await getDoc(userDoc);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
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
    // attendanceコレクションを参照（基本）
    const attendanceCollectionRef = collection(db, "attendance");
    //（setDocを使う場合）ドキュメントのIDを指定
    // docメソッドは指定されたコレクション内のドキュメント参照するメソッド。
    // ドキュメントが存在しない場合でも参照を取得する。この参照を使用して新しいドキュメントを作成することができる。getDocでも参照ができる。
    const userDocRef = doc(attendanceCollectionRef, user.uid);
    //サブコレクションが存在しているかチェック。
    const subCollectionRef = collection(userDocRef, currentYearAndMonth);
    const subCollectionDoc = await getDocs(subCollectionRef);
    return { subCollectionRef, subCollectionDoc };
  };

  // 出勤ボタンを押した時の処理
  const handleClockIn = async (e) => {
    e.preventDefault();
    try {
      const { subCollectionRef, subCollectionDoc } =
        await getAttendanceCollection();
      const value = {
        userID: user.uid,
        date: `${currentYear}年${currentMonth}月${today}日(${dayNames[dayOfWeek]})`,
        startTime: serverTimestamp(),
        isClockInDisabled: true,
      };
      //ドキュメントを作成または更新
      const userDoc = doc(subCollectionRef, currentMonthAndDate);
      await setDoc(userDoc, value); // setDocはdocメソッドとセットで使う
      const popupMessage = () => {
        if (dayOfWeek === 5) {
          return "おはようございます！今週も残り1日頑張りましょう！";
        } if(dayOfWeek === 0 || 6) {
          return `${dayNames[dayOfWeek]}曜出勤お疲れさまです・・！`;
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
      const { subCollectionRef, subCollectionDoc } =
        await getAttendanceCollection();
      if (!subCollectionDoc.empty) {
        const userDoc = doc(subCollectionRef, currentMonthAndDate);
        const value = {
          endTime: serverTimestamp(),
          isClockOutDisabled: true,
        };
        await setDoc(userDoc, value, { merge: true });
        const popupMessage = () => {
          if (dayOfWeek === 5) {
            return "お疲れさまでした！良い週末を！";
          } if(dayOfWeek === 0 || 6) {
            return `${dayNames[dayOfWeek]}曜出勤お疲れさまでした。代休取ってくださいね。`
          } else {
            return "お疲れさまでした！ゆっくり休んでくださいね！";
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
  return (
    <>
      <div className="attendanceBtnWrapper">
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            onClick={handleClockIn}
            color="primary"
            disabled={isClockInDisabled}
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
            disabled={isClockOutDisabled}
            style={{
              fontSize: "1.3rem",
              padding: "4px 60px",
            }}
          >
            退 勤
          </Button>
        </Stack>
      </div>
      {isPopupMessage ? (
        <Snackbar popupMessage={popupMessage} />
      ) : (
        <></>
      )}
    </>
  );
}
