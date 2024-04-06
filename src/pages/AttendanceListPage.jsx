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
import CardComponent from "../components/CardComponent";

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
  const styles = (variant, weight) => ({
    card: {
      padding: "12px 0",
    },
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
  });

  return (
    <>
      <NewSideBar>
        <CardComponent title="勤怠実績">
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
          <TotalWorkingDaysTable {...props} />
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                padding: "14px",
                height: "100%",
              }}
            >
              <AttendanceDataTable {...props} />
            </Grid>
          </Grid>
        </CardComponent>
      </NewSideBar>
    </>
  );
}
