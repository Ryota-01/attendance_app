import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../css/SidebarIcon.css";

export default function SidebarIcon() {
  const { user } = useAuthContext();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        //usersコレクションから、認証（ログイン）中のIDと一致するドキュメントを取得。
        const userDocumentRef = doc(db, "users", user.uid);
        //ドキュメントの存在確認。
        const userDocumentSnapshot = await getDoc(userDocumentRef);
        if (userDocumentSnapshot.exists()) {
          const userData = userDocumentSnapshot.data();
          setUserName(userData.userName);
        } else {
          console.log("ユーザー情報が存在しません");
        }
      } catch (e) {
        console.log("データの取得に失敗しました", e.message);
      }
    };
    if (user) {
      fetchUserName();
    }
  }, [user]);

  console.log(userName);
  return (
    <div className="sidebarIcon">
      <h1 className="headTitle">KintaRo</h1>
      <p className="sidebarIcon_userName">{userName} さん</p>
    </div>
  );
}
