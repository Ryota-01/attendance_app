import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Typography from "@mui/material/Typography";
import ApplicationListDataTable from "../components/Table/ApplicationListDataTable";
import { collection, doc, getDocs } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import "../css/ApplicationList.css";
import CardComponent from "../components/CardComponent";

export default function ApplicationList() {
  const { user } = useAuthContext("");
  const [leaveRequests, setLeaveRequest] = useState([]);
  const [requestIds, setRequestIds] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaveRequestRef = collection(db, "leaveRequest");
        const leaveRequestDocRef = doc(leaveRequestRef, user.uid);
        const leaveRequestSubCollectionRef = collection(
          leaveRequestDocRef,
          `${currentYear}`
        );
        const subCollectionSnapshot = await getDocs(
          leaveRequestSubCollectionRef
        );
        console.log(subCollectionSnapshot.query);
        const data = subCollectionSnapshot.docs.map((doc) => doc.data());
        const requestIds = subCollectionSnapshot.docs.map((doc) => doc.id);
        setLeaveRequest(data);
        setRequestIds(requestIds);
      } catch (e) {
        console.log("取得エラー", e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <CardComponent title={"申請一覧"}>
          <ApplicationListDataTable
            leaveRequests={leaveRequests}
            requestIds={requestIds}
          />
      </CardComponent>
    </div>
  );
}
