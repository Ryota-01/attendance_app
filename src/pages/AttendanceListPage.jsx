import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Card, Divider, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import AttendanceDataTable from "../components/Table/AttendanceDataTable";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NewSideBar from "../components/Sidebar/NewSideBar";
import Link from "@mui/material/Link";
import TotalWorkingDaysTable from "../components/Table/TotalWorkingDaysTable";
import FetchUserInfoData from "../components/FetchData/FetchUserInfoData";

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
        console.log("データの取得中にエラーが発生しました", e.message);
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

  // スタイリング
  const styles = (variant, weight) => ({
    title: {
      variant: variant, //"h6"
      color: "text.secondary",
      fontWeight: weight,
      gutterBottom: true,
    },
    subTitle: {
      variant: variant, // "body1"
      color: "text.secondary",
      fontWeight: weight,
      gutterBottom: true,
    },
    link: {
      component: "button",
      underline: "none",
      color: "inherit",
    },
    arrowIcon: {
      sx: {
        minWidth: 0,
        justifyContent: "center",
        verticalAlign: "bottom",
      },
    },
    divider: {},
  });

  return (
    <>
      <NewSideBar>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              padding: "24px",
              height: "100%",
            }}
          >
            <Card {...styles().card}>
              <Typography {...styles("h6", "bold").title}>勤怠実績</Typography>
              <Stack direction="row" spacing={1}>
                <Link {...styles().link} onClick={handleLastMonth}>
                  {<KeyboardArrowLeftIcon {...styles().arrowIcon} />}
                </Link>
                <Typography {...styles("body5").subTitle}>
                  {`${currentYear}年${currentMonth}月`}
                </Typography>
                <Link
                  {...styles().link}
                  onClick={handleNextMonth}
                  disabled={disabled}
                >
                  <KeyboardArrowRightIcon {...styles().arrowIcon} />
                </Link>
              </Stack>
              <Divider sx={{ margin: "10px 10px" }} />
              <TotalWorkingDaysTable
                attendanceLists={attendanceLists}
                currentYear={currentYear}
                currentMonth={currentMonth}
                isEmptyDocument={isEmptyDocument}
              />
              <AttendanceDataTable
                attendanceLists={attendanceLists}
                currentYear={currentYear}
                currentMonth={currentMonth}
                isEmptyDocument={isEmptyDocument}
                userData={userData}
              />
            </Card>
          </Grid>
        </Grid>
      </NewSideBar>
    </>
  );
}
