import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Stack,
  styled,
} from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { attendanceListTableColums } from "./AttendanceListTableColums";
import {
  formatDate,
  formatTimestamp,
  workingHours,
} from "../../hooks/formatDate";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import AttendanceTotalWorkingTable from "./AttendanceTotalWorkingTable";

function AttendanceListTable(props) {
  const [attendanceLists, setAttendanceLists] = useState([]);
  const [isEmptyDocument, setIsEmptyDocument] = useState(false);
  const [dates, setDates] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [disabled, setDisabled] = useState(
    currentYear === new Date().getFullYear() &&
    currentMonth === new Date().getMonth() + 1
  );
  const { userData } = props;
  const navigate = useNavigate();
  const { user } = useAuthContext();

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
    const fetchAttendanceData = async () => {
      try {
        // userコレクションを取得
        const userCollectionRef = collection(db, user.uid);
        // 年月のサブコレクションのドキュメント(勤怠データ)を取得
        const attendanceSubCollectionRef = collection(
          doc(userCollectionRef, "attendance"),
          `${currentYear}-${currentMonth}`
        );
        const subCollectionSnapshot = await getDocs(attendanceSubCollectionRef);
        if (!subCollectionSnapshot.empty) {
          const data = subCollectionSnapshot.docs.map((doc) => doc.data());
          setAttendanceLists(data);
        } else {
          setAttendanceLists([]);
          console.log("勤怠データが存在しません");
        }
      } catch (e) {
        console.error("データの取得中にエラーが発生しました", e.message);
      }
    };
    fetchData();
    fetchAttendanceData();
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

  // 前月の勤怠情報
  const handleLastMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setDisabled(false);
  };

  // 翌月の勤怠情報
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
      if (
        // 左辺と右辺が同じ年月ならtrue
        currentYear === new Date().getFullYear() &&
        currentMonth === new Date().getMonth()
      ) {
        setDisabled(true);
      }
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
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

  const styles = {
    tableContainer: {},
    subTitle: {
      variant: "body5",
      color: "text.secondary",
    },
  };

  return (
    <>
      {/* PC用テーブル */}
      {!props.isEmptyDocument ? (
        <>
          <Stack direction="row" spacing={2} justifyContent={"space-between"}>
            <Box></Box>
            <Box sx={{ margin: "0 auto" }}>
              <IconButton onClick={handleLastMonth}>
                <KeyboardArrowLeft />
              </IconButton>
              <Typography {...styles.subTitle}>
                {`${currentYear}年${currentMonth}月`}
              </Typography>
              <IconButton onClick={handleNextMonth} disabled={disabled}>
                <KeyboardArrowRight />
              </IconButton>
            </Box>
            <Box>
              <Button variant="outlined" size="small" onClick={handleOnClick}>
                PDF出力
              </Button>
            </Box>
          </Stack>
          <AttendanceTotalWorkingTable attendanceLists={attendanceLists} />
          <TableContainer sx={{ marginTop: "8px" }}>
            <Table size="small" sx={{ minWidth: 500 }}>
              <TableHead sx={{ background: "#383636" }}>
                <TableRow>
                  {attendanceListTableColums.map((column) => (
                    <StyledTableCell
                      {...styles.tableCell}
                      sx={{ color: "white", width: column.width }}
                    >
                      {column.headerName}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedDates.map((formattedCalendarDate, index) => (
                  <StyledTableRow autoHeight>
                    <StyledTableCell {...styles.tableCell}>
                      {formattedCalendarDate.date}
                    </StyledTableCell>
                    <StyledTableCell {...styles.tableCell}>
                      {formattedCalendarDate.holidayType ? (
                        <>{formattedCalendarDate.holidayType}</>
                      ) : (
                        <>ー</>
                      )}
                    </StyledTableCell>
                    <StyledTableCell {...styles.tableCell}>
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.startTime}</>
                        ) : null
                      )}
                    </StyledTableCell>
                    <StyledTableCell {...styles.tableCell}>
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.endTime}</>
                        ) : null
                      )}
                    </StyledTableCell>
                    <StyledTableCell {...styles.tableCell}>
                      {formattedAttendanceLists.map((attendance) =>
                        formattedCalendarDate.date === attendance.date ? (
                          <>{attendance.workingTime}</>
                        ) : null
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
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
      )
      }
    </>
  );
}

export default AttendanceListTable;
