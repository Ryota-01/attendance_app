import React from "react";
import { Grid, Typography } from "@mui/material";
import { InfoBasicAlert } from "../../components/BasicAlert";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../hooks/formatDate";
import FetchUserInfoData from "../../hooks/FetchUserInfoData";
import CardComponent from "../../components/CardComponent";

export default function UserInfoCompornent(props) {
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);
  const formattedDate = formatDate(userData.joinDate);

  const styles = {
    card: {
      sx: {
        padding: "12px",
        height: "100%",
      },
    },
    cardMediaStyle: {
      component: "img",
      height: 130,
      margin: "auto",
      sx: { width: "70%", objectFit: "cover", margin: "auto" },
      image: require("../../imeges/kkrn_icon_user_8.png"),
      alt: "User Image",
    },
    name: {
      variant: "h5",
      fontWeight: "bold",
      color: "text.secondary",
      gutterBottom: true,
    },
    textValue: {
      variant: "body2",
      fontWeight: "normal",
      color: "text.secondary",
      gutterBottom: true,
    },
    gridContainerSpacing: {
      spacing: 1,
    },
    gridItemSpacing: {
      xs: 12,
    },
  };

  return (
    <>
      <CardComponent title="社員情報" bgColor="#1679AB">
        {userData !== null && userData !== undefined ? (
          <>
            <Grid container {...styles.gridContainerSpacing}>
              <Grid item {...styles.gridItemSpacing}>
                <Typography {...styles.textValue} sx={{ marginTop: "12px" }}>
                  氏名：{`${userData.lastName} ${userData.firstName}`}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemSpacing}>
                <Typography {...styles.textValue}>
                  ヨミ：
                  {`${userData.lastNameFurigana} ${userData.firstNameFurigana}`}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemSpacing}>
                <Typography {...styles.textValue}>
                  雇用形態：{userData.employmentType}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemSpacing}>
                <Typography {...styles.textValue}>
                  入社日：{formattedDate.date}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemSpacing}>
                <Typography {...styles.textValue}>
                  メールアドレス：{userData.email}
                </Typography>
              </Grid>
              <Grid item {...styles.gridItemSpacing}>
                <InfoBasicAlert message="ユーザー情報を変更する際は管理者へお問合せください" />
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </CardComponent>
    </>
  );
}
