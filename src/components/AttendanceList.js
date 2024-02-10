import React, { useEffect, useState } from "react";

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

  console.log(attendanceList);
  return (
    <div>
      <h2>勤怠一覧</h2>
      {attendanceList && attendanceList.length > 0 ? (
        <table>
          <thead>
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
                <td>1:00</td>
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
