import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import Sidebar from "../components/Sidebar";

function UserInfo() {
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userInfoData = userDocSnapshot.data()
        setUserInfo(userInfoData);
      } catch (e) {
        console.log("ユーザー情報の取得に失敗しました", e.message);
      }
    };
    fetchData();
  }, []);
  console.log(userInfo);

  const handleSubmit = () => {};
  return (
    <div>
      <Sidebar />
      <div className="loginForm">
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            ユーザー情報
          </Typography>
          <Typography>
            氏名：{userInfo.userName}
          </Typography>
          <Typography>
            メールアドレス：{userInfo.email}
          </Typography>
          <Typography>
            雇用形態：{userInfo.employmentType}
          </Typography>
          <Typography>
            入社日：{userInfo.joinDate}
          </Typography>
          <Typography>
            電話番号：{userInfo.phoneNumber}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            onSubmit={handleSubmit}
            fullWidth
          >
            保存
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default UserInfo;
