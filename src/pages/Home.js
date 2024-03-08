import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import "../css/Home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import UserCollectionStatus from "../components/UserCollectionStatus";
import Sidebar from "../components/Sidebar";


export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  if (!user) {
    console.log(user);
    return navigation("/login");
  } else {
    return (
      <div className="wrapper">
        {/* <ResponsiveAppBar /> */}
        <Sidebar />
        <div className="primary">
          {/* <UserCollectionStatus /> */}
          <DigitalClock />
          <AttendanceButton />
        </div>
      </div>
    );
  }
}
