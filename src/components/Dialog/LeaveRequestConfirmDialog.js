import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useAuthContext } from "../../context/AuthContext.js";

function LeaveRequestConfirmDialog(props) {
  const { user } = useAuthContext();
  const { leaveRequestRef } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //申請ボタンが押された時の処理
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const selectedDate = leaveRequestRef.acquisitionStartDate; // 休暇の取得日
      const dateObject = new Date(selectedDate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const dayOfWeek = dateObject.getDay();
      const currentYear = new Date().getFullYear(); // サブコレクション名を現在の年に
      const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
      const formattedDate = `${month}/${day}(${dayNames[dayOfWeek]})`;
      // 休暇申請コレクションを参照
      const leaveRequestCollectionRef = collection(db, "leaveRequest");
      // 休暇申請コレクション内のuserドキュメントを参照
      const leaveRequestDocRef = doc(leaveRequestCollectionRef, user.uid);
      const leaveRequestSubCollectionRef = collection(
        leaveRequestDocRef,
        `${currentYear}`
      );
      const value = {
        userId: user.uid,
        startDate: formattedDate,
        type: leaveRequestRef.paidLeaveReason,
        reason: leaveRequestRef.leaveReason,
        status: "承認待ち",
      };
      await addDoc(leaveRequestSubCollectionRef, value);
      navigate("/home");
    } catch (e) {
      console.log("申請できませんでした", e.message);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        確認
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"以下の内容で申請しますか？"}
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <DialogContentText id="alert-dialog-description">
            {leaveRequestRef && (
              <ul>
                <li>■取得日</li>
                <li>{props.leaveRequestRef.acquisitionStartDate}</li>
                <li>■休暇種別</li>
                <li>{props.leaveRequestRef.paidLeaveReason}</li>
                <li>■申請理由</li>
                <li>{props.leaveRequestRef.leaveReason}</li>
              </ul>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>戻る</Button>
          <Button onClick={handleClick} autoFocus>
            申請
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LeaveRequestConfirmDialog;
