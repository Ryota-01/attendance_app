import React from "react";
import DigitalClock from "../components/DigitalClock";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import AttendanceButton from "../components/AttendanceButton";
import { useAuthContext } from "../context/AuthContext";

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
        <h2>ホーム</h2>
        <div>
          <DigitalClock />
        </div>
        <div>
          <AttendanceButton />
        </div>
        <div>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </>
    );
  }
}
