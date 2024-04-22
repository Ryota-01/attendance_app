import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { formatDate } from "../../hooks/formatDate";
import { useApplicationDataContext } from "../../context/useApplicationDataContext";

function LeaveRequestComponentTable() {
  const { applicationsData } = useApplicationDataContext();
  console.log(applicationsData);
  const columns = [
    { field: "leaveDate", headerName: "取得日" },
    { field: "applicantName", headerName: "申請者名" },
    { field: "leaveType", headerName: "種別" },
    { field: "leaveReason", headerName: "申請理由" },
    { field: "remarks", headerName: "備考" },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.black,
      textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSiz: 14,
      textAlign: "center",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td , &:last-child th": {
      border: 0,
    },
  }));
  const styles = () => ({
    table: {
      sx: {
        minWidth: 650,
      },
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
              <TableHead>
                <TableRow>
                  {columns.map((column, key) => (
                    <StyledTableCell key={key}>
                      {column.headerName}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {applicationsData.map((applicationData, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        {formatDate(applicationData.leaveDate).date}
                      </StyledTableCell>
                      <StyledTableCell>
                        {applicationData.applicantName}
                      </StyledTableCell>
                      <StyledTableCell>
                        {applicationData.leaveType}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {applicationData.leaveReason}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {applicationData.remarks}
                      </StyledTableCell>
                    </StyledTableRow>
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
