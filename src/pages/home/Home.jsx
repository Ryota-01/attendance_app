import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Grid } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import NewSideBar from "../../components/Sidebar/NewSideBar";
import AttendanceFormComponent from "./AttendanceComponent";
import UserInfoCompornent from "./UserInfoCompornent";
import LeaveConutComponent from "./LeaveCountComponent";
import LeaveRequestComponent from "./LeaveRequestComponent";
import AttendanceDialog from "../../components/Dialog/AttendanceDialog";
import CreateUserInfoDialog from "../../components/Dialog/CreateUserInfoDialog";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const { isCheckedUserInfo, setIsCheckedUserInfo } = useState(false);
  const styles = (spacingNumber) => ({
    gridItemSpacing: {
      xs: 12,
      md: spacingNumber,
    },
  });

  // useEffect(() => {
  //   const checkUserDoc = async () => {
  //     try {
  //       const userCollectionRef = collection(db, user.uid);
  //       const userDocRef = doc(userCollectionRef, "userInfo");
  //       const userDocSnapshot = await getDoc(userDocRef);
  //       if (!userDocSnapshot.exists()) {
  //         setIsCheckedUserInfo(true);
  //         console.log(isCheckedUserInfo);
  //       }
  //     } catch (e) {
  //       console.error(e.message);
  //     }
  //   };
  //   checkUserDoc();
  // }, [isCheckedUserInfo]);

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
              <LeaveRequestComponent />
            </Grid>
          </Grid>
          {isCheckedUserInfo ? <CreateUserInfoDialog /> : ""}
          <AttendanceDialog />
        </NewSideBar>
      </>
    );
  }
}
