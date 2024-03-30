import React from "react";

// 日付のフォーマット
export function formatDate(props) {
  const date = new Date(props);
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const getDay = date.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const formattedDate = `${getYear}/${getMonth}/${getDate}(${dayNames[getDay]})`;
  const attendanceFormattedDate = `${getMonth}/${getDate}(${dayNames[getDay]})`;
  return { formattedDate, attendanceFormattedDate, getDay, dayNames };
}
