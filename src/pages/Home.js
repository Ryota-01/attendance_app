import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Box } from "@mui/system";
import { useUserContext } from "../context/useUserContext.js";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import Sidebar from "../components/Sidebar/Sidebar.js";
import NewSideBar from "../components/Sidebar/NewSideBar.js";
import CardComponent from "../components/CardComponent.js";
import AttendanceFormComponent from "../components/AttendanceFormComponent.js";
import UserInfoCompornent from "../components/UserInfoCompornent.js";
import ApplicationListDataTable from "../components/Table/ApplicationListDataTable.js";
import { useApplicationDataContext } from "../context/useApplicationDataContext.js";
import LeaveConutComponent from "../components/LeaveConutComponent.js";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const { userData } = useUserContext();
  const { applicationsData } = useApplicationDataContext();

  // PCのGrid
  const pcGridItemSpacing = (spacingNumber) => {
    if (spacingNumber) {
      return spacingNumber;
    } else {
      return 12;
    }
  };
  const spGridItemSpacing = (spacingNumber) => {
    if (spacingNumber) {
      return spacingNumber;
    } else {
      return 12;
    }
  };

  if (!user) {
    return navigation("/login");
  } else {
    return (
      <>
        <NewSideBar>
          <Box
            sx={{
              display: { xs: "block", sm: "flex", md: "flex" },
              flexDirection: "row",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={spGridItemSpacing()} md={pcGridItemSpacing(7)}>
                <AttendanceFormComponent />
              </Grid>
              <Grid item xs={spGridItemSpacing()} md={pcGridItemSpacing(5)}>
                <UserInfoCompornent userData={userData} />
              </Grid>
              <Grid item xs={spGridItemSpacing()} md={pcGridItemSpacing()}>
                <LeaveConutComponent userData={userData} />
              </Grid>
              <Grid item xs={spGridItemSpacing()} md={pcGridItemSpacing()}>
                <ApplicationListDataTable
                  userData={userData}
                  applicationsData={applicationsData}
                />
              </Grid>
              <useApplicationDataContext />
            </Grid>
          </Box>
        </NewSideBar>
      </>
    );
  }
}
