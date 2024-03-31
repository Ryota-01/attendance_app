import React from "react";

// 日付のフォーマット
export function formatDate(props) {
  const date = new Date(props);
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const getDay = date.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeek = dayNames[getDay];
  const formattedDate = `${getYear}/${getMonth}/${getDate}(${dayNames[getDay]})`;
  const attendanceFormattedDate = `${getMonth}/${getDate}(${dayNames[getDay]})`;
  return [formattedDate, attendanceFormattedDate, dayOfWeek];
}

// 日付のフォーマット
export function formatAttedanceDate(props) {
  const millSeconds = props  * 1000 // ミリ秒に変換
  const date = new Date(millSeconds);
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const getDay = date.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeek = dayNames[getDay];
  const formattedDate = `${getYear}/${getMonth}/${getDate}(${dayNames[getDay]})`;
  const attendanceFormattedDate = `${getMonth}/${getDate}(${dayNames[getDay]})`;
  return [formattedDate, attendanceFormattedDate, dayOfWeek];
}
// 出勤・退勤時刻を表示させるためのフォーマット(AttendanceDataTable.jsx)
export function formatTimestamp(timestamp) {
  const dateObject = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const getHours = dateObject.getHours().toString().padStart(2, 0);
  const getMinutes = dateObject.getMinutes().toString().padStart(2, 0);
  const formattedDate = getHours + ":" + getMinutes;
  return formattedDate;
}

// 稼働時間を計算して表示させるフォーマット(AttendanceDataTable.jsx)
export function workingHours(startTime, endTime) {
  if (!endTime) {
    const currentTime = new Date();
    const diffInMillSeconds = currentTime.getTime() - startTime.toMillis();
    const operatingTimeMinutes = diffInMillSeconds / (1000 * 60);
    return formattedOperatingTime(operatingTimeMinutes);
  } else {
    const diffInMillSeconds = endTime.toMillis() - startTime.toMillis();
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
