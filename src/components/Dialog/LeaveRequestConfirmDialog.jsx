import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, collection, setDoc } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";

function LeaveRequestConfirmDialog(props) {
  const isLeaveRequestConfirmation = props.isLeaveRequestConfirmation;
  const hideConfirmation = props.hideConfirmation;
  const values = props.values;
  const applicantName = props.userName;
  const { user } = useAuthContext();
  const [open, setOpen] = useState(isLeaveRequestConfirmation);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(hideConfirmation);
  };

  //申請ボタンが押された時の処理
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // leaveRequestコレクションからログイン中のuserIdと一致するドキュメントを参照。
      const leaveRequestCollectionRef = collection(db, user.uid);
      const leaveRequestDocRef = doc(leaveRequestCollectionRef, "休暇申請");
      const leaveRequestSubCollectionRef = collection(
        leaveRequestDocRef,
        `有休休暇`
      );
      const leaveRequestData = {
        ...values,
        applicantName,
      };
      await setDoc(
        doc(leaveRequestSubCollectionRef, `${values.leaveDate}`),
        leaveRequestData
      );
      navigate("/home");
      await alert("申請しました");
    } catch (e) {
      console.error("申請できませんでした", e.message);
    }
  };

  const styles = {
    gridContainer: {
      margin: "0 auto 32px auto",
      rowSpacing: 3,
    },
    gridItemTitle: {
      xs: 6,
      textAlign: "right",
    },
    gridItemValue: {
      xs: 6,
      textAlign: "left",
    },
    typographyValue: {
      variant: "body2",
    },
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: "400px" }}>
          <DialogTitle id="alert-dialog-title" textAlign={"center"} >
            {"以下の内容で申請しますか？"}
          </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            <Grid container {...styles.gridContainer}>
              <Grid item {...styles.gridItemTitle} >
                <Typography {...styles.typographyValue}>申請者：</Typography>
              </Grid>
              <Grid item {...styles.gridItemValue} >
                <Typography {...styles.typographyValue}>
                  {applicantName}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemTitle}>
                <Typography {...styles.typographyValue}>
                  休暇取得日：
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemValue}>
                <Typography {...styles.typographyValue}>
                  {values.leaveDate}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemTitle}>
                <Typography {...styles.typographyValue}>休暇種別：</Typography>
              </Grid>
              <Grid item {...styles.gridItemValue}>
                <Typography {...styles.typographyValue}>
                  {values.leaveType}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemTitle}>
                <Typography {...styles.typographyValue}>申請理由：</Typography>
              </Grid>
              <Grid item {...styles.gridItemValue}>
                <Typography {...styles.typographyValue}>
                  {values.leaveReason}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemTitle}>
                <Typography {...styles.typographyValue}>備考：</Typography>
              </Grid>
              <Grid item {...styles.gridItemValue}>
                <Typography {...styles.typographyValue}>
                  {values.remarks}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
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
