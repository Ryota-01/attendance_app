import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { doc, collection, addDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import { Grid, Typography } from "@mui/material";

function LeaveRequestConfirmDialog(props) {
  const isLeaveRequestConfirmation = props.isLeaveRequestConfirmation;
  const hideConfirmation = props.hideConfirmation;
  const values = props.values;
  const applicantName  = props.userName;
  const { user } = useAuthContext();
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
      // const selectedDate = leaveRequestRef.acquisitionStartDate; // 休暇の取得日

      // サブコレクション名を現在の年日、ドキュメント名を今日の年月日に
      const currentDate = new Date();
      const currentYear = new Date().getFullYear(); 
      // const currentMonth = currentDate.getMonth() + 1;
      // const today = currentDate.getDate();

      // leaveRequestコレクションからログイン中のuserIdと一致するドキュメントを参照。
      const leaveRequestCollectionRef = collection(db, user.uid);
      const leaveRequestDocRef = doc(leaveRequestCollectionRef, "leaveRequest");
      const leaveRequestSubCollectionRef = collection(
        leaveRequestDocRef,
        `${currentYear}_applicationDatas`
      );
      const leaveRequestData = {
        ...values,
        applicantName,
        status: "申請中"
      }
      await setDoc(
        doc(leaveRequestSubCollectionRef, `${values.leaveDate}`),
        leaveRequestData,
      );
      console.log("Success!");
      navigate("/home");
      await alert("申請しました");
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
                <Typography variant={variant()}>申請者：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {applicantName}
                </Typography>
              </Grid>
              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>休暇取得日：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>{values.leaveDate}</Typography>
              </Grid>
              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>休暇種別：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>{values.leaveType}</Typography>
              </Grid>
              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>申請理由：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.leaveReason}
                </Typography>
              </Grid>
              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>備考：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>{values.remarks}</Typography>
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
