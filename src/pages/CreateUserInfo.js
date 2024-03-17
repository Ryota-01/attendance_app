import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useAuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import CreateUserInfoForm from "../components/FormComponents/CreateUserInfoForm.js";

export default function UserInfo() {
  const { user } = useAuthContext();
  const location = useLocation();
  console.log(location);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Userコレクションを参照
  //     const userCollectionRef = collection(db, "users");
  //     // userコレクション内のuserドキュメントを参照
  //     const userDocRef = doc(userCollectionRef, user.uid);
  //     // userドキュメントが存在するか確認
  //     const userDocSnap = await getDoc(userDocRef);
  //     if (!userDocSnap.empty) {
  //       //userドキュメントが存在しない場合は新規作成
  //       const data = {
  //         date: new Date(),
  //         // userName: nameRef.current.value,
  //         userId: user.uid,
  //         email: user.email,
  //         joinDate: joinDateRef.current.value,
  //         phoneNumber: phoneNumberRef.current.value,
  //         employmentType: employmentTypeRef.current.value,
  //         admin: false,
  //       };
  //       await setDoc(userDocRef, data);
  //       navigate("/home");
  //       console.log("Success!");
  //     }
  //   } catch (e) {
  //     console.log("ユーザー情報の作成に失敗しました", e.message);
  //   }
  // };

  return (
    <div>
      <Sidebar />
      <Card sx={{ width: "72%", margin: "auto", padding: "24px" }}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              社員情報作成
            </Typography>
            <Divider />
          </Box>
          <CreateUserInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
