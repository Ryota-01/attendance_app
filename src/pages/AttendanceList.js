import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

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
  console.log(attendanceLists);

  return (
    <div className="wrapper">
      <ResponsiveAppBar />
      <DataGrid />
      <Typography variant="h5" gutterBottom>
        勤怠一覧
      </Typography>
      <Typography variant="h7" gutterBottom>
        {`${currentYear}年${currentMonth}月`}
      </Typography>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">日付</TableCell>
            <TableCell align="center">出勤時間</TableCell>
            <TableCell align="center">退勤時間</TableCell>
            <TableCell align="center">休憩時間</TableCell>
            <TableCell align="center">備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceLists.map((attendance, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{attendance.date}</TableCell>
              <TableCell align="center">{attendance.startTime}</TableCell>
              {attendance.endTime == null ? (
                <TableCell align="center">ー</TableCell>
              ) : (
                <TableCell align="center">{attendance.endTime}</TableCell>
              )}
              <TableCell align="center">1:00</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
