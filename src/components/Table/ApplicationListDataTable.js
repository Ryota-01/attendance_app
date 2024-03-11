import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

function ApplicationListDataTable(props) {
  const { leaveRequests } = props;
  const { requestIds } = props;
  console.log(requestIds);
  const columns = [
    // { field: "requestId", headerName: "申請ID" },
    { field: "date", headerName: "取得日" },
    { field: "status", headerName: "ステータス" },
    { field: "status", headerName: "種別" },
    { field: "reason", headerName: "事由" },
  ];
  return (
    <div>
      <Card sx={{ width: "80%", margin: "auto" }}>
        {/* PC用テーブル */}
        <TableContainer
          // component={Paper}
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Table>
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
              {leaveRequests.map((leaveRequest, index) => (
                <TableRow key={index}>
                  {/* <TableCell align="center">{requestIds}</TableCell> */}
                  <TableCell align="center">{leaveRequest.startDate}</TableCell>
                  <TableCell align="center">{leaveRequest.status}</TableCell>
                  <TableCell align="center">{leaveRequest.type}</TableCell>
                  <TableCell align="left">{leaveRequest.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card>
        {/* SP用テーブル */}
        <TableContainer
          // component={Paper}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <Table>
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
              {leaveRequests.map((leaveRequest, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{leaveRequest.startDate}</TableCell>
                  <TableCell align="center">{leaveRequest.status}</TableCell>
                  <TableCell align="center">{leaveRequest.type}</TableCell>
                  <TableCell align="left">{leaveRequest.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default ApplicationListDataTable;
