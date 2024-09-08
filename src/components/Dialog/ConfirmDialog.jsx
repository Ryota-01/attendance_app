import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";

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
  // GridContainerのspacing
  const gridContainerSpacing = 2;

  // GridItemのspacing
  const spSpacingNumber = (number) => {
    if (number) {
      return number;
    } else {
      return 6;
    }
  };

  // Typographのフォントサイズ
  const variant = (variant) => {
    if (variant) {
      return variant;
    } else {
      return "body2";
    }
  };
  // タイトル一式
  const confirmValues = [
    { valueTitle: "社員名：", value: `${values.lastName} ${values.firstName}` },
    {
      valueTitle: "カナ：",
      value: `${values.lastNameFurigana} ${values.firstNameFurigana}`,
    },
    { valueTitle: "メールアドレス：", value: values.email },
    { valueTitle: "電話番号：", value: values.phoneNumber },
    { valueTitle: "郵便番号：", value: values.postCode },
    { valueTitle: "都道府県：", value: values.prefectures },
    { valueTitle: "住所：", value: `${values.address1} ${values.address2}` },
    { valueTitle: "入社日：", value: values.joinDate },
    { valueTitle: "雇用形態：", value: values.employmentType },
  ];

  const handleClose = () => {
    setOpen(hideConfirmation);
  };

  //登録ボタンが押された時の処理
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      // usersコレクションを参照
      const userCollectionRef = collection(db, user.uid);
      // ユーザー情報のドキュメント
      const userInfoDocRef = doc(userCollectionRef, "userInfo");
      // usersコレクションにドキュメントを追加
      await setDoc(userInfoDocRef, values);
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
              spacing={gridContainerSpacing}
              sx={{ padding: padding, margin: "auto" }}
            >
              {confirmValues.map((data) => (
                <>
                  <Grid item xs={spSpacingNumber()}>
                    <Typography variant={variant()}>
                      {data.valueTitle}
                    </Typography>
                  </Grid>
                  <Grid item xs={spSpacingNumber()}>
                    <Typography variant={variant()}>{data.value}</Typography>
                  </Grid>
                </>
              ))}
              <Grid item xs={spSpacingNumber(12)}>
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
