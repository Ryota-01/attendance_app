import React from 'react'
import { useState } from 'react'
import { Button } from "@mui/material"
import styled from "@emotion/styled"

export default function AttendanceInput() {
  const [ clockInTime, setClockInTime ] = useState(null);
  const [ clockOutTime, setClockOutTime ] = useState(null);

  const handleClockIn = () => {
    //出勤を処理するロジック
    const currentTime = new Date().toLocaleTimeString();
    setClockInTime(currentTime);
  };

  const handleClockOut = () => {
    //退勤を処理するロジック
    const currentTime = new Date().toLocaleTimeString();
    setClockOutTime(currentTime);
  }

  const workingTime = () => {
    if(clockInTime && clockOutTime) {
      const startTime = new Date(`January 1, 2024 ${clockInTime}`);
      const endTime = new Date(`January 1, 2024 ${clockOutTime}`);

      //分単位での差を計算
      const timeDiffInMinutes = Math.floor((endTime - startTime) / (1000 * 60));
      return `${timeDiffInMinutes} 分`;
    } else {
      return 'ーー';
    }
  }

  return (
    <>
     <div>出勤時間：{clockInTime || "ーー"}</div>
     <Button variant="contained" onClick={handleClockIn}>出勤</Button>

     <div>退勤時間：{clockOutTime || "ーー"}</div>
     <Button variant="contained" onClick={handleClockOut}>退勤</Button>
     
     <div>稼働時間：{workingTime()}</div>
     <div>備考</div>
    </>
  )
}
