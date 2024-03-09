import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import {
  doc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";
import "../css/LeaveRequestForm.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function LeaveRequestForm() {
  const { user } = useAuthContext();
  const [userName, setUserName] = useState("");
  const leaveReasonRef = useRef("");
  const paidLeaveReasonRef = useRef(""); //有給休暇かその他特別休暇か
  const acquisitionStartDateRef = useRef("");
  const navigate = useNavigate();

  const leaveRequestType = [
    {
      value: "有休休暇",
      label: "有休休暇",
    },
    {
      value: "特別休暇(代休)",
      label: "特別休暇(代休)",
    },
  ];

  //申請ボタンが押された時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const currentDate = new Date();
      const selectedDate = acquisitionStartDateRef.current.value; // 休暇の取得日
      const dateObject = new Date(selectedDate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const dayOfWeek = dateObject.getDay();
      const currentYearAndMonth = `${year}-${month.toString().padStart(2, 0)}`;
      const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
      const formattedDate = `${month}/${day}(${dayNames[dayOfWeek]})`

      // 休暇申請コレクションを参照
      const leaveRequestCollectionRef = collection(db, "leaveRequest");
      // 休暇申請コレクション内のuserドキュメントを参照
      const leaveRequestDocRef = doc(leaveRequestCollectionRef, user.uid);
      const leaveRequestSubCollectionRef = collection(
        leaveRequestDocRef,
        currentYearAndMonth
      );
      const value = {
        userId: user.uid,
        startDate: formattedDate,
        type: paidLeaveReasonRef.current.value,
        reason: leaveReasonRef.current.value,
        status: "承認待ち",
      };
      await addDoc(leaveRequestSubCollectionRef, value);
      navigate("/home");
    } catch (e) {
      console.log("申請できませんでした", e.message);
    }
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="leaveRequestForm">
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            休暇申請フォーム
          </Typography>
          <TextField
            select
            required
            label="休暇種類"
            defaultValue="有休休暇"
            variant="outlined"
            inputRef={paidLeaveReasonRef}
            fullWidth
            margin="normal"
          >
            {leaveRequestType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>  
          <TextField
            label="開始日"
            required
            type="date"
            variant="filled"
            margin="normal"
            inputRef={acquisitionStartDateRef}
            helperText="休暇取得日を入力してください"
            fullWidth
          />
          <TextField
            required
            label="申請理由"
            variant="filled"
            margin="normal"
            rows={4}
            multiline
            inputRef={leaveReasonRef}
            helperText="申請理由を入力してください"
            fullWidth
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            {/* {errorMessage} */}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            onSubmit={handleSubmit}
            fullWidth
          >
            申請
          </Button>
        </Box>
      </div>
    </div>
  );
}
