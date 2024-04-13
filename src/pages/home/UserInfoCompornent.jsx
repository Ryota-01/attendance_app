import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { InfoBasicAlert } from "../../components/BasicAlert";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../hooks/formatDate";
import FetchUserInfoData from "../../hooks/FetchUserInfoData";

export default function UserInfoCompornent(props) {
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);
  const formattedDate = formatDate(userData.joinDate);

  const styles = (variant, weight) => ({
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
    typoStyle: {
      variant: variant,
      color: "text.secondary",
      fontWeight: weight,
      gutterBottom: true,
    },
    gridItemSpacing: {
      xs: 12,
    },
  });

  return (
    <>
      <Card {...styles().card}>
        <CardContent>
          <CardMedia {...styles().cardMediaStyle} />
          <Box sx={{ marginTop: "24px" }}>
            {userData !== null && userData !== undefined ? (
              <>
                <Typography {...styles("h5", "bold").typoStyle}>
                  {`${userData.lastName} ${userData.firstName}`}
                </Typography>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item {...styles().gridItemSpacing}>
                    <Typography
                      {...styles("body2", "normal").typoStyle}
                      sx={{ marginTop: "12px" }}
                    >
                      雇用形態：{userData.employmentType}
                    </Typography>
                  </Grid>
                  <Grid item {...styles().gridItemSpacing}>
                    <Typography {...styles("body2", "normal").typoStyle}>
                      入社日：{formattedDate.date}
                    </Typography>
                  </Grid>
                  <Grid item {...styles().gridItemSpacing}>
                    <Typography {...styles("body2", "normal").typoStyle}>
                      メールアドレス：{userData.email}
                    </Typography>
                  </Grid>
                  <Grid item {...styles().gridItemSpacing}>
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
