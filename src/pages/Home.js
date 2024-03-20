import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import Sidebar from "../components/Sidebar/Sidebar.js";
import NewSideBar from "../components/Sidebar/NewSideBar.js";
import CardComponent from "../components/CardComponent.js";
import { Box } from "@mui/system";
import FetchUser from "../components/service/FetchUsers.js"


export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  if (!user) {
    return navigation("/login");
  } else {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {/* <Sidebar /> */}
        <NewSideBar />
        <FetchUser />
        <CardComponent title={"打刻"}>
          <DigitalClock />
          <AttendanceButton />
        </CardComponent>
      </Box>
    );
  }
}
