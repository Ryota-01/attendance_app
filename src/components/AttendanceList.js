import React, { useEffect, useState } from "react";
import "../css/AttendanceList.css";

export default function AttendanceList() {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
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
    const dateFromLocalStorage = getDateFromLocalStorage();
    setAttendanceList(dateFromLocalStorage);
  }, []);

  //労働時間を関数する処理
  function calWorkingHours(clockIn, clockOut, breakTime) {
    const startTime = new Date(`2000-01-01 ${clockIn}`);
    const endTime = new Date(`2000-01-01 ${clockOut}`);
    const breakTimeDate = new Date(`2000-01-01 ${breakTime}`); //breakTimeは1:00:00
    const diffInMilliseconds = (endTime - startTime) - breakTime + 1000;

    const positiveDiffInMilliSeconds = Math.max(diffInMilliseconds, 0);

    const hours = Math.floor(positiveDiffInMilliSeconds / (1000 * 60 * 60));
    const minutes = Math.floor((positiveDiffInMilliSeconds % (1000 * 60 * 60)) / (1000 * 60));
    
    //0埋めして2桁にする
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div className="attendanceList_wrapper">
      <h2 className="attendanceList_head">勤怠一覧</h2>
      <div className="attendanceMonth">
        <span className="lastMonth">◀︎ 前月</span>
        <span className="currentMonth">2024年2月</span>
        <span className="nextMonth">次月 ▶︎</span>
      </div>
      <table className="attendanceTotal_table">
        <thead>
          <tr>
            <th>総労働時間</th>
            <th>所定労働時間</th>
            <th>総労働日数</th>
            <th>所定労働日数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100:00</td>
            <td>100:00</td>
            <td>20</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
      {attendanceList && attendanceList.length > 0 ? (
        <table className="attendanceList_table">
          <thead className="thead">
            <tr>
              <th>日付</th>
              <th>出勤時刻</th>
              <th>退勤時刻</th>
              <th>休憩</th>
              <th>稼働時間</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((data, index) => (
              <tr key={index}>
                <td>{data.data}</td>
                <td>{data.clockIn}</td>
                <td>{data.clockOut}</td>
                <td>{data.breakTime}</td>
                <td>{calWorkingHours(data.clockIn, data.clockOut, data.breakTime)}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>勤怠データはありません</p>
      )}
    </div>
  );
}
