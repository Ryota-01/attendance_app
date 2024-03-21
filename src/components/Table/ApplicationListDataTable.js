import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { minWidth } from "@mui/system";

function ApplicationListDataTable(props) {
  const leaveRequestsData = props.leaveRequestsData;
  console.log(props)
  const { requestIds } = props;
  const columns = [
    // { field: "requestId", headerName: "申請ID" },
    { field: "leaveDate", headerName: "取得日" },
    { field: "applicantName", headerName: "申請者名" },
    { field: "status", headerName: "ステータス" },
    { field: "leaveType", headerName: "種別" },
    { field: "leaveReason", headerName: "申請理由" },
    { field: "remarks", headerName: "備考" },
  ];
  const tableCellStyles = {
    maxWidth: 150,
    minWidth: 50,
    wordBreak: "break-word",
  };
  return (
    <div>
      {/* PC用テーブル */}
      {leaveRequestsData !== undefined &&
      leaveRequestsData !== null &&
      leaveRequestsData.length > 0 ? (
        <TableContainer
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
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
              {leaveRequestsData.map((leaveRequest, index) => (
                <TableRow key={index}>
                  {/* <TableCell align="center">{requestIds}</TableCell> */}
                  <TableCell align="center" sx={tableCellStyles}>
                    {leaveRequest.leaveDate}
                  </TableCell>
                  <TableCell align="center"  sx={tableCellStyles}>
                    {leaveRequest.applicantName}
                  </TableCell>
                  <TableCell align="center" sx={tableCellStyles}>
                    {leaveRequest.status}
                  </TableCell>
                  <TableCell align="center" sx={tableCellStyles}>
                    {leaveRequest.leaveType}
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyles}>
                    {leaveRequest.leaveReason}
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyles}>
                    {leaveRequest.remarks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{ display: { xs: "none", sm: "flex", justifyContent: "center" } }}
          textAlign={"center"}
          padding={8}
        >
          申請中のデータはありません。
        </Typography>
      )}

      {/* SP用テーブル */}
      {leaveRequestsData !== undefined &&
      leaveRequestsData !== null &&
      leaveRequestsData.length > 0 ? (
        <TableContainer
          sx={{
            display: { xs: "flex", sm: "none" },
          }}
        >
          <Table
            size="small"
            sx={{ minWidth: 900 }}
            aria-label="customized table"
          >
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
              {leaveRequestsData.map((leaveRequest, index) => (
                <TableRow key={index}>
                  {/* <TableCell align="center">{requestIds}</TableCell> */}
                  <TableCell align="center">{leaveRequest.leaveDate}</TableCell>
                  <TableCell align="center">
                    {leaveRequest.applicantName}
                  </TableCell>
                  <TableCell align="center">{leaveRequest.leaveType}</TableCell>
                  <TableCell align="left">{leaveRequest.leaveReason}</TableCell>
                  <TableCell align="left">{leaveRequest.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{ display: { xs: "flex", sm: "none", justifyContent: "center" } }}
          textAlign={"center"}
          padding={8}
        >
          申請中のデータはありません。
        </Typography>
      )}
    </div>
  );
}

export default ApplicationListDataTable;
