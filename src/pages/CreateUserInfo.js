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
import { Card, CardContent } from "@mui/material";

export default function UserInfo() {
  const { user } = useAuthContext();
  const nameRef = useRef("");
  const joinDateRef = useRef("");
  const phoneNumberRef = useRef("");
  const employmentTypeRef = useRef("");
  const navigate = useNavigate("");

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
    <div className="wrapper">
      {/* <ResponsiveAppBar /> */}
      <Sidebar />

      <Card sx={{ width: "60%", margin: "auto", padding: "4px" }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            社員情報作成
          </Typography>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              社員名
            </Typography>
            <TextField
              required
              label="性"
              variant="outlined"
              inputRef={nameRef}
              helperText="苗字を入力してください"
              size="small"
            />
            <TextField
              required
              label="名"
              variant="outlined"
              inputRef={nameRef}
              helperText="名前を入力してください"
              size="small"
              sx={{ marginLeft: "18px" }}
            />
          </Box>


          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              入社日
            </Typography>
            <TextField
              required
              type="date"
              variant="outlined"
              inputRef={joinDateRef}
              fullWidth
              helperText="入社日を選択してください"
              size="small"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            電話番号
          </Typography>
          <TextField
            required
            label="電話番号"
            type="tel"
            variant="outlined"
            inputRef={phoneNumberRef}
            fullWidth
            margin="normal"
            size="small"
          />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            雇用形態
          </Typography>
          <TextField
            required
            select
            label="雇用形態"
            variant="outlined"
            defaultValue="正社員"
            inputRef={employmentTypeRef}
            fullWidth
            helperText="雇用形態を選択してください"
            margin="normal"
            size="small"
          >
            {employmentTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            onSubmit={handleSubmit}
            fullWidth
          >
            保存
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
