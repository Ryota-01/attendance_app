import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
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

export default function LeaveRequestForm() {
  const { user } = useAuthContext();
  const [userName, setUserName] = useState("");
  const leaveReasonRef = useRef("");
  const paidLeaveReasonRef = useRef(""); //有給休暇かその他特別休暇か
  const acquisitionStartDateRef = useRef("");
  // const acquisitionEndDateRef = useRef("");
  const navigate = useNavigate();

  const leaveRequestType = [
    {
      value: "有休休暇",
      label: "有休休暇",
    },
    // {
    //   value: "特別休暇(代休)",
    //   label: "特別休暇(代休)",
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const userDocumentRef = doc(db, "users", user.uid);
      const userDocumentSnapshot = await getDoc(userDocumentRef);
      const userName = userDocumentSnapshot.data().name;
      setUserName(userName);
    };
    fetchData();
  }, []);

  //申請ボタンが押された時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(paidLeaveReasonRef);
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const currentFormattedDate = `${year}-${month}-${day}`;

      // 休暇申請コレクションを参照
      const leaveRequestCollectionRef = collection(db, "leaveRequest");
      // 休暇申請コレクション内のuserドキュメントを参照
      const userDocRef = doc(leaveRequestCollectionRef, user.uid);
      // userドキュメントが存在するか確認
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.empty) {
        //userドキュメントが存在しない場合は新規作成
        await setDoc(userDocRef, {});
      }
      // userドキュメント内のサブコレクション(申請データ)を参照
      const subCollectionRef = collection(userDocRef, `${year}`);
      // 申請データが存在するか確認
      const subCollectionSnap = await getDocs(subCollectionRef);
      if (subCollectionSnap.empty) {
        const newDocRef = await addDoc(subCollectionRef, {}); // 新しいドキュメントを追加
        const value = {
          userId: user.uid,
          startDate: acquisitionStartDateRef.current.value,
          // endDate: acquisitionEndDateRef.current.value,
          type: paidLeaveReasonRef.current.value,
          reason: leaveReasonRef.current.value,
          status: "承認待ち",
        };
        await setDoc(newDocRef, value);
        console.log("Success!");
        navigate("/home");
      } else {
        console.log("すでに申請データが存在しています");
      }
    } catch (e) {
      console.log("申請できませんでした", e.message);
    }
  };

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="leaveRequestForm">
        <Typography variant="h5" gutterBottom>
          休暇申請フォーム
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1.6, width: "100%" },
            // "& > :not(style) + :not(style)" : {marginTop : "16px"},
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="filled-select-currency"
            select
            label="休暇種類"
            defaultValue="有休休暇"
            variant="filled"
            inputRef={paidLeaveReasonRef}
            // helperText="休暇の種類を選択してください"
          >
            {leaveRequestType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="開始日"
            type="date"
            variant="filled"
            margin="normal"
            inputRef={acquisitionStartDateRef}
            helperText="休暇取得日を入力してください"
            />
          {/* <TextField
            label="終了日"
            type="date"
            variant="filled"
            margin="normal"
            inputRef={acquisitionEndDateRef}
            helperText="休暇終了日を入力してください"
          /> */}
          <TextField
            required
            label="申請理由"
            variant="filled"
            margin="normal"
            rows={4}
            multiline
            inputRef={leaveReasonRef}
            helperText="申請理由を入力してください"
          />
          <Button type="submit" className="formBtn" variant="contained" onSubmit={handleSubmit}>
            申請
          </Button>
        </Box>
      </div>
    </div>
  );
}
