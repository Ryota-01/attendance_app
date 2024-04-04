import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  formatDate,
  formatTimestamp,
  workingHours,
  formatAttedanceDate,
} from "../../service/formatDate";
import { attendanceDataTableColumns } from "../ColumnsData/ColumnsData";
import { useNavigate } from "react-router-dom";

function AttendanceDataTable(props) {
  const { attendanceLists } = props;
  const { userData } = props;
  const currentYear = props.currentYear;
  const currentMonth = props.currentMonth;
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  // フォーマットした日付（カレンダー）
  const formattedDates = dates.map((date) => formatDate(date));

  const formattedAttendanceLists = attendanceLists.map((attendanceList) => {
    // カレンダーの日付と一致した場合に表示させる
    const formattedDate = formatDate(attendanceList.date);
    const formattedTime = {
      // ブラウザ表示用にフォーマットした出勤時刻
      startTime: formatTimestamp(attendanceList.startTime),
      // ブラウザ表示用にフォーマットした退勤時刻
      endTime: formatTimestamp(attendanceList.endTime),
      workingTime: workingHours(attendanceList.startTime, attendanceList.endTime)
    };
    const formattedDateTime = { ...formattedDate, ...formattedTime };
    return formattedDateTime;
  });

  // 空の配列を用意
  // const workingDates = [];
  // for (let i = 0; i < attendanceLists.length; i++) {
  //   const newArrayData = {
  //     date: attendanceLists[i].date,
  //     startTime: attendanceLists[i].startTime,
  //     endTime: attendanceLists[i].endTime,
  //   };
  //   formattedAttendanceLists.push(newArrayData);
  // }


  const formatWorkingTimes = [];
  // const workingDate = formattedAttendanceLists.map((value) => {
  //   const startTime = value.startTime;
  //   const endTime = value.endTime;
  //   console.log(endTime)
  //   formatWorkingTimes.push(workingHours(startTime, endTime));
  // });

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

  const styles = {
    tableContainer: {
      display: { sm: "flex" },
      marginTop: "24px",
      width: { xs: "100%" },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentMonthDay = new Date(
          currentYear,
          currentMonth,
          0
        ).getDate();
        const monthDates = [];
        for (let day = 1; day <= currentMonthDay; day++) {
          monthDates.push(
            new Date(currentYear, currentMonth - 1, day, 0, 0, 0)
          );
        }
        setDates(monthDates);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [currentMonth, currentYear]);

  // PDFダウンロードページに遷移
  const handleOnClick = (e) => {
    e.preventDefault();
    navigate("/attendancelist/download", {
      state: {
        userData: userData,
        formattedDates: formattedDates,
        formattedAttendanceLists: formattedAttendanceLists,
        currentYear: currentYear,
        currentMonth: currentMonth,
      },
    });
  };

  return (
    <>
      {/* PC用テーブル */}

      {!props.isEmptyDocument ? (
        <>
          <Button variant="outlined" onClick={handleOnClick}>
            PDF出力
          </Button>

          <TableContainer sx={styles.tableContainer}>
            <Table size="small">
              <TableHead sx={{ background: "#383636" }}>
                <TableRow>
                  {attendanceDataTableColumns.map((column) => (
                    <TableCell
                      align="center"
                      sx={{ color: "white", width: column.width }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedDates.map((formattedCalendarDate, index) => (
                  <TableRow autoHeight>
                    <TableCell align="center">
                      {formattedCalendarDate.date}
                    </TableCell>
                    <TableCell align="center">
                      {formattedCalendarDate.holidayType ? (
                        <>{formattedCalendarDate.holidayType}</>
                      ) : (
                        <>ー</>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.startTime}</>
                        ) : (
                          null
                        )
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.endTime}</>
                        ) : (
                          null
                        )
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.workingTime}</>
                        ) : (
                          null
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box sx={{ padding: "18px 0" }}>
          <Typography variant="body1" textAlign={"center"}>
            勤怠実績が存在しません。
          </Typography>
        </Box>
      )}
    </>
  );
}

export default AttendanceDataTable;
