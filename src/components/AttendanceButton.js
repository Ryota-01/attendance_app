import React from 'react'
import { useState, useEffect } from 'react';
import '../css/AttendanceButton.css';

export default function AttendanceButton() {
  const [ clockInDisabled, setClockInDisabled ] = useState(false);
  const [ clockOutDisabled, setClockOutDisabled ] = useState(true);
  const [ currentDate, setCurrentDate ] = useState(getFormattedDate());
  const [ attendanceList, setAttendanceList ] = useState([]);

  //ローカルストレージから打刻時間のデータを取得
  const getDateFromLocalStorage = () => {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      data.push({ date : key, ...value });
    }
    return data;
  }

  useEffect(() => {
    const dateFromLocalStorage = getDateFromLocalStorage();
    const storedClockInTime = localStorage.getItem(`${currentDate}-clockIn`);
    const parsedClockInTime = storedClockInTime ? JSON.parse(storedClockInTime):null;
    const storedClockOutTime = localStorage.getItem(`${currentDate}-clockOut`);
    setAttendanceList(dateFromLocalStorage);
    setClockInDisabled(!!storedClockInTime);
    setClockOutDisabled(!!storedClockOutTime);
  }, [currentDate]);

  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const timer = setInterval(() => {
      const now = new Date();
      if(now >= midnight && now < midnight + 1000) {
        //日付が変わった瞬間にリセット
        setClockInDisabled(false);
        setClockOutDisabled(true);
        setCurrentDate(getFormattedDate());
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //出勤ボタンが押されたときの処理
  const handleClockIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    localStorage.setItem(`${currentDate}-clockIn`, JSON.stringify({clockIn : currentTime}));
    alert('出勤しました');
    setClockInDisabled(true); //出勤ボタンをdisabledに
    setClockOutDisabled(false); //出勤ボタンをdisabledに
  }

  //退勤ボタンが押されたときの処理
  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    localStorage.setItem(`${currentDate}-clockOut`, JSON.stringify({clockOut : currentTime}));
    alert('退勤しました。お疲れさまでした！');
    setClockOutDisabled(true); //退勤ボタンをdisabledに
  }

  //日付のフォーマット
  function getFormattedDate() {
    const d = new Date();
    console.log(d);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  }


  const AttendanceList = () => {
    return (
      <div>
        <h2>勤怠一覧</h2>
        <ul>
          {attendanceList.map((data) => (
            <li key={data.date}>
              {data.date} - 出勤打刻：{data.clockIn}　／　退勤打刻：{data.clockOut}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <div className='attendanceButton'>
        <button className='inButton' onClick={handleClockIn} disabled={clockInDisabled}>出勤</button>
        <button className='outButton' onClick={handleClockOut} disabled={clockOutDisabled}>退勤</button>
      </div>
      <div>
        <AttendanceList />
      </div>
    </div>

  )
}
