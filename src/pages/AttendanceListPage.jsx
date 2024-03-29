import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AttendanceDataTable from "../components/Table/AttendanceDataTable";
import CardComponent from "../components/CardComponent";
import NewSideBar from "../components/Sidebar/NewSideBar";
import { useAuthContext } from "../context/AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { get } from "firebase/database";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
import { Box, Card, Divider, Grid } from "@mui/material";

export default function AttendanceList() {
  const [attendanceLists, setAttendanceLists] = useState([]);
  // const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const { user } = useAuthContext();

  const d = new Date();
  // 現在の年と月を取得
  const currentYear = d.getFullYear();
  const currentMonth = (d.getMonth() + 1).toString().padStart(2, 0);
  const today = d.getDate().toString().padStart(2, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // userコレクションを取得
        const userCollectionRef = collection(db, user.uid);
        // attendanceドキュメント参照
        const attendanceDocRef = doc(userCollectionRef, "attendance");
        // 年月のサブコレクションのドキュメント(勤怠データ)を取得
        // getDocはDocumentReference（=docメソッド)を引数として受け取る(collectionではない)
        const attendanceSubCollectionRef = collection(
          attendanceDocRef,
          `${currentYear}-${currentMonth}`
        );
        // 日毎に分けるドキュメントを作成
        const attendanceDataDocRef = doc(
          attendanceSubCollectionRef,
          `${currentMonth}-${today}`
        );
        const subCollectionSnapshot = await getDocs(attendanceSubCollectionRef);
        console.log(subCollectionSnapshot)
        if (!attendanceDataDocRef.empty) {
          const data = subCollectionSnapshot.docs.map((doc) => doc.data());
          setAttendanceLists(data);
        } else {
          console.log("ドキュメントが存在しません");
        }
      } catch (e) {
        console.log("データの取得中にエラーが発生しました", e.message);
      }
    };
    console.log(attendanceLists);
    fetchData();
  }, [user.uid]);

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
