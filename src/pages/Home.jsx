import React from "react";
import NewSideBar from "../components/Sidebar/NewSideBar";
import AttendanceFormComponent from "../components/AttendanceFormComponent";
import UserInfoCompornent from "../components/UserInfoCompornent";
import LeaveConutComponent from "../components/LeaveConutComponent";
import ApplicationListComponent from "../components/ApplicationListComponent";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import FetchUserInfoData from "../components/FetchData/FetchUserInfoData";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  FetchUserInfoData();

  // GridItemの幅調整(PC)
  const pcGridItemSpacing = (spacingNumber) => {
    if (spacingNumber) {
      return spacingNumber;
    } else {
      return 12;
    }
  };

  // GridItemの幅調整(SP)
  const spGridItemSpacing = (spacingNumber) => {
    if (spacingNumber) {
      return spacingNumber;
    } else {
      return 12;
    }
  };

  if (!user) {
    // userがfalseの場合は、ログインページに遷移
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
                <UserInfoCompornent />
              </Grid>
              <Grid item xs={spGridItemSpacing()} md={pcGridItemSpacing()}>
                <LeaveConutComponent />
              </Grid>
              <Grid item xs={spGridItemSpacing()} md={pcGridItemSpacing()}>
                <ApplicationListComponent />
              </Grid>
              <useApplicationDataContext />
            </Grid>
          </Box>
        </NewSideBar>
      </>
    );
  }
}
