import { React, useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Button, Stack } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import Snackbar from "../../components/Snackbar";

export default function AttendanceComponentButton() {
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
  const currentMonth = d.getMonth() + 1;
  const today = d.getDate();
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
      console.error("error", e.message);
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
      console.error("退勤処理が実行できませんでした", e.message);
    }
  };

  const styles = (buttonColor, disabled) => ({
    stackStyle: {
      direction: { xs: "column", sm: "row", md: "row" },
      justifyContent: "center",
      spacing: 3,
    },
    buttonStyle: {
      variant: "contained",
      color: buttonColor,
      disabled: disabled,
      sx: {
        fontSize: "1.3rem",
        padding: "4px 60px",
      },
    },
  });

  return (
    <>
      <Stack {...styles().stackStyle} padding={"24px"}>
        <Button
          onClick={handleClockIn}
          {...styles("primary", isClockInDisabled).buttonStyle}
        >
          出 勤
        </Button>
        <Button
          onClick={handleClockOut}
          {...styles("secondary", isClockOutDisabled).buttonStyle}
        >
          退 勤
        </Button>
      </Stack>
      {isPopupMessage ? <Snackbar popupMessage={popupMessage} /> : <></>}
    </>
  );
}
