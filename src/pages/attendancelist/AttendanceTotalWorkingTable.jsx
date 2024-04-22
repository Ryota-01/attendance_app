import React from "react";
import { workingHours } from "../../hooks/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function AttendanceTotalWorkingTable(props) {
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
      <TableContainer>
        <Table size="small" sx={{ width: "250px", margin:"20px 0" }}>
          <TableHead sx={{ background: "#383636" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>総稼働日数</TableCell>
              <TableCell sx={{ color: "white" }}>総稼働時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ textAlign:"center" }}>{workingDate.length}日</TableCell>
              <TableCell sx={{ textAlign:"center" }}>{calcTotalWorkingTime()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
