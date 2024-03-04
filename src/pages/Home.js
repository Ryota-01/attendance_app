import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import Sidebar from "../components/Sidebar";
import "../css/Home.css";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  if (!user) {
    console.log(user);
    return navigation("/login");
  } else {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="primary">
          <DigitalClock />
          <AttendanceButton />
        </div>
      </div>
    );
  }
}
