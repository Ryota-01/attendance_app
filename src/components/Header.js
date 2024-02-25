import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
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
          setUserName(userData.name);
        } else {
          console.log("ドキュメントが存在しません");
        }
      } catch (e) {
        console.log("Error", e.message);
      }
    };

    if(user) {
      fetchUserName();
    }
  }, [user]);

  console.log(userName);
  return (
    <div>
      <header>
        <h2>Header</h2>
        {user ? (
          <ul>
            <li>打刻</li>
            <li>勤怠一覧</li>
            <li>社員名：{userName}</li>
          </ul>
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}
