import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  formatDate,
  formatTimestamp,
  workingHours,
  formatAttedanceDate,
} from "../../service/formatDate";
import { attendanceDataTableColumns } from "../ColumnsData/ColumnsData";
import { useNavigate } from "react-router-dom";

function AttendanceDataTable(props) {
  const { attendanceLists } = props;
  const { userData } = props;
  const currentYear = props.currentYear;
  const currentMonth = props.currentMonth;
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();

  // フォーマットした日付（カレンダー）
  const formattedDates = dates.map((date) => formatDate(date)[1]);
  const dayOfWeek = dates.map((date) => formatDate(date)[2]);

  const formattedAttendanceLists = attendanceLists.map((attendanceList) => {
    const formattedDate = formatAttedanceDate(attendanceList.date.seconds)[1];
    // ブラウザ表示用にフォーマットした出勤時刻
    const formattedStartTime = formatTimestamp(attendanceList.startTime);
    let formattedEndTime = null;
    if (attendanceList.endTime) {
      // ブラウザ表示用にフォーマットした退勤時刻
      formattedEndTime = formatTimestamp(attendanceList.endTime);
    }
    return {
      formattedDate,
      formattedStartTime,
      formattedEndTime,
    };
  });

  const styles = {
    tableContainer: {
      display: { sm: "flex" },
      marginTop: "24px",
      width: { xs: "100%" },
    },
  };

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
                  {attendanceDataTableColumns.map((column) => (
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
                {formattedDates.map((formattedCalendarDate, index) => (
                  <TableRow autoHeight>
                    <TableCell align="center">
                      {formattedCalendarDate}
                    </TableCell>
                    <TableCell align="center">
                      {dayOfWeek[index] === "土" && (
                        <Typography variant="body2" sx={{ color: "blue" }}>
                          法定休日
                        </Typography>
                      )}
                      {dayOfWeek[index] === "日" && (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          所定休日
                        </Typography>
                      )}
                    </TableCell>
                    {formattedAttendanceLists.map((attendanceList) => {
                      if (
                        formattedCalendarDate === attendanceList.formattedDate
                      ) {
                        return (
                          <>
                            <TableCell align="center">
                              {attendanceList.formattedStartTime}
                            </TableCell>
                            <TableCell align="center">
                              {attendanceList.formattedEndTime}
                            </TableCell>
                            <TableCell align="center">
                              {attendanceList.formattedStartTime ||
                                (attendanceList.formattedEndTime &&
                                  workingHours(
                                    attendanceList.formattedStartTime,
                                    attendanceList.formattedEndTime
                                  ))}
                            </TableCell>
                          </>
                        );
                      }
                      return null;
                    })}
                    {/* カレンダーの日付と一致しない場合はここで "-- : --" を表示 */}
                    {formattedAttendanceLists.every(
                      (attendanceList) =>
                        attendanceList.formattedDate !== formattedCalendarDate
                    ) && (
                      <>
                        <TableCell align="center">-- : --</TableCell>
                        <TableCell align="center">-- : --</TableCell>
                        <TableCell align="center">-- : --</TableCell>
                      </>
                    )}
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

export default AttendanceDataTable;