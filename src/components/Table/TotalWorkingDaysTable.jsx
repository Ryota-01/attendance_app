import React from "react";

export default function TotalWorkingDaysTable(props) {
  const { attendanceLists } = props;

  const array = [];
  for (let i = 0; i < attendanceLists.length; i++) {
    const newArrayData = {
      date: attendanceLists[i].date,
      stsrtTime: attendanceLists[i].startTime,
      endTime: attendanceLists[i].endTime,
    };
    array.push(newArrayData);
  }

  //稼働時間を計算
  function workingHours(startTime, endTime) {
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
  }

  function formattedOperatingTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    const formattedTime = `${hours}:${remainingMinutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

  console.log(array);

  return (
    <>
      <p>総稼働日数：{array.length}日</p>
      {/* <p>総稼働時間：{workingHours()}</p> */}
    </>
  );
}
