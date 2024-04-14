import { React, useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { Box, Grid, Stack, Typography, Link, IconButton } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import AttendanceTotalWorkingTable from "./AttendanceTotalWorkingTable";
import AttendanceDataTable from "./AttendanceListTable";
import CardComponent from "../../components/CardComponent";
import NewSideBar from "../../components/Sidebar/NewSideBar";
import FetchUserInfoData from "../../hooks/FetchUserInfoData";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";

export default function AttendanceList() {
  const [attendanceLists, setAttendanceLists] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [isEmptyDocument, setIsEmptyDocument] = useState(false);
  const [disabled, setDisabled] = useState(
    currentYear === new Date().getFullYear() &&
      currentMonth === new Date().getMonth() + 1
  );
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);

  useEffect(() => {
    const fetchData = async () => {
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
          setIsEmptyDocument(false);
          setAttendanceLists(data);
        } else {
          setAttendanceLists([]);
          setIsEmptyDocument(true);
          console.log("勤怠データが存在しません");
        }
      } catch (e) {
        console.error("データの取得中にエラーが発生しました", e.message);
      }
    };
    fetchData();
  }, [currentMonth, currentYear, user]);

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

  const propsAttendanceItem = attendanceLists.map((props) => {
    const date = props.date;
    const startTime = props.startTime;
    const endTime = props.endTime;
    return { date, startTime, endTime };
  });

  const props = {
    attendanceLists: propsAttendanceItem,
    currentYear: currentYear,
    currentMonth: currentMonth,
    isEmptyDocument: isEmptyDocument,
    userData: userData,
  };

  // スタイリング
  const styles = {
    card: {
      padding: "12px 0",
    },
    stack: {
      direction: "row",
      spacing: 1,
    },
    box: {
      sx: {
        padding: "14px 0",
      },
    },
    subTitle: {
      variant: "body5",
      color: "text.secondary",
      gutterBottom: true,
    },
    gridItem: {
      xs: 12,
      sx: {
        padding: "14px",
        height: "100%",
      },
    },
  };

  return (
    <>
      <NewSideBar>
        <CardComponent title="勤怠実績">
          <Stack {...styles.stack}>
            <Box {...styles.box}>
              <IconButton onClick={handleLastMonth}>
                <KeyboardArrowLeft />
              </IconButton>
              <Typography {...styles.subTitle}>
                {`${currentYear}年${currentMonth}月`}
              </Typography>
              <IconButton onClick={handleNextMonth} disabled={disabled} >
                <KeyboardArrowRight />
              </IconButton>
            </Box>
          </Stack>
          <AttendanceTotalWorkingTable {...props} />
          <Grid container>
            <Grid item {...styles.gridItem}>
              <AttendanceDataTable {...props} />
            </Grid>
          </Grid>
        </CardComponent>
      </NewSideBar>
    </>
  );
}
