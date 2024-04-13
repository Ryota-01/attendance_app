import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { attendanceListTableColums } from "./AttendanceListTableColums";
import {
  formatDate,
  formatTimestamp,
  workingHours,
} from "../../hooks/formatDate";

function AttendanceListTable(props) {
  const { attendanceLists } = props;
  const { userData } = props;
  const currentYear = props.currentYear;
  const currentMonth = props.currentMonth;
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  // フォーマットした日付（カレンダー）
  const formattedDates = dates.map((date) => formatDate(date));

  const formattedAttendanceLists = attendanceLists.map((attendanceList) => {
    // カレンダーの日付と一致した場合に表示させる
    const formattedDate = formatDate(attendanceList.date);
    const formattedTime = {
      // ブラウザ表示用にフォーマットした出勤時刻
      startTime: formatTimestamp(attendanceList.startTime),
      // ブラウザ表示用にフォーマットした退勤時刻
      endTime: formatTimestamp(attendanceList.endTime),
      workingTime: workingHours(
        attendanceList.startTime,
        attendanceList.endTime
      ),
    };
    const formattedDateTime = { ...formattedDate, ...formattedTime };
    return formattedDateTime;
  });

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

  // PDFダウンロードページに遷移
  const handleOnClick = (e) => {
    e.preventDefault();
    navigate("/attendancelist/download", {
      state: {
        userData: userData,
        formattedDates: formattedDates,
        formattedAttendanceLists: formattedAttendanceLists,
        currentYear: currentYear,
        currentMonth: currentMonth,
      },
    });
  };

  const styles = {
    tableContainer: {
      display: { sm: "flex" },
      marginTop: "24px",
      width: { xs: "100%" },
    },
    tableCell: {
      align: "center",
    },
  };

  return (
    <>
      {/* PC用テーブル */}
      {!props.isEmptyDocument ? (
        <>
          <Button variant="outlined" onClick={handleOnClick}>
            PDF出力
          </Button>

          <TableContainer sx={styles.tableContainer}>
            <Table size="small">
              <TableHead sx={{ background: "#383636" }}>
                <TableRow>
                  {attendanceListTableColums.map((column) => (
                    <TableCell
                      {...styles.tableCell}
                      sx={{ color: "white", width: column.width }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedDates.map((formattedCalendarDate, index) => (
                  <TableRow autoHeight>
                    <TableCell {...styles.tableCell}>
                      {formattedCalendarDate.date}
                    </TableCell>
                    <TableCell {...styles.tableCell}>
                      {formattedCalendarDate.holidayType ? (
                        <>{formattedCalendarDate.holidayType}</>
                      ) : (
                        <>ー</>
                      )}
                    </TableCell>
                    <TableCell {...styles.tableCell}>
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.startTime}</>
                        ) : null
                      )}
                    </TableCell>
                    <TableCell {...styles.tableCell}>
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.endTime}</>
                        ) : null
                      )}
                    </TableCell>
                    <TableCell {...styles.tableCell}>
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.workingTime}</>
                        ) : null
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box sx={{ padding: "18px 0" }}>
          <Typography variant="body1" textAlign={"center"}>
            勤怠実績が存在しません。
          </Typography>
        </Box>
      )}
    </>
  );
}

export default AttendanceListTable;
