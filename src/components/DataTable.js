import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../css/DataTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DataTable(props) {
  const { attendanceLists } = props;
  console.log(attendanceLists);
  const columns = [
    { field: "id", headerName: "", width: 50 },
    { field: "date", headerName: "日付", width: 180 },
    { field: "startTime", headerName: "出勤時間", width: 110 },
    { field: "endTime", headerName: "退勤時間", width: 110 },
    { field: "breakTime", headerName: "休憩時間", width: 110 },
    { field: "remarks", headerName: "備考", width: 130 },
  ];
  const rows = attendanceLists.map((attendance, index) => ({
    id: index + 1,
    date: attendance.date,
    startTime: attendance.startTime,
    endTime: attendance.endTime || "ー",
    breakTime: "1:00",
    remarks: "",
  }));

  return (
    <div style={{ height: "100%", width: "90%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">日付</TableCell>
            <TableCell align="center">出勤時間</TableCell>
            <TableCell align="center">退勤時間</TableCell>
            <TableCell align="center">休憩時間</TableCell>
            <TableCell align="center">備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceLists.map((attendance, index) => (
            <TableRow key={index}>
              <TableCell align="center">{attendance.date}</TableCell>
              <TableCell align="center">{attendance.startTime}</TableCell>
              {attendance.endTime ? (
                <TableCell align="center">{attendance.endTime}</TableCell>
              ) : (
                <TableCell align="center">ー</TableCell>
              )}

              <TableCell align="center">1:00</TableCell>
              <TableCell align="center">{attendance.breakTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      /> */}
    </div>
  );
}

export default DataTable;
