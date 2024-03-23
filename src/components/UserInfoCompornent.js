import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useUserContext } from "../context/useUserContext";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function UserInfoCompornent(props) {
  const userData = props.userData;
  return (
    <>
      <Card
        sx={{
          padding: "12px",
          height: "340px",
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <Box marginBottom={"12px"}>
            {userData !== null ? (
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ marginTop: "12px" }}
                >
                  雇用形態：{userData.employmentType}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  入社日：{userData.joinDate}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  メールアドレス：{userData.email}
                </Typography>
              </>
            ) : (
              <></>
            )}
            <Box sx={{ marginTop: "24px" }}></Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
