import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { DialogActions, Divider, Grid, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext.js";

function LeaveRequestConfirmDialog(props) {
  const { user } = useAuthContext();
  const values = props.values;
  const hideConfirmation = props.hideConfirmation;
  const isConfirmationVisible = props.isConfirmationVisible;
  const [open, setOpen] = useState(isConfirmationVisible); //true
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

  //登録ボタンが押された時の処理
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      // usersコレクションを参照
      const userCollectionRef = doc(db, "users", user.uid);
      // usersコレクションにドキュメントを追加
      await setDoc(userCollectionRef, values);
      console.log("Success!");
      navigate("/home");
    } catch (e) {
      console.log("ユーザー情報の作成に失敗しました", e.message);
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
            {"以下の内容で登録しますか？"}
          </DialogTitle>
          <Divider />
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
              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>カナ：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.lastNameFurigana} {values.firstNameFurigana}
                </Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>メールアドレス：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>{values.email}</Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>電話番号：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.phoneNumber}
                </Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>郵便番号：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>{values.postCode}</Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>都道府県：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.prefectures}
                </Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>住所：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.address1}
                  {values.address2}
                </Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>入社日：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>{values.joinDate}</Typography>
              </Grid>

              <Grid item xs={xs(4)}>
                <Typography variant={variant()}>雇用形態：</Typography>
              </Grid>
              <Grid item xs={xs()}>
                <Typography variant={variant()}>
                  {values.employmentType}
                </Typography>
              </Grid>
              <Grid item xs={xs(12)}>
                <DialogActions>
                  <Button onClick={hideConfirmation} variant="contained">
                    閉じる
                  </Button>
                  <Button
                    onClick={handleOnSubmit}
                    variant="contained"
                    autoFocus
                  >
                    申請
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LeaveRequestConfirmDialog;
