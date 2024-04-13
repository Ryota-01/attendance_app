import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { InfoBasicAlert } from "../../components/BasicAlert";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../hooks/formatDate";
import FetchUserInfoData from "../../hooks/FetchUserInfoData";

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
      spacing: 1
    },
    gridItemSpacing: {
      xs: 12,
    },
  };

  return (
    <>
      <Card {...styles.card}>
        <CardContent>
          <CardMedia {...styles.cardMediaStyle} />
          <Box sx={{ marginTop: "24px" }}>
            {userData !== null && userData !== undefined ? (
              <>
                <Typography {...styles.name}>
                  {`${userData.lastName} ${userData.firstName}`}
                </Typography>
                <Divider />
                <Grid container {...styles.gridContainerSpacing}>
                  <Grid item {...styles.gridItemSpacing}>
                    <Typography
                      {...styles.textValue}
                      sx={{ marginTop: "12px" }}
                    >
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
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
