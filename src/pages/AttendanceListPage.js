import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AttendanceDataTable from "../components/Table/AttendanceDataTable.js";
import CardComponent from "../components/CardComponent.js";
import NewSideBar from "../components/Sidebar/NewSideBar.js";
import { useAuthContext } from "../context/AuthContext.js";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { useLocation } from "react-router-dom";
import { Box, Card, Divider, Grid } from "@mui/material";

export default function AttendanceList() {
  const [attendanceLists, setAttendanceLists] = useState([]);
  // const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const { user } = useAuthContext();
  const location = useLocation();

  const convertTimestampToJapanTime = (timestamp) => {
    if (timestamp && timestamp.toDate()) {
      const date = timestamp.toDate();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Tokyo", //日本時間に設定
        weekday: "short",
      };
      return new Intl.DateTimeFormat("ja-JP", options).format(date);
    } else {
      return "打刻なし";
    }
  };

  const d = new Date();
  // 現在の年と月を取得
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const today = currentDate.getDate()
  const dayOfWeek = d.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const currentYearAndMonthDate = `${currentYear}-${currentMonth.toString().padStart(2, 0)}-${today
    .toString()
    .padStart(2, 0)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // attendanceコレクションを取得
        const attendanceRef = collection(db, "attendance");
        // userIDに紐づくユーザードキュメントを取得
        const userDocumentRef = doc(attendanceRef, user.uid);
        // 年月のサブコレクションのドキュメント(勤怠データ)を取得
        // getDocはDocumentReference（=docメソッド)を引数として受け取る(collectionではない)
        const subCollectionRef = collection(
          userDocumentRef,
          `${currentYear}FY`
        );
        const subCollectionSnapshot = await getDocs(subCollectionRef);
        if (!subCollectionRef.empty) {
          const data = subCollectionSnapshot.docs.map((doc) => doc.data());
          setAttendanceLists(data);
        } else {
          console.log("ドキュメントが存在しません");
        }
      } catch (e) {
        console.log("データの取得中にエラーが発生しました", e.message);
      }
    };
    fetchData();
  }, [user.uid, currentYearAndMonthDate]);

  useEffect(() => {});

  return (
    <>
      <NewSideBar>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card
              sx={{
                padding: "24px",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                fontWeight={"bold"}
              >
                勤怠実績
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {`${currentYear}年${currentMonth}月`}
              </Typography>

              <Divider />
              <AttendanceDataTable
                attendanceLists={attendanceLists}
                sx={{ marginTop: "24px" }}
              />
            </Card>
          </Grid>
        </Grid>
      </NewSideBar>
    </>
  );
}
