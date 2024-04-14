import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Grid } from "@mui/material";
import NewSideBar from "../../components/Sidebar/NewSideBar";
import AttendanceFormComponent from "./AttendanceComponent";
import UserInfoCompornent from "./UserInfoCompornent";
import LeaveConutComponent from "./LeaveCountComponent";
import ApplicationListComponent from "./LeaveRequestComponent";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const styles = (spacingNumber) => ({
    gridItemSpacing: {
      xs: 12,
      md: spacingNumber,
    },
  })

  if (!user) {
    // userがfalseの場合は、ログインページに遷移する
    return navigation("/login");
  } else {
    return (
      <>
        <NewSideBar>
          <Grid container spacing={4}>
            <Grid item {...styles(6).gridItemSpacing}>
              <AttendanceFormComponent />
            </Grid>
            <Grid item {...styles(6).gridItemSpacing}>
              <UserInfoCompornent />
            </Grid>
            <Grid item {...styles().gridItemSpacing}>
              <LeaveConutComponent />
            </Grid>
            <Grid item {...styles().gridItemSpacing}>
              <ApplicationListComponent />
            </Grid>
            <useApplicationDataContext />
          </Grid>
        </NewSideBar>
      </>
    );
  }
}