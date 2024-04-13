import React from "react";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatDate } from "../../hooks/formatDate";
import { useApplicationDataContext } from "../../context/useApplicationDataContext";

function LeaveRequestComponentTable(props) {
  const { applicationsData } = useApplicationDataContext();
  const columns = [
    { field: "leaveDate", headerName: "取得日" },
    { field: "applicantName", headerName: "申請者名" },
    { field: "leaveType", headerName: "種別" },
    { field: "leaveReason", headerName: "申請理由" },
    { field: "remarks", headerName: "備考" },
  ];
  const styles = () => ({
    table: {
      size: "small",
    },
    tableContainer: {
      sx: {
        display: "flex",
        marginTop: "24px",
      },
    },
    tableHead: {
      sx: {
        background: "#BEE5EB",
      },
    },
    tableHeaderCell: {
      align: "center",
      color: "text.secondary",
    },
    tableCell: {
      align: "center",
      maxWidth: 150,
      minWidth: 50,
      wordBreak: "break-word",
    },
    typography: {
      sx: {
        display: "flex",
        justifyContent: "center",
      },
      textAlign: "center",
      padding: 8,
    },
  });

  return (
    <>
      {applicationsData !== undefined &&
      applicationsData !== null &&
      applicationsData.length > 0 ? (
        <>
          <TableContainer {...styles().tableContainer}>
            <Table {...styles().table}>
              <TableHead {...styles().tableHead}>
                <TableRow>
                  {columns.map((column, key) => (
                    <TableCell key={key} {...styles().tableHeaderCell}>
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {applicationsData.map((applicationData, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell {...styles().tableCell}>
                        {formatDate(applicationData.leaveDate).date}
                      </TableCell>
                      <TableCell {...styles().tableCell}>
                        {applicationData.applicantName}
                      </TableCell>
                      {/* <TableCell {...styles().tableCell}>
                        {applicationData.status}
                      </TableCell> */}
                      <TableCell {...styles().tableCell}>
                        {applicationData.leaveType}
                      </TableCell>
                      <TableCell align="left" {...styles().tableCell}>
                        {applicationData.leaveReason}
                      </TableCell>
                      <TableCell align="left" {...styles().tableCell}>
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
        <Typography {...styles().typography}>
          申請中のデータはありません。
        </Typography>
      )}
    </>
  );
}

export default LeaveRequestComponentTable;
