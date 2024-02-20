import React from "react";
import { useState, useEffect } from "react";
import "../css/AttendanceButton.css";
import AttendanceList from "../Pages/AttendanceList";

export default function AttendanceButton() {
  const [clockInDisabled, setClockInDisabled] = useState(false);
  const [clockOutDisabled, setClockOutDisabled] = useState(true);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [attendanceList, setAttendanceList] = useState([]);
  const breakTime = "1:00:00";

  //ローカルストレージから打刻時間のデータを取得
  const getDateFromLocalStorage = () => {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      data.push({ date: key, ...value });
    }
    return data;
  };

  //ローカルストレージからデータ取得
  const storageDate = JSON.parse(
    localStorage.getItem(`${currentDate}-attendance`)
  );

  useEffect(() => {
    // ローカルストレージがnullか判定
    if (storageDate != null && storageDate.clockIn) {
      setClockInDisabled(true);
      setClockOutDisabled(storageDate.clockOut);
    }
  }, []);

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const timer = setInterval(() => {
      const now = new Date();
      //日付が変わった瞬間にリセット
      if (now >= midnight && now < midnight + 1000) {
        if (now.getDate() !== new Date(currentDate).getDate()) {
          setClockInDisabled(false);
          setClockOutDisabled(true);
          setCurrentDate(getFormattedDate());
        }
      }
    }, 1000);
    // コンポーネントがアンマウントされた時にタイマーをクリア
    return () => clearInterval(timer);
  }, []);

  //出勤ボタンが押されたときの処理
  const handleClockIn = () => {
    const dateToday = new Date();
    const options = {
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };
    const formattedDateToday = dateToday
      .toLocaleDateString("ja-JP", options)
      .replace(/(.+曜日)$/, "($1)");
    console.log(formattedDateToday);
    const currentTime = new Date().toLocaleTimeString();
    //ローカルストレージにデータを保存フォーマット
    const dataToSave = {
      data: formattedDateToday,
      clockIn: currentTime,
    };
    //キーを日付、値をオブジェクトとして保存
    localStorage.setItem(
      `${currentDate}-attendance`,
      JSON.stringify(dataToSave)
    );
    alert("出勤しました");
    setClockInDisabled(true); //出勤ボタンをdisabledに
    setClockOutDisabled(false); //退勤ボタンdisabled解除
    // 出勤時にも更新されたデータを取得
    setAttendanceList(getDateFromLocalStorage());
  };

  //退勤ボタンが押されたときの処理
  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    if (storageDate && storageDate.clockIn) {
      storageDate.clockOut = currentTime;
      storageDate.breakTime = breakTime;
      localStorage.setItem(
        `${currentDate}-attendance`,
        JSON.stringify(storageDate)
      );
      alert("退勤しました。お疲れさまでした！");
      setClockOutDisabled(true); //退勤ボタンをdisabledに
      setAttendanceList(getDateFromLocalStorage());
    } else {
      alert("出勤時間が打刻されていません。");
    }
  };

  //日付のフォーマット
  function getFormattedDate() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <div className="attendanceButton">
        <button
          className="inButton"
          onClick={handleClockIn}
          disabled={clockInDisabled}
        >
          出勤
        </button>
        <button
          className="outButton"
          onClick={handleClockOut}
          disabled={clockOutDisabled}
        >
          退勤
        </button>
      </div>
    </div>
  );
}
