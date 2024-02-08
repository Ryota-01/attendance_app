import React from 'react'
import { useState, useEffect } from 'react';
import '../css/AttendanceButton.css';

export default function AttendanceButton() {
  const [ clockInDisabled, setClockInDisabled ] = useState(false);
  const [ clockOutDisabled, setClockOutDisabled ] = useState(true);
  const [ currentDate, setCurrentDate ] = useState(getFormattedDate());


  useEffect(() => {
    const storedClockInTime = localStorage.getItem(`${currentDate}-clockIn`);
    const storedClockOutTime = localStorage.getItem(`${currentDate}-clockOut`);
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
    localStorage.setItem(`${currentDate}-clockIn`, currentTime);
    alert('出勤しました');
    setClockInDisabled(true); //出勤ボタンをdisabledに
    setClockOutDisabled(false); //出勤ボタンをdisabledに
  }

  //退勤ボタンが押されたときの処理
  const handleClockOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    localStorage.setItem(`${currentDate}-clockOut`, currentTime);
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

  return (
    <div className='attendanceButton'>
      <button className='inButton' onClick={handleClockIn} disabled={clockInDisabled}>出勤</button>
      <button className='outButton' onClick={handleClockOut} disabled={clockOutDisabled}>退勤</button>
    </div>
  )
}
