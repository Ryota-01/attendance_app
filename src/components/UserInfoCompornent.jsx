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
import { formatDate } from "../service/formatDate";
import { InfoBasicAlert } from "./Alert/BasicAlert";
import FetchUserInfoData from "./FetchData/FetchUserInfoData";
import { useAuthContext } from "../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function UserInfoCompornent(props) {
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);
  console.log(userData);
  const { formattedDate } = formatDate(userData.joinDate);
  return (
    <>
      <Card
        sx={{
          padding: "12px",
          height: "100%",
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            height="130"
            sx={{ width: "70%", objectFit: "cover", margin: "auto" }}
            image={require("../imeges/kkrn_icon_user_8.png")}
            alt="User Image"
          />
          <Box sx={{ marginTop: "24px" }}>
            {userData !== null && userData !== undefined ? (
              <>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  gutterBottom
                  fontWeight={"bold"}
                >
                  {`${userData.lastName} ${userData.firstName}`}
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
                      入社日：{formattedDate}
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
