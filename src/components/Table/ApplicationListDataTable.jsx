import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useApplicationDataContext } from "../../context/useApplicationDataContext";
import { formatDate } from "../../service/formatDate";

function ApplicationListDataTable(props) {
  const { applicationsData } = useApplicationDataContext();
  // const { requestIds } = props;
  const columns = [
    // { field: "requestId", headerName: "申請ID" },
    { field: "leaveDate", headerName: "取得日" },
    { field: "applicantName", headerName: "申請者名" },
    // { field: "status", headerName: "ステータス" },
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
    <>
      {applicationsData !== undefined &&
      applicationsData !== null &&
      applicationsData.length > 0 ? (
        <>
          <TableContainer
            sx={{
              display: "flex",
              marginTop: "24px",
            }}
          >
            <Table size="small">
              <TableHead sx={{ background: "#BEE5EB" }}>
                <TableRow>
                  {columns.map((column, key) => (
                    <TableCell key={key} align="center" color="text.secondary">
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {applicationsData.map((applicationData, index) => {
                  const [formattedDate] = formatDate(applicationData.leaveDate);
                  return (
                    <TableRow key={index}>
                      {/* <TableCell align="center">{requestIds}</TableCell> */}
                      <TableCell align="center" sx={tableCellStyles}>
                        {formattedDate}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyles}>
                        {applicationData.applicantName}
                      </TableCell>
                      {/* <TableCell align="center" sx={tableCellStyles}>
                        {applicationData.status}
                      </TableCell> */}
                      <TableCell align="center" sx={tableCellStyles}>
                        {applicationData.leaveType}
                      </TableCell>
                      <TableCell align="left" sx={tableCellStyles}>
                        {applicationData.leaveReason}
                      </TableCell>
                      <TableCell align="left" sx={tableCellStyles}>
                        {applicationData.remarks}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          textAlign={"center"}
          padding={8}
        >
          申請中のデータはありません。
        </Typography>
      )}
    </>
  );
}

export default ApplicationListDataTable;
