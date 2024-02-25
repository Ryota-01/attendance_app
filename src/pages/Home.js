import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";
import Header from "../components/Header";
import UserUpdata from "./UserUpdata";
import AttendanceList from "./AttendanceList";

export default function Home() {
  const navigation = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    auth.signOut();
    navigation("/login");
    console.log(auth.user);
  };
  if (!user) {
    console.log(user);
    return navigation("/login");
  } else {
    return (
      <>
        <Header />
        <UserUpdata />
        <h2>ホームなのです</h2>
        <div>
          <DigitalClock />
        </div>
        <div>
          <AttendanceButton />
        </div>
        <div>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div>
          <AttendanceList />
        </div>
      </>
    );
  }
}
