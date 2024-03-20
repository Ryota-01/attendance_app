import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Typography from "@mui/material/Typography";
import ApplicationListDataTable from "../components/Table/ApplicationListDataTable";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import "../css/ApplicationList.css";
import CardComponent from "../components/CardComponent";
import { Box } from "@mui/material";
import NewSideBar from "../components/Sidebar/NewSideBar.js";

export default function ApplicationList() {
  const { user } = useAuthContext("");
  const [leaveRequestsData, setLeaveRequestsData] = useState([]);
  const [requestIds, setRequestIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear(); // サブコレクション名を現在の年に
        const subCollectionName = `${currentYear}_applicationDatas`;
        const leaveRequestCollectionRef = collection(db, "leaveRequest");
        const leaveRequestDocRef = doc(leaveRequestCollectionRef, user.uid);
        const leaveRequestSubCollectionRef = collection(
          leaveRequestDocRef,
          subCollectionName
        );
        const leaveRequestSnapshot = await getDocs(
          leaveRequestSubCollectionRef
        );
        const leaveRequestData = leaveRequestSnapshot.docs.map((doc) =>
          doc.data()
        );
        setLeaveRequestsData(leaveRequestData);
      } catch (e) {
        console.log("取得エラー", e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <NewSideBar />

        <CardComponent title={"申請一覧"}>
          <ApplicationListDataTable
            leaveRequestsData={leaveRequestsData}
            requestIds={requestIds}
          />
        </CardComponent>
      </Box>
    </div>
  );
}
