import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Typography from "@mui/material/Typography";
import DataTable from "../components/Table/DataTable.js";
import UserCollectionStatus from "../components/Snackbar/UserCollectionStatus.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import "../css/AttendanceList.css";
import { Card, CardContent, Divider } from "@mui/material";
import { Box } from "@mui/system";

export default function AttendanceList() {
  const [attendanceLists, setAttendanceLists] = useState([]);
  const { user } = useAuthContext();

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
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();
  const dayOfWeek = d.getDay();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const currentYearAndMonth = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, 0)}`;
  const currentMonthAndDate = `${currentMonth.toString().padStart(2, 0)}-${today
    .toString()
    .padStart(2, 0)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // attendanceコレクションを取得
        const attendanceRef = collection(db, "attendance");
        // ユーザードキュメントを取得
        const userDocumentRef = doc(attendanceRef, user.uid);
        // 年月のサブコレクションのドキュメント(勤怠データ)を取得
        // getDocはDocumentReference（=docメソッド)を引数として受け取る(collectionではない)
        const subCollectionRef = collection(
          userDocumentRef,
          currentYearAndMonth
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
  }, [user.uid, currentYearAndMonth]);

  return (
    <div className="attendanceListWrapper">
      <Sidebar />
      <Card sx={{ width: "72%", margin: "auto", padding: "24px" }}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              勤怠実績
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {`${currentYear}年${currentMonth}月`}
            </Typography>
          </Box>
          <DataTable attendanceLists={attendanceLists} />
        </CardContent>
      </Card>
    </div>
  );
}
