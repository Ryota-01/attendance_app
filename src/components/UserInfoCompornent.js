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
import { useUserContext } from "../context/useUserContext";
import { formatDate } from "../service/formatDate";
import { InfoBasicAlert } from "./Alert/BasicAlert";

export default function UserInfoCompornent(props) {
  const { userData } = useUserContext();
  return (
    <>
      <Card
        sx={{
          padding: "12px",
          height: "360px"
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            height="100"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <Box>
            {userData !== null && userData !== undefined ? (
              <>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  gutterBottom
                  fontWeight={"bold"}
                >
                  {userData.userName}
                </Typography>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ marginTop: "12px" }}
                    >
                      雇用形態：{userData.employmentType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      入社日：{formatDate(userData.joinDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      メールアドレス：{userData.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
