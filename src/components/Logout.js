import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      const confirmLogout = window.confirm("ログアウトしますか？");

      if (confirmLogout) {
        try {
          await auth.signOut();
          navigate("/login");
          console.log("ログアウト");
        } catch (e) {
          console.error("ログアウトエラー", e.message);
        }
      } else {
        console.log("ログアウトキャンセル");
        navigate("/home");
      }
    };
    logout();
    return () => {};
  }, [navigate]);
  return <div>ログアウト中</div>;
}
