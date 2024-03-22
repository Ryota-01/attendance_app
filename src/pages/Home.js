import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Box } from "@mui/system";
import { useUserContext } from "../context/useUserContext.js";
import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import Sidebar from "../components/Sidebar/Sidebar.js";
import NewSideBar from "../components/Sidebar/NewSideBar.js";
import CardComponent from "../components/CardComponent.js";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const { userData } = useUserContext();

  if (userData !== null) {
    const joinDate = userData.joinDate;
    console.log(joinDate)
  } else {
    console.log("Null");
  }

  if (!user) {
    return navigation("/login");
  } else {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {/* <Sidebar /> */}
        <NewSideBar />
        <CardComponent title={"打刻"}>
          <DigitalClock />
          <AttendanceButton />
          <CardContent sx={{ marginTop: "24px" }}>
            <Card sx={{ padding: "24px", marginBottom: "24px" }}>
              <Typography variant="body1">有休残日数（Comingsoon)</Typography>
              <Divider />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "100px" }}
              />
            </Card>
            <Card sx={{ padding: "24px" }}>
              <Typography variant="body1">代休残日数（Comingsoon)</Typography>
              <Divider />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "100%", height: "100px" }}
              />
            </Card>
          </CardContent>
        </CardComponent>
      </Box>
    );
  }
}
