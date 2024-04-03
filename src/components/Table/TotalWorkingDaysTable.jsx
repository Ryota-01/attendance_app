import React, { useState } from "react";
import { workingHours } from "../../service/formatDate";

export default function TotalWorkingDaysTable(props) {
  const { attendanceLists } = props;

  // 稼働の日数
  // 空の配列を用意
  const workingDates = [];
  for (let i = 0; i < attendanceLists.length; i++) {
    const newArrayData = {
      date: attendanceLists[i].date,
      startTime: attendanceLists[i].startTime,
      endTime: attendanceLists[i].endTime,
    };
    workingDates.push(newArrayData);
  }

  const formatWorkingTimes = [];
  const workingDate = workingDates.map((value) => {
    const startTime = value.startTime;
    const endTime = value.endTime;
    formatWorkingTimes.push(workingHours(startTime, endTime));
  });

  //1ヶ月の総労働時間を計算
  function calcTotalWorkingTime() {
    // 合計時間と合計分を初期化
    let totalHours = 0;
    let totalMinutes = 0;
    formatWorkingTimes.forEach((time) => {
      const [hours, minutes] = time.split(":");
      totalHours += parseInt(hours);
      totalMinutes += parseInt(minutes);
    });
    // 合計時間と合計分を正規化
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
    // 合計時間をフォーマットして表示
    const formattedTotalTime = `${totalHours}:${totalMinutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTotalTime;
  }

  return (
    <>
      <p>総稼働日数：{workingDate.length}日</p>
      <p>総稼働時間：{calcTotalWorkingTime()}</p>
    </>
  );
}
