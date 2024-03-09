import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';

function DataTable(props) {
  const { attendanceLists } = props;
  const columns = [
    { field: "edit", headerName: ""},
    { field: "date", headerName: "日付"},
    { field: "startTime", headerName: "出勤時間"},
    { field: "endTime", headerName: "退勤時間"},
    { field: "breakTime", headerName: "休憩時間"},
    { field: "breakTime", headerName: "稼働時間"},
  ];
  return (
    <div>
      {/* PC用テーブル */}
      <TableContainer
        component={Paper}
        sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
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
                <TableCell align="center"><EditIcon sx={{ fontSize: "medium" }} /></TableCell>
                <TableCell align="center">{attendance.date}</TableCell>
                <TableCell align="center">{attendance.startTime}</TableCell>
                {attendance.endTime ? (
                  <TableCell align="center">{attendance.endTime}</TableCell>
                ) : (
                  <TableCell align="center">ー</TableCell>
                )}
                <TableCell align="center">1:00</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
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
            {attendanceLists.map((attendance, index) => (
              <TableRow key={index}>
                <TableCell align="center"><EditIcon sx={{ fontSize: "medium" }} /></TableCell>
                <TableCell align="center">{attendance.date}</TableCell>
                <TableCell align="center">{attendance.startTime}</TableCell>
                {attendance.endTime ? (
                  <TableCell align="center">{attendance.endTime}</TableCell>
                ) : (
                  <TableCell align="center">ー</TableCell>
                )}
                <TableCell align="center">1:00</TableCell>
                <TableCell align="center">{attendance.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
