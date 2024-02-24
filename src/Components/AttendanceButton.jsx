import React from "react";
import { useState, useEffect } from "react";
import AttendanceList from "../Pages/AttendanceList";

export default function AttendanceButton() {
  const [clockInDisabled, setClockInDisabled] = useState(false);
  const [clockOutDisabled, setClockOutDisabled] = useState(true);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [attendanceList, setAttendanceList] = useState([]);
  const [data, setData] = useState([]);

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
        <form action="">
          <button
            className="inButton"
            // onClick={handleClockIn}
            disabled={clockInDisabled}
          >
            出勤
          </button>
          <button
            className="outButton"
            // onClick={handleClockOut}
            disabled={clockOutDisabled}
          >
            退勤
          </button>
        </form>
      </div>
    </div>
  );
}
