import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDate } from "../../service/formatDate";

function AttendanceDataTable(props) {
  const { attendanceLists } = props;
  const currentYear = props.currentYear;
  const currentMonth = props.currentMonth;
  const [dates, setDates] = useState([]);
  const columns = [
    // { field: "edit", headerName: "", width: "16px" },
    { field: "date", headerName: "日付", width: "150px" },
    { field: "holiday", headerName: "休日", width: "100px" },
    { field: "startTime", headerName: "出勤時間" },
    { field: "endTime", headerName: "退勤時間" },
    // { field: "breakTime", headerName: "休憩時間" },
    { field: "workingTime", headerName: "稼働時間" },
    // { field: "remarks", headerName: "備考" },
  ];

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

  // 出勤・退勤時間を表示させるためのフォーマット
  function formatTimestamp(timestamp) {
    const dateObject = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const getHours = dateObject.getHours().toString().padStart(2, 0);
    const getMinutes = dateObject.getMinutes().toString().padStart(2, 0);
    const formattedDate = getHours + ":" + getMinutes;
    return formattedDate;
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

  console.log(parseInt("1:50"));

  // arrayの中の要素の合計を計算
  function totalOperatingTimeMinutes(array) {
    array.reduce((total, current) => {
      return current;
    }, 0);
  }
  // totalOperatingTimeMinutes(array);
  // const totalOperatingTimeMinutes  = array.reduce((total, current) => {
  //   return total + current;
  // }, 0)

  // 合計をフォーマット
  const totalOperatingTime = formattedOperatingTime(totalOperatingTimeMinutes);

  // const total = array.reduce((sum, element) => {
  //   const hours = Math.floor(element / 60);
  //   const remainingMinutes = Math.round(element % 60);
  //   console.log(hours, remainingMinutes);
  //   // return sum + element;
  // }, 0)

  return (
    <>
      {/* PC用テーブル */}
      {!props.isEmptyDocument ? (
        <>
          <TableContainer
            sx={{
              display: { sm: "flex" },
              marginTop: "24px",
              width: { xs: "100%" },
            }}
          >
            <Table size="small">
              <TableHead sx={{ background: "#383636" }}>
                <TableRow>
                  {columns.map((column) => (
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
                {dates.map((date) => {
                  const { attendanceFormattedDate, getDay, dayNames } =
                    formatDate(date);
                  return (
                    <TableRow autoHeight>
                      {/* <TableCell align="center">
                      <EditIcon sx={{ fontSize: "medium" }} />
                    </TableCell> */}
                      <TableCell align="center">
                        {attendanceFormattedDate}
                      </TableCell>
                      <TableCell align="center">
                        {dayNames[getDay] === "土" && (
                          <Typography variant="body2" sx={{ color: "blue" }}>
                            法定休日
                          </Typography>
                        )}
                        {dayNames[getDay] === "日" && (
                          <Typography variant="body2" sx={{ color: "red" }}>
                            所定休日
                          </Typography>
                        )}
                      </TableCell>
                      {attendanceLists.map((attendance) => {
                        if (
                          date.getDate() ===
                            attendance.date.toDate().getDate() &&
                          date.getMonth() + 1 ===
                            attendance.date.toDate().getMonth() + 1
                        ) {
                          return (
                            <>
                              {attendance.startTime ? (
                                <TableCell
                                  align="center"
                                  key={`startTime-${attendance.id}`}
                                >
                                  {formatTimestamp(attendance.startTime)}
                                </TableCell>
                              ) : (
                                <TableCell align="center">--</TableCell>
                              )}
                              {attendance.endTime ? (
                                <TableCell
                                  align="center"
                                  key={`endTime-${attendance.id}`}
                                >
                                  {formatTimestamp(attendance.endTime)}
                                </TableCell>
                              ) : (
                                <TableCell align="center">--</TableCell>
                              )}
                              <TableCell align="center">
                                {workingHours(
                                  attendance.startTime,
                                  attendance.endTime
                                )}
                              </TableCell>
                              {/* <TableCell align="center"></TableCell> */}
                            </>
                          );
                        } else {
                          return null;
                        }
                      })}
                      {attendanceLists.every(
                        (attendance) =>
                          date.getDate() !== attendance.date.toDate().getDate()
                      ) && (
                        <>
                          <TableCell align="center">--</TableCell>
                          <TableCell align="center">--</TableCell>
                          <TableCell align="center">--</TableCell>
                          {/* <TableCell align="center">--</TableCell> */}
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>ドキュメントが存在しません。</>
      )}
    </>
  );
}

export default AttendanceDataTable;
