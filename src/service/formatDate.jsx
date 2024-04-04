import { Timestamp } from "firebase/firestore";
import React from "react";

// 日付のフォーマット
export function formatDate(props) {
  let dateObj = props;
  if (props instanceof Timestamp) {
    dateObj = props.toDate(); // ミリ秒に変換
  } else {
    dateObj = new Date(props); // ミリ秒に変換
  }
  const getYear = dateObj.getFullYear();
  const getMonth = dateObj.getMonth() + 1;
  const getDate = dateObj.getDate();
  const getDay = dateObj.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeek = dayNames[getDay];
  let formattedDate = {
    date: `${getYear}/${getMonth}/${getDate}(${dayOfWeek})`,
  };
  if (dayOfWeek === "土") {
    formattedDate.holidayType = "法定休日";
  }
  if (dayNames[getDay] === "日") {
    formattedDate.holidayType = "所定休日";
  }
  return formattedDate;
}

// 出勤・退勤時刻を表示させるためのフォーマット(AttendanceDataTable.jsx)
export function formatTimestamp(timestamp) {
  const dateObj = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const getHours = dateObj.getHours().toString().padStart(2, 0);
  const getMinutes = dateObj.getMinutes().toString().padStart(2, 0);
  const formattedDate = getHours + ":" + getMinutes;
  return formattedDate;
}

// 稼働時間を計算して表示させるフォーマット(AttendanceDataTable.jsx)
export function workingHours(startTime, endTime) {
  if (!endTime) {
    const currentTime = new Date();
    const diffInMillSeconds =
      currentTime.getTime() - startTime.toDate().getTime();
    const operatingTimeMinutes = diffInMillSeconds / (1000 * 60);
    return formattedOperatingTime(operatingTimeMinutes);
  } else {
    const diffInMillSeconds =
      endTime.toDate().getTime() - startTime.toDate().getTime();
    const operatingTimeMinutes = diffInMillSeconds / (1000 * 60);
    return formattedOperatingTime(operatingTimeMinutes);
  }

  function formattedOperatingTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    const formattedTime = `${hours}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }
}
