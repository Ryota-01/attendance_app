import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Grid } from "@mui/material";
import NewSideBar from "../components/Sidebar/NewSideBar.js";
import CardComponent from "../components/CardComponent.js";
import { useUserContext } from "../context/useUserContext.js";

function UserInfo() {
  const { user } = useAuthContext();
  const { userData } = useUserContext();
  console.log(userData);
  const [userInfo, setUserInfo] = useState("");
  // const padding = {
  //   padding: "1px 0"
  // };
  const xs = (xsNumber) => {
    if (xsNumber) {
      return xsNumber;
    } else {
      return 6;
    }
  };
  const variant = (variant) => {
    if (variant) {
      return variant;
    } else {
      return "h6";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userInfoData = userDocSnapshot.data();
        setUserInfo(userInfoData);
      } catch (e) {
        console.log("ユーザー情報の取得に失敗しました", e.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {};
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <NewSideBar />
      <CardComponent title={"社員情報"}>
        <Box
          margin={"0 auto"}
          sx={{ padding: "32px 0", width: { md: "440px" } }}
        >
          <Grid container rowSpacing={4} columnSpacing={{ xs: 1, md: 12 }}>
            {userData !== null ? (
              <>
                <Grid item xs={6}>
                  <Typography variant={variant()}>社員名：</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={variant()}>
                    {userData.userName}
                  </Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>雇用形態：</Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>
                    {userData.employmentType}
                  </Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>管理者権限：</Typography>
                </Grid>
                <Grid item xs={xs()}>
                  {userData.admin === true ? (
                    <Typography variant={variant()}>ユーザー</Typography>
                  ) : (
                    <Typography variant={variant()}>管理者</Typography>
                  )}
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>入社日：</Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>
                    {userData.joinDate}
                  </Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>メールアドレス：</Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>{userData.email}</Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>電話番号：</Typography>
                </Grid>
                <Grid item xs={xs()}>
                  <Typography variant={variant()}>
                    {userData.phoneNumber}
                  </Typography>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      </CardComponent>
    </Box>
  );
}

export default UserInfo;
