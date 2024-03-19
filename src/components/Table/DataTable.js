import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";

function DataTable(props) {
  const { attendanceLists } = props;
  const [dates, setDates] = useState([]);
  const columns = [
    { field: "edit", headerName: "", width: "16px" },
    { field: "date", headerName: "日付", width: "130px" },
    { field: "dayOfWeek", headerName: "曜日", width: "72px" },
    { field: "holiday", headerName: "休日", width: "100px" },
    { field: "startTime", headerName: "出勤時間" },
    { field: "endTime", headerName: "退勤時間" },
    // { field: "breakTime", headerName: "休憩時間" },
    { field: "workingTime", headerName: "稼働時間" },
    { field: "remarks", headerName: "備考" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentMonthDay = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();
        const monthDates = [];
        for (let day = 1; day <= currentMonthDay; day++) {
          new Date(currentYear, currentMonth, day, 0, 0, 0, 0);
          monthDates.push(new Date(currentYear, currentMonth, day, 0, 0, 0));
        }
        setDates(monthDates);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // 出勤・退勤時間を表示させるためのフォーマット
  function formatTimestamp(timestamp) {
    const dateObject = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const getHours = dateObject.getHours();
    const getMinutes = dateObject.getMinutes();
    const formattedDate = getHours + ":" + getMinutes;
    return formattedDate;
  }

  // 日付のフォーマット
  function formattedDayOfWeek(date) {
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const getDay = date.getDay();
    const dayOfWeek = dayNames[getDay];
    return dayOfWeek;
    // const getMonth = date.getMonth() + 1;
    // const getDate = date.getDate();
    // const formattedDate = getMonth + "月" + getDate + "日";
    // return formattedDate;
  }
  // 日付のフォーマット
  function formattedDate(date) {
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate();
    const formattedDate = getMonth + "月" + getDate + "日";
    return formattedDate;
  }

  // function formatDate(timestamp) {
  //   const dateObject = timestamp.toDate();
  //   const getMonth = dateObject.getMonth() + 1;
  //   const getDate = dateObject.getDate();
  //   console.log(getMonth , getDate)
  // }
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
  return (
    <div>
      {/* PC用テーブル */}
      <TableContainer
        sx={{
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Table size="normal">
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
            {dates.map((date) => (
              <TableRow>
                <TableCell align="center">
                  <EditIcon sx={{ fontSize: "medium" }} />
                </TableCell>
                <TableCell align="center">{formattedDate(date)}</TableCell>
                <TableCell align="center">{formattedDayOfWeek(date)}</TableCell>
                <TableCell align="center">
                  {formattedDayOfWeek(date) === "土" ? (
                    <div style={{ color: "blue" }}>法定休日</div>
                  ) : (
                    <></>
                  )}
                  {formattedDayOfWeek(date) === "日" ? (
                    <div style={{ color: "red" }}>所定休日</div>
                  ) : (
                    <></>
                  )}
                </TableCell>
                {attendanceLists.map((attendance) => {
                  if (date.getDate() === attendance.date.toDate().getDate()) {
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
                          <TableCell align="center">-</TableCell>
                        )}
                        {attendance.endTime ? (
                          <TableCell
                            align="center"
                            key={`endTime-${attendance.id}`}
                          >
                            {formatTimestamp(attendance.endTime)}
                          </TableCell>
                        ) : (
                          <TableCell align="center">-</TableCell>
                        )}
                        <TableCell align="center">
                          {workingHours(
                            attendance.startTime,
                            attendance.endTime
                          )}
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </>
                    );
                  }
                  return null;
                })}
                {attendanceLists.every(
                  (attendance) =>
                    date.getDate() !== attendance.date.toDate().getDate()
                ) && (
                  <>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </>
                )}
              </TableRow>
            ))}
            {/* {attendanceLists.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {formatTimestamp(attendance.date)}
                </TableCell>
                <TableCell align="center">
                  {formatTimestamp(attendance.startTime)}
                </TableCell>
                {attendance.endTime ? (
                  <TableCell align="center">
                    {formatTimestamp(attendance.endTime)}
                  </TableCell>
                ) : (
                  <TableCell align="center">ー</TableCell>
                )}
                <TableCell align="center">1:00</TableCell>
                <TableCell align="center">
                  {workingHours(attendance.startTime, attendance.endTime)}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* SP用テーブル */}
      <TableContainer
        component={Paper}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <Table size="small">
          <TableHead sx={{ background: "#24292E" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell align="center" sx={{ color: "white" }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {attendanceLists.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <EditIcon sx={{ fontSize: "medium" }} />
                </TableCell>
                <TableCell align="center">{attendance.date}</TableCell>
                <TableCell align="center">
                  {formatTimestamp(attendance.startTime)}
                </TableCell>
                {attendance.endTime ? (
                  <TableCell align="center">
                    {formatTimestamp(attendance.endTime)}
                  </TableCell>
                ) : (
                  <TableCell align="center">ー</TableCell>
                )}
                <TableCell align="center">1:00</TableCell>
                <TableCell align="center">
                  {workingHours(attendance.startTime, attendance.endTime)}
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
