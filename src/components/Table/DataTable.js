import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";

function DataTable(props) {
  const { attendanceLists } = props;
  const columns = [
    { field: "edit", headerName: "" },
    { field: "date", headerName: "日付" },
    { field: "startTime", headerName: "出勤時間" },
    { field: "endTime", headerName: "退勤時間" },
    { field: "breakTime", headerName: "休憩時間" },
    { field: "workingTime", headerName: "稼働時間" },
    { field: "remarks", headerName: "備考" },
  ];

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
  //稼働時間を計算
  function workingHours(startTime, endTime) {
    const diffInMillSeconds = endTime.toMillis() - startTime.toMillis();
    console.log(diffInMillSeconds);
    const operatingTimeMinutes = diffInMillSeconds / (1000 * 60) - 60;
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
  return (
    <div>
      <Card sx={{ width: "80%", margin: "auto" }}>
        {/* PC用テーブル */}
        <TableContainer
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Table size="normal">
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
              {attendanceLists.map((attendance, index) => (
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
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

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
            {attendanceLists.map((attendance, index) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
