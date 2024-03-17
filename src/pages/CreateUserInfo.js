import React, { useRef } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useAuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";

export default function UserInfo() {
  const { user } = useAuthContext();
  const nameRef = useRef("");
  const joinDateRef = useRef("");
  const phoneNumberRef = useRef("");
  const employmentTypeRef = useRef("");
  const navigate = useNavigate("");

  const padding = {
    padding: "18px",
  };
  const spacing = 3;
  const xs = 6;
  const varient = "filled";

  const employmentTypes = [
    {
      value: "正社員",
      label: "正社員",
    },
    {
      value: "アルバイト",
      label: "アルバイト",
    },
    {
      value: "業務委託",
      label: "業務委託",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Userコレクションを参照
      const userCollectionRef = collection(db, "users");
      // userコレクション内のuserドキュメントを参照
      const userDocRef = doc(userCollectionRef, user.uid);
      // userドキュメントが存在するか確認
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.empty) {
        //userドキュメントが存在しない場合は新規作成
        const data = {
          date: new Date(),
          userName: nameRef.current.value,
          userId: user.uid,
          email: user.email,
          joinDate: joinDateRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          employmentType: employmentTypeRef.current.value,
          admin: false,
        };
        await setDoc(userDocRef, data);
        navigate("/home");
        console.log("Success!");
      }
    } catch (e) {
      console.log("ユーザー情報の作成に失敗しました", e.message);
    }
  };

  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <Sidebar />
      <Card sx={{ width: "72%", margin: "auto", padding: "24px" }}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              社員情報作成
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              *は必須入力
            </Typography>
            <Divider />
          </Box>

          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                required
                label="姓"
                helperText="姓を入力してください"
                variant={varient}
                inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={xs}>
              <TextField
                required
                label="名"
                helperText="名を入力してください"
                variant={varient}
                inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={xs}>
              <TextField
                required
                label="セイ"
                helperText="姓(フリガナ)を入力してください"
                variant={varient}
                inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={xs}>
              <TextField
                required
                label="メイ"
                helperText="名(フリガナ)を入力してください"
                variant={varient}
                inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={xs}>
              <TextField
                label="電話番号"
                variant={varient}
                helperText="ハイフン無し"
                // inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Divider />

          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                required
                type="address"
                label="郵便番号"
                variant={varient}
                inputRef={nameRef}
                helperText="000-0000の形式で入力してください"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={xs}></Grid>
            <Grid item xs={xs}>
              <TextField
                required
                label="都道府県"
                variant={varient}
                helperText="都道府県名を入力してください"
                inputRef={nameRef}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={xs}></Grid>
            <Grid item xs={xs}>
              <TextField
                required
                label="住所1"
                variant={varient}
                inputRef={nameRef}
                size="small"
                fullWidth
                helperText="市区町村、番地など"
              />
            </Grid>
            <Grid item xs={xs}>
              <TextField
                label="住所2"
                variant={varient}
                inputRef={nameRef}
                size="small"
                fullWidth
                helperText="建物名など"
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                required
                label="入社日"
                type="date"
                variant={varient}
                inputRef={joinDateRef}
                helperText="入社日を選択してください"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={xs}>
              <TextField
                required
                select
                label="雇用形態"
                variant={varient}
                defaultValue="正社員"
                inputRef={employmentTypeRef}
                fullWidth
                helperText="雇用形態を選択してください"
                size="small"
              >
                {employmentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={2}>
              <Button type="submit" fullWidth variant="contained" onSubmit={handleSubmit}>
                保存
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
