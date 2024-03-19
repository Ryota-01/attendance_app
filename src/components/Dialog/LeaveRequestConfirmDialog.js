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
import { Grid, Typography } from "@mui/material";

function LeaveRequestConfirmDialog(props) {
  const isLeaveRequestConfirmation = props.isLeaveRequestConfirmation;
  const hideConfirmation = props.hideConfirmation;
  const values = props.values;
  console.log(props);

  const { user } = useAuthContext();
  const { leaveRequestRef } = props;
  const [open, setOpen] = useState(isLeaveRequestConfirmation);
  const navigate = useNavigate();
  const padding = {
    padding: "18px",
  };
  const spacing = 3;
  const xs = (xsNumber) => {
    if (xsNumber) {
      return xsNumber;
    } else {
      return 8;
    }
  };
  const variant = (variant) => {
    if (variant) {
      return variant;
    } else {
      return "body2";
    }
  };

  const handleClose = () => {
    setOpen(hideConfirmation);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: "600px" }}>
          <DialogTitle id="alert-dialog-title" textAlign={"center"}>
            {"以下の内容で申請しますか？"}
          </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            <Grid
              container
              spacing={spacing}
              sx={{ padding: padding, margin: "auto" }}
            >
              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>社員名：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.lastName} {values.firstName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={xs(12)}>
              <DialogActions>
                <Button onClick={handleClose} variant="contained">
                  戻る
                </Button>
                <Button onClick={handleClick} variant="contained" autoFocus>
                  申請
                </Button>
              </DialogActions>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeaveRequestConfirmDialog;
