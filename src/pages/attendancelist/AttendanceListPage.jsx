import { React } from "react";
import { Grid } from "@mui/material";
import AttendanceListTable from "./AttendanceListTable";
import CardComponent from "../../components/CardComponent";
import NewSideBar from "../../components/Sidebar/NewSideBar";
import FetchUserInfoData from "../../hooks/FetchUserInfoData";
import { useAuthContext } from "../../context/AuthContext";

export default function AttendanceList() {
  const attendanceLists = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const isEmptyDocument = false;
  const { user } = useAuthContext();
  const userData = FetchUserInfoData(user.uid);

  const propsAttendanceItem = attendanceLists.map((props) => {
    const date = props.date;
    const startTime = props.startTime;
    const endTime = props.endTime;
    return { date, startTime, endTime };
  });

  const props = {
    attendanceLists: propsAttendanceItem,
    currentYear: currentYear,
    currentMonth: currentMonth,
    isEmptyDocument: isEmptyDocument,
    userData: userData,
  };

  // スタイリング
  const styles = {
    gridItem: {
      xs: 12,
    },
  };

  return (
    <>
      <NewSideBar>
        <CardComponent title="勤怠実績">
          <Grid container>
            <Grid item {...styles.gridItem}>
              <AttendanceListTable {...props} />
            </Grid>
          </Grid>
        </CardComponent>
      </NewSideBar>
    </>
  );
}
